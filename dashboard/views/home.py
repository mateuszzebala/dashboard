from django.urls import path
from django.http import JsonResponse
from django.conf import settings
from dashboard.models import RequestLog
from .auth import dashboard_access
import platform
import sys

@dashboard_access
def get_last_logs_view(request):
    last_logs = list(RequestLog.objects.all().order_by('datetime').reverse())[0:50]
    return JsonResponse({
        'logs': [
            {
                'ip_v4': log.ip_v4,
                'datetime': {
                    'year': log.datetime.year, 
                    'month': log.datetime.month, 
                    'day': log.datetime.day,
                    'hours': log.datetime.hour,
                    'minutes': log.datetime.minute,
                    'seconds': log.datetime.second
                },
                'method': log.method,
                'path': log.path,
                'args': log.args,
                'status_code': log.status_code,
                'device': log.device.split(' ')[0],
            } for log in last_logs
        ]
    })

@dashboard_access
def get_server_information(request):
    return JsonResponse({
        'Machine': platform.machine(),
        'System': platform.system(),
        'Computer': platform.uname().node,
        'Python version': sys.version.split(" ")[0],
        'Installed apps': ", ".join(list(map(lambda app: app.split('.')[-1], settings.INSTALLED_APPS))),
        'Database type': settings.DATABASES['default']['ENGINE'].split('.')[-1],
        'Timezone': settings.TIME_ZONE,
        'Language': settings.LANGUAGE_CODE
    })

urlpatterns = [
    path('logs/', get_last_logs_view), # GET LAST LOGS 
    path('informations/', get_server_information), # GET LAST LOGS 
]
