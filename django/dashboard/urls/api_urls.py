from django.urls import path, include


views = [
    'database'
]


urlpatterns = [path(f'{view}/', include(f'dashboard.views.{view}')) for view in views]
