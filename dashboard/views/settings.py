from django.urls import path
from .auth import dashboard_access
from django.http import JsonResponse
import json
from dashboard.utils import flatten_dict

settings_json_file_path = 'dashboard/configuration/settings.json'

@dashboard_access
def set_settings(request):
    json_data = json.loads(request.POST.get('settings'))
    old_settings = json.load(open(settings_json_file_path, 'r'))
    for key, value in json_data.items():
        root = old_settings
        key_split = key.split('.')
        for k in key_split[:-1]:
            if root.get(k) is None:
                root[k] = {}
            root = root[k]
        root[key_split[-1]] = value
    json.dump(old_settings, open(settings_json_file_path, 'w'), indent=4)
    return JsonResponse({
        'saved': True
    })

@dashboard_access
def get_settings(request):

    return JsonResponse(flatten_dict(json.load(open(settings_json_file_path, 'r'))))

urlpatterns = [
    path('set/', set_settings),
    path('get/', get_settings),
]