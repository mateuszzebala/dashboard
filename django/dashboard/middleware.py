from termcolor import colored
from datetime import datetime

colors_by_method = {
    'POST': 'white',
    'GET': 'magenta',
    'PATCH': 'green',
    'PUT': 'blue',
    'DELETE': 'red'
}

class DashboardMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        method = (request.POST.get('method') or request.method).upper()
        path = request.get_full_path()
        user = request.user
        username = user.username if request.user.is_authenticated else None
        print(colored(f"{method} - {response.status_code} - {path} - {username} - {datetime.now()}", colors_by_method[method]))    
        return response