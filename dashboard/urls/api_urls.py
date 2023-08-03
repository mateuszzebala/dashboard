from django.urls import path, include


views = [
    'database',
    'home',
    'auth',
    'terminal',
    'files',
    'editor',
    'other',
    'statistics',
    'users'
]


urlpatterns = [path(f'{view}/', include(f'dashboard.views.{view}')) for view in views]
