import os
import shutil
from pathlib import Path
from django.urls import path
from django.conf import settings
from django.http import JsonResponse, FileResponse
from dashboard.utils import get_type_of_file, create_zip_file, free_filename, free_folder_name
from dashboard.views.auth import dashboard_access


# GET CONTENT OF FOLDER VIEW
# POST (path: path to folder)
# RETURN {files: [], folders: [], permission_error: true|false, sep, parent}


@dashboard_access
def get_content_of_folder(request):
    parent_path = request.POST.get('path')
    list_path = parent_path.split(os.sep)
    permission_error = False
    files, folders = [], []

    try:
        content = os.scandir(parent_path)
    except PermissionError:
        permission_error = True
        content = []

    for current_item in content:
        if os.path.isfile(current_item):
            files.append({
                'name': current_item.name,
                'path': os.sep.join([*list_path, current_item.name]),
                'is_file': True,
                'access': os.access(os.sep.join([*list_path, current_item.name]), os.W_OK),
                'type': get_type_of_file(current_item.name)
            })
        else:
            folders.append({
                'name': current_item.name,
                'path': os.sep.join([*list_path, current_item.name]),
                'is_file': False,
                'access': os.access(os.sep.join([*list_path, current_item.name]), os.W_OK)
            })

    return JsonResponse({
        'files': files,
        'folders': folders,
        'permission_error': permission_error,
        'sep': os.sep,
        'parent': os.path.abspath(os.path.join(parent_path, os.pardir))
    })


# INIT FILES VIEW
# POST (path: this is init path of files, if is null then home path is init)
# RETURN: {root, path, home, project} - paths

@dashboard_access
def init_files(request):
    startup_path = request.POST.get('path') if request.POST.get('path') != 'null' else Path.home()
    return JsonResponse({
        'root': str(os.path.abspath(os.sep)),
        'path': str(startup_path),
        'home': str(Path.home()),
        'project': str(settings.BASE_DIR),
    })


# GET FILE VIEW
# POST (path: path to file)
# RETURN: file

@dashboard_access
def get_file_content(request):
    path_to_file = request.GET.get('path')
    return FileResponse(open(path_to_file, 'rb'))


# CREATE DIRECTORY VIEW
# POST (path: parent path of new directory, name: name of new directory)
# RETURN {done: true|false} - false if permission error or folder already exists


@dashboard_access
def mkdir(request):
    parent_path = request.POST.get('path')
    folder_name = request.POST.get('name')

    fullpath = os.path.join(parent_path, folder_name)
    if os.path.exists(fullpath):
        return JsonResponse({
            'done': False
        })

    try:
        os.mkdir(fullpath)
        return JsonResponse({
            'done': True
        })
    except PermissionError:
        return JsonResponse({
            'done': False
        })

# REMOVE FILES AND FOLDERS VIEW
# POST (paths: string of paths to remove joined by ';;;')
# RETURN: {}


@dashboard_access
def remove(request):
    paths = request.POST.get('paths')
    for current_path in paths.split(';;;'):
        if os.path.exists(current_path) and os.access(current_path, os.W_OK):
            if os.path.isfile(current_path):
                os.remove(current_path)
            else:
                shutil.rmtree(current_path)
    return JsonResponse({})


# CREATE FILE VIEW
# POST (path: path of parent directory, name: filename of new file)
# RETURN: if file created than {error: null}

@dashboard_access
def create_file(request):
    parent_path = request.POST.get('path')

    if not os.path.exists(parent_path):
        return JsonResponse({
            'error': 'Parent path does not exists'
        })

    if not os.access(parent_path, os.W_OK):
        return JsonResponse({
            'error': 'I do not have access to this directory'
        })

    filename = request.POST.get('name')
    fullpath = os.path.join(parent_path, filename)

    if os.path.exists(fullpath):
        return JsonResponse({
            'error': 'File with this name already exists'
        })

    file = open(fullpath, 'w')
    file.close()

    if os.path.exists(fullpath):
        return JsonResponse({
            'error': None
        })
    else:
        return JsonResponse({
            'error': 'File created but does not exists'
        })


# UPLOAD FILE VIEW
# (path: path of parent to upload file, file: file to upload)
# RETURN: {}

@dashboard_access
def upload_file(request):
    parent_path = request.GET.get('path')
    file_to_upload = request.FILES.get('file')
    with open(os.path.join(parent_path, file_to_upload.name), "wb") as f:
        f.write(file_to_upload.read())
    return JsonResponse({})


# ZIP FILES VIEW
# POST (toSave: path to save zip file, filename: filename of zip, items: paths to zip joined by ';;;')
# RETURN {path: path to saved file (sometimes from temp files)}

@dashboard_access
def zip_files(request):
    filename = 'temp.zip'
    destination_path = os.path.join(settings.TEMP_ROOT, 'dashboard')

    if request.POST.get('toSave') != 'null':
        destination_path = request.POST.get('toSave')

    if not os.path.exists(destination_path):
        return JsonResponse({
            'error': 'Path to save does not exists'
        })

    if not os.access(destination_path, os.W_OK):
        return JsonResponse({
            'error': 'I do not have access to this directory'
        })

    if request.POST.get('filename') != 'null':
        filename = request.POST.get('filename')

    if not filename.endswith('.zip'):
        filename += '.zip'

    paths = request.POST.get('items').split(';;;')
    path_to_save = os.path.join(destination_path, filename)

    if os.path.exists(path_to_save):
        os.remove(path_to_save)

    create_zip_file(paths, path_to_save)
    return JsonResponse({
        'path': path_to_save
    })


# MOVE FILES AND FOLDER VIEW
# POST (moveTo: path to folder, items: paths of items to move to this folder)
# RETURN: {}

@dashboard_access
def move_files_view(request):
    move_to = request.POST.get('moveTo')
    items_to_move = request.POST.get('items').split(';;;')
    copy_mode = request.POST.get('copy') == 'true'

    if not os.path.exists(move_to):
        return JsonResponse({
            'error': 'Destination path does not exists'
        })

    for item_to_move in items_to_move:
        print(item_to_move)
        try:
            if os.path.exists(item_to_move):
                if os.path.isfile(item_to_move):
                    filename = os.path.basename(item_to_move)
                    filename = free_filename(filename, move_to)
                    new_full_path = os.path.join(move_to, filename)
                    shutil.copy(item_to_move, new_full_path)
                    if not copy_mode:
                        os.remove(item_to_move)
                else:
                    folder_name = os.path.basename(item_to_move)
                    folder_name = free_filename(folder_name, move_to)
                    new_full_path = os.path.join(move_to, folder_name)
                    shutil.copytree(item_to_move, new_full_path)
                    if not copy_mode:
                        shutil.rmtree(item_to_move)
        except PermissionError:
            ...
    return JsonResponse({})


urlpatterns = [
    path('content/', get_content_of_folder),
    path('file/', get_file_content),
    path('init/', init_files),
    path('mkdir/', mkdir),
    path('remove/', remove),
    path('touch/', create_file),
    path('upload/', upload_file),
    path('zip/', zip_files),
    path('move/', move_files_view),
]
