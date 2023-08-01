from django.urls import path
from django.http import JsonResponse, FileResponse
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect
from dashboard.models import QrCodeAuth
from uuid import uuid4
import qrcode
import os
import datetime

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

@is_superuser
def generate_auth_qrcode(request):
    token = str(uuid4())
    url = request.build_absolute_uri() + token + '/'
    image = qrcode.make(url)
    os.makedirs('Media/dashboard/auth/qrcode/', exist_ok=True)
    image.save(f'Media/dashboard/auth/qrcode/{token}.png')
    code = QrCodeAuth(token=token, url=url, user=request.user, file=f'Media/dashboard/auth/qrcode/{token}.png')
    code.save()
    return FileResponse(open(f'Media/dashboard/auth/qrcode/{token}.png', 'rb'))

def get_qrcode(request, token):
    code = QrCodeAuth.objects.filter(token=token).first()
    if code is None:
        if (datetime.datetime.now() - code.datetime).total_seconds() < 60 * 60:
            login(request, code.user)
    return redirect('dashboard:app', path='/')

urlpatterns = [
    path('signin/', signin), # SIGN IN USER
    path('logout/', logout_view), # SIGN IN USER
    path('csrf/', csrf), # GET CSRF TOKEN
    path('me/', me), # AM I SIGN IN?
    path('qrcode/', generate_auth_qrcode), # GENERATE QR CODE
    path('qrcode/<token>/', get_qrcode, name='getQRcode'), # GENERATE QR CODE
]