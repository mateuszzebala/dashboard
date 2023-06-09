from django.urls import path
from django.http import JsonResponse
from dashboard.configuration.config import CONFIG, set_configuration
from django.conf import settings


def manage_configuration_view(reqeust):
    if reqeust.POST.get('method') == 'PATCH':
        enable_server = reqeust.POST.get('enable_server') == "true"
        debug = reqeust.POST.get('debug') == "true"
        new_users = reqeust.POST.get('new_users') == "true"
        ddos_block = reqeust.POST.get('ddos_block') == "true"
        save_requests = reqeust.POST.get('save_requests') == "true"
        set_configuration('enable_server', enable_server)
        set_configuration('debug', debug)
        set_configuration('new_users', new_users)
        set_configuration('ddos_block', ddos_block)
        set_configuration('save_requests', save_requests)
        settings.DEBUG = debug
    return JsonResponse(dict((name, bool(value)) for name, value in CONFIG.CONFIGURATION.items()))

urlpatterns = [
    path('configuration/', manage_configuration_view), # MANAGE CONFIGURATION 
]