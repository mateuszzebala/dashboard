from django.urls import path
from django.http import JsonResponse
from dashboard.configuration.config import set_settings_prop, SERVER_CONFIG, load_configuration
from django.conf import settings
from dashboard.models import RequestLog
from .auth import dashboard_access
from dashboard.views.settings import settings_json_file_path

@dashboard_access
def manage_server_configuration_view(request):
    if request.POST.get('method') == 'PATCH':
        enable_server = request.POST.get('enable_server') == "true"
        debug = request.POST.get('debug') == "true"
        new_users = request.POST.get('new_users') == "true"
        ddos_block = request.POST.get('ddos_block') == "true"
        credientals = request.POST.get('credientals') == "true"
        save_requests = request.POST.get('save_requests') == "true"
        set_settings_prop('server.config.enable_server', enable_server)
        set_settings_prop('server.config.debug', debug)
        set_settings_prop('server.config.new_users', new_users)
        set_settings_prop('server.config.ddos_block', ddos_block)
        set_settings_prop('server.config.credientals', credientals)
        set_settings_prop('server.config.save_requests', save_requests)
        load_configuration()
    return JsonResponse(dict((name, bool(value)) for name, value in SERVER_CONFIG.CONFIGURATION.items()))

@dashboard_access
def manage_allowed_hosts_view(request):
    if request.POST.get('method') == 'PATCH':
        set_settings_prop('server.allowed_hosts', request.POST.get('hosts').split(','))
        load_configuration()
    return JsonResponse({'hosts':SERVER_CONFIG.GET_ALLOWED_HOSTS()})

@dashboard_access
def manage_cors_allowed_origins_view(request):
    if request.POST.get('method') == 'PATCH':
        set_settings_prop('server.cors_allowed_origins', request.POST.get('hosts').split(','))
        load_configuration()
    return JsonResponse({'hosts':SERVER_CONFIG.GET_CORS_ALLOWED_ORIGINS()})

@dashboard_access
def manage_csrf_trusted_origins_view(request):
    if request.POST.get('method') == 'PATCH':
        set_settings_prop('server.csrf_trusted_origins', request.POST.get('hosts').split(','))
        load_configuration()
    return JsonResponse({'hosts':SERVER_CONFIG.GET_CSRF_TRUSTED_ORIGINS()})

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
    path('configuration/', manage_server_configuration_view), # MANAGE SERVER CONFIGURATION 
    path('hosts/allowed_hosts/', manage_allowed_hosts_view), # MANAGE HOSTS CONFIGURATION 
    path('hosts/cors_allowed_origins/', manage_cors_allowed_origins_view), # MANAGE CORS ALLOWED ORIGINS
    path('hosts/csrf_trusted_origins/', manage_csrf_trusted_origins_view), # MANAGE CSRF TRUSTED ORIGINS
    path('logs/', get_last_logs_view), # GET LAST LOGS 
]
