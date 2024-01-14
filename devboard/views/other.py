from django.urls import path
from django.http import JsonResponse
import json
import datetime, time
from .auth import devboard_access

@devboard_access
def get_time(request): 
    now = datetime.datetime.now()
    return JsonResponse({
        'hour': now.hour,
        'minute': now.minute,
        'second': now.second,
        'time_zone': time.timezone/3600
    })

urlpatterns = [
    path('time/', get_time),
]
