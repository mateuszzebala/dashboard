import platform
from django.urls import path, re_path
from django.http import JsonResponse
from .auth import dashboard_access
import subprocess
from pathlib import Path
import re
import signal
import os
from django.conf import settings
from dashboard.configuration.settings import SETTINGS
from channels.generic.websocket import AsyncWebsocketConsumer
import json

processes = {}

class TerminalConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("start of session")
        await self.accept()

    async def disconnect(self, code):
        print("end of session")
        pass

    async def receive(self, command):
        await self.send(text_data=json.dumps({
            'message': 'HELLO'
        }))



@dashboard_access
def kill_process(request):
    if processes.get(request.user.id) is not None:
        for process in processes[request.user.id]:
            try:
                process.terminate()
                process.kill()
            except:
                return JsonResponse({'done':False})
    return JsonResponse({'done':True})

@dashboard_access
def command(request):
    path = request.POST.get('path')
    path_splitted = request.POST.get('path').split(os.sep)
    cmd = request.POST.get('command')
    interpreter = SETTINGS.get('terminal.sh_type')

    if interpreter == 'cmd':
        interpreter = 'C:\Windows\System32\cmd.exe'

    process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, cwd=path, executable=interpreter)
    
    if processes.get(request.user.id) is None:
        processes[request.user.id] = []
    processes[request.user.id].append(process)
    output, errors = process.communicate()
    processes[request.user.id].remove(process)
    request.session.save()

    if cmd.startswith('cd ') and len(errors) == 0:
        folder = cmd[3:]
        if folder == '..':
            slesh_position = path.rfind(os.sep)
            path = path[:slesh_position]
        else:
            path = os.path.join(path, folder)

    return JsonResponse({
        'output': output.decode(),
        'errors': errors.decode(),
        'path': path,
        'folder_content': os.listdir(path)
    })


@dashboard_access
def init_terminal(request):
    path = request.POST.get('path') if request.POST.get('path') != 'null' else Path.home() 
    return JsonResponse({
        'root': str(os.path.abspath(os.sep)),
        'path': str(path),
        'home': str(Path.home()),
        'project': str(settings.BASE_DIR),
        'folder_content': os.listdir(path),
        'os': platform.system(),
    })


urlpatterns = [
    path('init/', init_terminal), # GET USER PATH
    path('command/', command), # COMMAND FOR TERMINAL
    path('kill/', kill_process), # KILL ALL PROCESSES
]

websocket_urlpatterns = [
    path('run/', TerminalConsumer.as_asgi()),
]