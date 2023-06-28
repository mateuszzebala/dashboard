from django.urls import path
from django.http import JsonResponse
from .auth import is_superuser
from pathlib import Path
from django.conf import settings
import os

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
                'access': os.access(os.sep.join([*list_path, item.name]), os.W_OK)
            })
        else:
            folders.append({
                'name': item.name,
                'path': os.sep.join([*list_path, item.name]),
                'access': os.access(os.sep.join([*list_path, item.name]), os.W_OK)
            })
    
    return JsonResponse({
        'files': files,
        'folders': folders,
        'permission_error': permission_error ,
        'sep': os.sep
    })

def init_files(request):
    path = request.POST.get('path') if request.POST.get('path') != 'null' else Path.home() 
    return JsonResponse({
        'path': str(path),
        'home': str(Path.home()),
        'project': str(settings.BASE_DIR),
    })

urlpatterns = [
    path('content/', get_content_of_folder), # GET CONTENT OF FOLER
    path('init/', init_files), # INIT FILES
    
]