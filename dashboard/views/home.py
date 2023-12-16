from django.urls import path
from django.http import JsonResponse
from django.conf import settings
from dashboard.models import RequestLog
from .auth import dashboard_access

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

urlpatterns = [
    path('logs/', get_last_logs_view), # GET LAST LOGS 
]
