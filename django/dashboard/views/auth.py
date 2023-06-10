from django.urls import path
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token

def signin(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
    return JsonResponse({
        'done': request.user.is_authenticated
    })

def csrf(request):
    return JsonResponse({'token': get_token(request)})

def logout_view(request):
    logout(request)
    return JsonResponse({
        'logout': not request.user.is_authenticated,
    })

def me(request):
    print(request.user)
    return JsonResponse({
        'signin': request.user.is_authenticated,
    })

def is_superuser(fnc):
    def inner(*args, **kwargs):
        request = args[0]
        if request.user.is_superuser:
            return fnc(*args, **kwargs)
        else:
            return JsonResponse({})

    return inner


urlpatterns = [
    path('signin/', signin), # SIGN IN USER
    path('logout/', logout_view), # SIGN IN USER
    path('csrf/', csrf), # GET CSRF TOKEN
    path('me/', me), # AM I SIGN IN?
]