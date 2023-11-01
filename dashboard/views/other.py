from django.urls import path
from django.http import JsonResponse
from dashboard.models import Configuration
from dashboard.utils import Config
import json
import datetime, time
from .auth import dashboard_access

@dashboard_access
def set_config(request): 
    name = request.GET.get('name')
    value = json.loads(request.POST.get('value'))
    Config.set(name, value)
    return JsonResponse({})

@dashboard_access
def get_config(request): 
    name = request.GET.get('name')
    return JsonResponse({
        'value': Config.get(name)
    })

@dashboard_access
def config(request):
    configs = Configuration.objects.all()
    return JsonResponse(dict((conf.name, conf.value) for conf in configs))

@dashboard_access
def get_time(request): 
    now = datetime.datetime.now()
    return JsonResponse({
        'hour': now.hour,
        'minute': now.minute,
        'second': now.second,
        'time_zone': time.timezone/3600
    })

urlpatterns = [
    path('config/', config),
    path('config/get/', get_config),
    path('config/set/', set_config),
    path('time/', get_time),
]