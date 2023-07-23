from django.urls import path
from django.http import JsonResponse
from .auth import is_superuser
import subprocess
from dashboard.models import Configuration
import os
from dashboard.utils import get_type_of_file

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

    last = Configuration.objects.filter(name='editor_last').first()
    if last is not None:
        last.value = {'files': [*set([*last.value['files'], request.GET.get('path')])]}
        last.save()
    else:
        last = Configuration(name='editor_last', value={'files': [request.GET.get('path')]})
    
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

@is_superuser
def like_file(request):
    path = request.GET.get('path')
    liked = Configuration.objects.filter(name='editor_liked').first()
    if liked is not None:
        liked.value = {'files': [*set([*liked.value['files'], request.GET.get('path')])]}
        liked.save()
    else:
        liked = Configuration(name='editor_liked', value={'files': [request.GET.get('path')]})
    return JsonResponse({})

@is_superuser
def last_and_liked(request):
    last = Configuration.objects.filter(name='editor_last').first()
    liked = Configuration.objects.filter(name='editor_liked').first()

    if last is None:
        last = []
    else:
        last = last.value['files']

    if liked is None:
        liked = []
    else:
        liked = liked.value['files']

    new_last, new_liked = [], []

    for file in last:
        if os.path.exists(file):
            new_last.append(file)
    
    for file in liked:
        if os.path.exists(file):
            new_liked.append(file)

    last = Configuration.objects.filter(name='editor_last').first()
    if last is not None:
        last.value = {'files': new_last[0:50]}
        last.save()
    else:
        last = Configuration(name='editor_last', value={'files': []})
        last.save()

    liked = Configuration.objects.filter(name='editor_liked').first()
    if liked is not None:
        liked.value = {'files': new_liked}
        liked.save()
    else:
        liked = Configuration(name='editor_liked', value={'files': []})
        liked.save()

    return JsonResponse({
        'last': [{'path': path, 'basename': os.path.basename(path), 'type': get_type_of_file(os.path.basename(path))} for path in new_last],
        'liked': [{'path': path, 'basename': os.path.basename(path), 'type': get_type_of_file(os.path.basename(path))} for path in new_liked],
    })
        

urlpatterns = [
    path('json/', file_json), # GET INTO ABOUT FILE IN JSON
    path('save/run/', run_command), # RUN COMMAND IN FILE LOCATION
    path('save/text/', save_file), # SAVE FILE
    path('save/image/', save_image), # SAVE IMAGE
    path('last&liked/', last_and_liked), # LAST AND LIKED
    path('like/', like_file), # LIKE] FILE
]