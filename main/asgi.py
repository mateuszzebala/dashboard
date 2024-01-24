import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from devboard.views.terminal import TerminalConsumer
from django.urls import path
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': URLRouter(
        [
            path('devboard/api/ws/terminal/sh/', TerminalConsumer.as_asgi()),
        ]
    )
})

