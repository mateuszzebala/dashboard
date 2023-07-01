from django.urls import path
from django.http import JsonResponse
from .auth import is_superuser
import subprocess
from pathlib import Path
import re
import signal
import os
from django.conf import settings


processes = {}

@is_superuser
def kill_process(request):
    if processes.get(request.user.id) is not None:
        for process in processes[request.user.id]:
            try:
                print(process)
                process.terminate()
                process.kill()
            except:
                return JsonResponse({'done':False})
    return JsonResponse({'done':True})

@is_superuser
def command(request):
    path = request.POST.get('path').split(os.sep)
    cmd = request.POST.get('command')
    process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, cwd=os.sep.join(path))
    if processes.get(request.user.id) is None:
        processes[request.user.id] = []
    processes[request.user.id].append(process)
    output, errors = process.communicate()
    processes[request.user.id].remove(process)
    
    request.session.save()
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
        'root': str(os.path.abspath(os.sep)),
        'path': str(path),
        'home': str(Path.home()),
        'project': str(settings.BASE_DIR),
        'folder_content': os.listdir(path),
    })


urlpatterns = [
    path('init/', init_terminal), # GET USER PATH
    path('command/', command), # COMMAND FOR TERMINAL
    path('kill/', kill_process), # KILL ALL PROCESSES
]