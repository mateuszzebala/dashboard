from django.urls import path
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def signin(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
    return JsonResponse({
        'done': request.user.is_authenticated
    })

@csrf_exempt
def csrf(request):
    return JsonResponse({
        'token': get_token(request),
        'username': request.user.username if request.user.is_authenticated else None
    })

def logout_view(request):
    logout(request)
    return JsonResponse({
        'logout': not request.user.is_authenticated,
    })

@csrf_exempt
def me(request):
    if request.user.is_authenticated:
        return JsonResponse({
            'signin': True,
            'username': request.user.username,
            'email': request.user.email,
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'is_superuser': request.user.is_superuser,
            'is_active': request.user.is_active,
            'is_staff': request.user.is_staff,
        })
    else:
        return JsonResponse({
            'signin': False,
        
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