from django.urls import path
from django.http import JsonResponse
from .auth import is_superuser
import subprocess
from pathlib import Path
import re
import os
from django.conf import settings


@is_superuser
def command(request):
    path = request.POST.get('path').split(os.sep)
    cmd = request.POST.get('command')
    process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, cwd=os.sep.join(path))
    output, errors = process.communicate()

    if re.search('cd [a-zA-Z]*', cmd) and len(errors) == 0:
        folder = cmd.split(' ')[1]
        if folder == '..':
            path = path[:-1]
        else:
            path.append(folder)

    return JsonResponse({
        'output': output.decode(),
        'errors': errors.decode(),
        'path': os.sep.join(path),
        'folder_content': os.listdir(os.sep.join(path))
    })

@is_superuser
def init_terminal(request):
    path = request.POST.get('path') if request.POST.get('path') != 'null' else Path.home() 
    return JsonResponse({
        'path': str(path),
        'home': str(Path.home()),
        'project': str(settings.BASE_DIR),
        'folder_content': os.listdir(path),
    })


urlpatterns = [
    path('init/', init_terminal), # GET USER PATH
    path('command/', command), # COMMAND FOR TERMINAL
]