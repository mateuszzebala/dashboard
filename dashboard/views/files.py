from django.urls import path
from django.http import JsonResponse, FileResponse
from .auth import is_superuser
from pathlib import Path
from django.conf import settings
import os
import shutil
from dashboard.utils import get_type_of_file

@is_superuser
def get_content_of_folder(request):

    path = request.POST.get('path')
    list_path = path.split(os.sep)

    permission_error = False

    files, folders = [], []
    try:
        content = os.scandir(path)
    except PermissionError:
        permission_error = True
        content = []
    
    for item in content:

        if os.path.isfile(item):
            files.append({
                'name': item.name,
                'path': os.sep.join([*list_path, item.name]),
                'is_file': True,
                'access': os.access(os.sep.join([*list_path, item.name]), os.W_OK),
                'type': get_type_of_file(item.name)
            })
        else:
            folders.append({
                'name': item.name,
                'is_file': False,
                'path': os.sep.join([*list_path, item.name]),
                'access': os.access(os.sep.join([*list_path, item.name]), os.W_OK)
            })
    
    return JsonResponse({
        'files': files,
        'folders': folders,
        'permission_error': permission_error ,
        'sep': os.sep,
        'parent': os.path.abspath(os.path.join(path, os.pardir))
    })

@is_superuser
def init_files(request):
    path = request.POST.get('path') if request.POST.get('path') != 'null' else Path.home() 
    return JsonResponse({
        'path': str(path),
        'home': str(Path.home()),
        'project': str(settings.BASE_DIR),
    })

@is_superuser
def get_file(request):
    path = request.GET.get('path')
    return FileResponse(open(path, 'rb'))


@is_superuser
def mkdir(request):
    try:
        path = request.POST.get('path')
        name = request.POST.get('name')
        os.mkdir(os.path.join(path, name))
        return JsonResponse({
            'done': True
        })
    except:
        return JsonResponse({
            'done': False
        })
    
@is_superuser
def remove(request):
    paths = request.POST.get('paths')
    errors = 0

    for path in paths.split(';;;'):
        if os.path.isfile(path):
            try:
                os.remove(path)
            except PermissionError:
                errors += 1
        else:
            try:
                shutil.rmtree(path)
            except PermissionError:
                errors += 1
    return JsonResponse({
        'errors': errors > 0
    })

@is_superuser
def touch(request):
    path = request.POST.get('path')
    name = request.POST.get('name')
    file = open(os.path.join(path, name), 'w')
    file.close()
    return JsonResponse({})

@is_superuser
def file_json(request):

    path = request.GET.get('path')
    return JsonResponse({
        'path': path,
        'filename': path.split(os.sep)[-1],
        'parent': os.path.abspath(os.path.join(path, os.pardir)),
    })
   
    
@is_superuser
def save_file(request):
    path = request.GET.get('path')
    content = request.POST.get('content').encode()
    with open(path, 'wb') as file: 
        file.write(content)
    return JsonResponse({})

urlpatterns = [
    path('content/', get_content_of_folder), # GET CONTENT OF FOLER
    path('file/', get_file), # GET FILE
    path('init/', init_files), # INIT FILES
    path('mkdir/', mkdir), # MAKE DIR
    path('remove/', remove), # REMOVE
    path('touch/', touch), # TOUCH
    path('file/json/', file_json), # GET INTO ABOUT FILE IN JSON
    path('file/save/', save_file), # SAVE FILE
    
]