from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('devboard/', include('devboard.urls.app_urls')),
]
