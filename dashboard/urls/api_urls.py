from django.urls import path, include


views = [
    'database',
    'home',
    'auth',
    'terminal',
    'files',
    'editor'
]


urlpatterns = [path(f'{view}/', include(f'dashboard.views.{view}')) for view in views]
