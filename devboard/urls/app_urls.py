from django.urls import re_path, path, include
from devboard.views.app import host_app

app_name = 'devboard'

urlpatterns = [
    path('api/', include('devboard.urls.api_urls')),
    re_path(r'^(?P<path>.*)$', host_app, name='app'),
]

