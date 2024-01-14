from django.urls import path
from .auth import devboard_access
from django.http import JsonResponse
import json
from devboard.utils import flatten_dict
from devboard.configuration.settings import SETTINGS

@devboard_access
def set_settings(request):
    json_data = json.loads(request.POST.get('settings'))
    for key, value in json_data.items():
        SETTINGS.set(key, value)
    SETTINGS.init()
    return JsonResponse(SETTINGS.get_all_props())

@devboard_access
def get_settings(request):
    return JsonResponse(SETTINGS.get_all_props())

urlpatterns = [
    path('set/', set_settings),
    path('get/', get_settings),
]
