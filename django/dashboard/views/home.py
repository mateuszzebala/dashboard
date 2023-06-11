from django.urls import path
from django.http import JsonResponse
from dashboard.configuration.config import SERVER_CONFIG, save_configuration
from django.conf import settings
from dashboard.models import Log
from .auth import is_superuser

@is_superuser
def manage_server_configuration_view(request):
    if request.POST.get('method') == 'PATCH':
        enable_server = request.POST.get('enable_server') == "true"
        debug = request.POST.get('debug') == "true"
        new_users = request.POST.get('new_users') == "true"
        ddos_block = request.POST.get('ddos_block') == "true"
        save_requests = request.POST.get('save_requests') == "true"
        SERVER_CONFIG.CONFIGURATION['enable_server'] = enable_server
        SERVER_CONFIG.CONFIGURATION['debug'] = debug
        SERVER_CONFIG.CONFIGURATION['new_users'] = new_users
        SERVER_CONFIG.CONFIGURATION['ddos_block'] = ddos_block
        SERVER_CONFIG.CONFIGURATION['save_requests'] = save_requests
        settings.DEBUG = debug
        save_configuration()
    return JsonResponse(dict((name, bool(value)) for name, value in SERVER_CONFIG.CONFIGURATION.items()))

@is_superuser
def manage_allowed_hosts(request):
    if request.POST.get('method') == 'PATCH':
        SERVER_CONFIG.ALLOWED_HOSTS = request.POST.get('hosts').split(',')
        settings.ALLOWED_HOSTS = SERVER_CONFIG.ALLOWED_HOSTS
        save_configuration()
    return JsonResponse({'hosts':SERVER_CONFIG.GET_ALLOWED_HOSTS()})

def get_last_logs(request):
    last_logs = list(Log.objects.all().order_by('datetime').reverse())[0:50]
    return JsonResponse({
        'logs': [
            {
                'ip_v4': log.ip_v4,
                'datetime': {
                    'year': log.datetime.year, 
                    'month': log.datetime.month, 
                    'day': log.datetime.day,
                    'hour': log.datetime.hour,
                    'minute': log.datetime.minute,
                    'second': log.datetime.second
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
    path('configuration/', manage_server_configuration_view), # MANAGE SERVER CONFIGURATION 
    path('hosts/', manage_allowed_hosts), # MANAGE HOSTS CONFIGURATION 
    path('logs/', get_last_logs), # GET LAST LOGS 
]
