from django.urls import path
from django.http import JsonResponse
from .auth import is_superuser
from pathlib import Path
from django.conf import settings
import os

def get_content_of_folder(request):
    path = request.POST.get('path')
    
    files, folders = [], []
    content = os.scandir(path)
    
    for item in content:
        if os.path.isfile(item):
            files.append(item.name)
        else:
            folders.append(item.name)
    
    return JsonResponse({
        'files': files,
        'folders': folders
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
    
]