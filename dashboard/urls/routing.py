from django.urls import path, re_path
from dashboard.views.terminal import websocket_urlpatterns as termnial_websocket_urlpatterns
from channels.routing import URLRouter

websockets = {
    'terminal': termnial_websocket_urlpatterns
}

