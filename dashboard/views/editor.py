from django.urls import path
from django.http import JsonResponse
from .auth import is_superuser
import subprocess
from dashboard.models import Configuration
import os
from dashboard.utils import get_type_of_file, Config
import json
from PIL import Image, ImageEnhance


@is_superuser
def save_file(request):
    path = request.GET.get('path')
    content = request.POST.get('content').encode()
    with open(path, 'wb') as file: 
        file.write(content)
    return JsonResponse({})

@is_superuser
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


@is_superuser
def file_json(request):
    path = request.GET.get('path')
    return JsonResponse({
        'path': path,
        'exists': os.path.exists(path),
        'filename': path.split(os.sep)[-1],
        'parent': os.path.abspath(os.path.join(path, os.pardir)),
        'type': get_type_of_file(path.split(os.sep)[-1])
    })

@is_superuser
def save_image(request):
    path = request.GET.get('path')
    props = json.loads(request.POST.get('props'))
    return JsonResponse({})

        

urlpatterns = [
    path('json/', file_json), # GET INTO ABOUT FILE IN JSON
    path('save/run/', run_command), # RUN COMMAND IN FILE LOCATION
    path('save/text/', save_file), # SAVE FILE
    path('save/image/', save_image), # SAVE IMAGE
]