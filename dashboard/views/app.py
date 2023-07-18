from django.http import JsonResponse, FileResponse
import os
from django.conf import settings

def host_app(request, path):
    
    path = os.path.join(settings.BASE_DIR, 'dashboard', 'app', 'build', path)

    if os.path.exists(path) and os.path.isfile(path) :
        return FileResponse(open(path, 'rb'))
    else:
        try:
            return FileResponse(open(os.path.join(settings.BASE_DIR, 'dashboard', 'app', 'build', 'index.html'), 'rb'))
        except:
            return JsonResponse({
                'error': 'App not found. Do you forgot to build using command \'yarn run build\'?'
            })