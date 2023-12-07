from django.urls import path
from .auth import dashboard_access
from django.http import JsonResponse
import json
from dashboard.utils import flatten_dict
from dashboard.configuration.config import load_configuration, set_settings_prop, settings_json_file_path


@dashboard_access
def set_settings(request):
    json_data = json.loads(request.POST.get('settings'))
    for key, value in json_data.items():
        set_settings_prop(key, value)
    load_configuration()
    return JsonResponse({})

@dashboard_access
def get_settings(request):
    return JsonResponse(flatten_dict(json.load(open(settings_json_file_path, 'r'))))

urlpatterns = [
    path('set/', set_settings),
    path('get/', get_settings),
]