from django.urls import path
from .auth import dashboard_access
from django.http import JsonResponse
import json
from dashboard.utils import flatten_dict
from dashboard.configuration.settings import SETTINGS

@dashboard_access
def set_settings(request):
    json_data = json.loads(request.POST.get('settings'))
    for key, value in json_data.items():
        SETTINGS.set(key, value)
    SETTINGS.init()
    return JsonResponse(SETTINGS.get_all_props())

@dashboard_access
def get_settings(request):
    return JsonResponse(SETTINGS.get_all_props())

urlpatterns = [
    path('set/', set_settings),
    path('get/', get_settings),
]
