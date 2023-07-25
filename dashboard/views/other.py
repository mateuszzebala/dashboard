from django.urls import path
from django.http import JsonResponse
from dashboard.models import Configuration
from dashboard.utils import Config

def set_config(request): 
    name = request.GET.get('name')
    value = request.POST.get('value')
    Config.set(name, value)
    return JsonResponse({})

def get_config(request): 
    name = request.GET.get('name')
    return JsonResponse({
        'value': Config.get(name)
    })

def config(request):
    configs = Configuration.objects.all()
    return JsonResponse(dict((conf.name, conf.value) for conf in configs))

urlpatterns = [
    path('config/', config),
    path('config/get/', get_config),
    path('config/set/', set_config),
]