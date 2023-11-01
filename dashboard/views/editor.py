from django.urls import path
from django.http import JsonResponse
from .auth import dashboard_access
import subprocess
from dashboard.models import Configuration
import os
from dashboard.utils import get_type_of_file, Config
import json
from PIL import Image, ImageEnhance


@dashboard_access
def save_file(request):
    path = request.GET.get('path')
    content = request.POST.get('content').encode()
    with open(path, 'wb') as file: 
        file.write(content)
    return JsonResponse({})

@dashboard_access
def run_command(request):
    path = request.GET.get('path')
    command = request.POST.get('command')
    content = request.POST.get('content').encode()
    with open(path, 'wb') as file: 
        file.write(content)
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, cwd=os.path.split(path)[0])
    output, errors = process.communicate()
    return JsonResponse({
        'output': output.decode(),
        'errors': errors.decode(),
    })


@dashboard_access
def file_json(request):
    path = request.GET.get('path')
    return JsonResponse({
        'path': path,
        'exists': os.path.exists(path),
        'filename': path.split(os.sep)[-1],
        'parent': os.path.abspath(os.path.join(path, os.pardir)),
        'type': get_type_of_file(path.split(os.sep)[-1])
    })

@dashboard_access
def save_image(request):
    path = request.GET.get('path')
    props = json.loads(request.POST.get('props'))
    return JsonResponse({})

@dashboard_access
def liked_and_last(request):
    with open("configuration/liked&last.json", "r") as json_file:
        configuration = json.load(json_file)

    action = request.POST.get('action')
    if action == 'ADD':
        what = request.POST.get('what')
        if what == 'like':
            configuration['likes'].append(request.POST.get('path'))
        if what == 'last':
            configuration['last'] = [request.POST.get('path'), *configuration['last']]
    if action == 'REMOVE':
        what = request.POST.get('what')
        if what == 'like':
            configuration['likes'] = list(filter(lambda path: path != request.POST.get('path'), configuration['likes']))
        if what == 'last':
            configuration['last'] = list(filter(lambda path: path != request.POST.get('path'), configuration['last']))

    with open("configuration/liked&last.json", "w") as json_file:
        json.dump(configuration, json_file, indent=4)
    return JsonResponse(configuration)

urlpatterns = [
    path('json/', file_json), # GET INTO ABOUT FILE IN JSON
    path('save/run/', run_command), # RUN COMMAND IN FILE LOCATION
    path('save/text/', save_file), # SAVE FILE
    path('liked&last/', liked_and_last), # SAVE FILE
    path('save/image/', save_image), # SAVE IMAGE
]