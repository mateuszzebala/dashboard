from django.urls import path, include


views = [
    'database',
    'home'
]


urlpatterns = [path(f'{view}/', include(f'dashboard.views.{view}')) for view in views]
