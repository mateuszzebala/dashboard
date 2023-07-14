from django.http import JsonResponse
from django.contrib import admin
from dashboard.serializers import get_field_serializer

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
        return [choice[0] for choice in field.choices]
    else:
        return None


def get_relation_items(item, field_name):
    return ''

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
