from django.http import JsonResponse
from django.contrib import admin
from devboard.serializers import get_field_serializer
import zipfile
import os
from pathlib import Path

def get_all_models():
    return admin.site._registry

def error_message(error_message='', code=200):
    return JsonResponse({
        'error': error_message,
        'code': code
    })

def get_model(model_name):
    model = list(filter(lambda item: item.__name__ == model_name, get_all_models()))
    if len(model) == 0: return None
    else: return model[0]

def get_type_of_field(model, field_name):
    fields = list(filter(lambda field: field.name == field_name, model._meta.get_fields()))
    if len(fields) < 1: return None
    else: return fields[0].get_internal_type()

def get_relation_type_of_field(field):
    if field.many_to_many: return 'many_to_many'
    if field.one_to_one: return 'one_to_one'
    if field.many_to_one: return 'many_to_one'
    if field.one_to_many: return 'one_to_many'

def relation_can_be_set(field):
    return get_relation_type_of_field(field) in ['one_to_one', 'many_to_one']

def get_field(model, field_name):
    fields = list(filter(lambda field: field.name == field_name, model._meta.get_fields()))
    if len(fields) < 1: return None
    else: return fields[0]

def get_field_options(field):
    if hasattr(field, 'choices'):
        if field.choices is None: return None
        return field.choices
    else:
        return None

def get_relation_items(item, field):
    relation_type = get_relation_type_of_field(field)
    
    if relation_type == 'many_to_many':
        try:
            relation_items = getattr(item, field.name).all()
            if relation_items.exists():
                return [relation_item.pk for relation_item in relation_items]
            else:
                return []
        except AttributeError:
            return []

    elif relation_type == 'many_to_one':
        relation_item = getattr(item, field.name)
        return relation_item.pk if relation_item else None
    elif relation_type == 'one_to_many':
        return None
    elif relation_type == 'one_to_one':
        try:
            return getattr(item, field.name).pk
        except AttributeError:
            return None



def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def get_type_of_file(filename):
    ext = filename.split('.')[-1]
    if ext in ['mp3', 'flac', 'wav', 'wma', 'aac', 'm4a']:
        return 'audio'
    if ext in ['png', 'jpg', 'jpeg', 'apng', 'avif', 'gif', 'webp', 'tiff', 'jfif', 'bmp']:
        return 'image'
    if ext in ['mp4', 'mov', 'avi', 'mkv', 'wmv', 'flv', 'm4v']:
        return 'video'
    if ext in ['py', 'cpp', 'cs', 'php', 'svg', 'js', 'html', 'go', 'java', 'css', 'c', 'kt', 'swift', 'ts', 'rb', 'dart', 'json', 'sh']:
        return 'code'
    if ext in ['exe', 'msi']:
        return 'program'
    if ext in ['doc', 'docx', 'pdf', 'rtf', 'odt']:
        return 'docs'
    if ext in ['xlsx', 'xls', 'ods']:
        return 'sheets'
    if ext in ['sql', 'sqlite', 'sqlite3', 'db', 'csv']:
        return 'database'
    if ext in ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'tar.gz', 'tar.bz2', 'tar.xz']:
        return 'archive'
    else:
        return 'file'


def create_zip_file(paths, zip_path):
    empty_zip_data = b'PK\x05\x06\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
    with open(zip_path, 'wb') as zip_file:
        zip_file.write(empty_zip_data)

    zipObj = zipfile.ZipFile(zip_path, 'w')
    parent_path = Path(paths[0]).parent
    for path in paths:
        zipObj.write(path, os.path.relpath(path, parent_path))
        for root, dirs, files in os.walk(path):
            for file in files:
                zipObj.write(os.path.join(root, file), os.path.relpath(os.path.join(root, file), parent_path))
            for dir in dirs:
                zipObj.write(os.path.join(root, dir), os.path.relpath(os.path.join(root, dir), parent_path))

    zipObj.close()


def free_filename(filename, path):
    fullpath = os.path.join(path, filename)
    split_filename = filename.split('.')
    if len(split_filename) > 1:
        ext = split_filename[-1]
        basename = ".".join(split_filename[:-1])
    else:
        ext = None
        basename = filename
    new_filename = filename
    counter = 1

    while os.path.exists(fullpath):
        new_filename = f"{basename} ({counter})"
        if ext is not None:
            new_filename += f'.{ext}'
        fullpath = os.path.join(path, new_filename)
        counter += 1
    return new_filename


def free_folder_name(folder_name, path):
    fullpath = os.path.join(path, folder_name)
    counter = 1
    new_folder_name = folder_name
    while os.path.exists(fullpath):
        new_folder_name = f"{folder_name}-{counter}"
        counter += 1
    return new_folder_name


def flatten_dict(d, parent_key='', sep='.'):
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_dict(v, new_key, sep=sep).items())
        else:
            items.append((new_key, v))
    return dict(items)