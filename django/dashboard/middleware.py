from termcolor import colored
from datetime import datetime
from dashboard.configuration.config import SERVER_CONFIG
from django.http import JsonResponse
from django.urls import resolve
from django.shortcuts import render
from .models import Log
from .utils import get_client_ip

colors_by_method = {
    'POST': 'white',
    'GET': 'magenta',
    'PATCH': 'green',
    'PUT': 'blue',
    'DELETE': 'red'
}


def log_request(request, response):
    method = (request.POST.get('method') or request.method).upper()
    path = request.get_full_path()
    user = request.user
    username = user.username if request.user.is_authenticated else None
    print(colored(f"{method} - {response.status_code} - {path} - {username} - {datetime.now()}", colors_by_method.get(method)))    


class DashboardMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not SERVER_CONFIG.ENABLE_SERVER():
            try:
                resolver_match = resolve(request.path_info)
                view_func = resolver_match.func
                app_name = view_func.__module__.split('.')[0]
                print(app_name)
                if app_name != 'dashboard':
                    return render(request, 'server_disabled.html', status=401)
            except:
                return render(request, 'server_disabled.html', status=401)
           


        response = self.get_response(request)
        method = (request.POST.get('method') or request.method).upper()
        url = request.get_full_path()
        args = {}

        if len(url.split('?')) > 1:
            for equation in url.split('?')[1].split('&'):
                key, val = equation.split('=')
                args[key] = val

        log = Log(
            ip_v4=get_client_ip(request),
            method=method,
            path=url.split('?')[0],
            status_code = response.status_code,
            device=request.META.get('HTTP_USER_AGENT'),
            user=request.user if request.user.is_authenticated else None,
            session=None,
            args=args,
        )
        log.save()
        log_request(request, response)
        return response