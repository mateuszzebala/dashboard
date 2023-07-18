from django.urls import path
from django.http import JsonResponse
from .auth import is_superuser
import subprocess
import os

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
        'filename': path.split(os.sep)[-1],
        'parent': os.path.abspath(os.path.join(path, os.pardir)),
    })

@is_superuser
def save_image(request):
    path = request.GET.get('path')
    print(request.POST.get('imageData'))
    return JsonResponse({})




urlpatterns = [
    path('json/', file_json), # GET INTO ABOUT FILE IN JSON
    path('save/run/', run_command), # RUN COMMAND IN FILE LOCATION
    path('save/text/', save_file), # SAVE FILE
    path('save/image/', save_image), # SAVE IMAGE
]