from django.urls import path, include

urlpatterns = [
    path('api/', include('dashboard.urls.api_urls')),
]
