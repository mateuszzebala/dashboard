from django.urls import re_path, path, include
from dashboard.views.app import host_app
urlpatterns = [
    path('api/', include('dashboard.urls.api_urls')),
    re_path(r'^(?P<path>.*)$', host_app),
]
