from django.urls import path
from django.http import JsonResponse, FileResponse
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect
from devboard.models import QrCodeAuth, Account
from uuid import uuid4
import qrcode
import os

def devboard_user_access(user):
    return user.is_superuser or user.groups.filter(name='devboard_admin').exists()

@csrf_exempt
def signin(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
    return JsonResponse({
        'username': user.username if user is not None else None,
        'done': True if user else False
    })

@csrf_exempt
def csrf(request):
    return JsonResponse({
        'token': get_token(request),
        'username': request.user.username if request.user.is_authenticated else None,
        'access': devboard_user_access(request.user)
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
            'id': request.user.id,
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'is_superuser': request.user.is_superuser,
            'is_active': request.user.is_active,
            'is_staff': request.user.is_staff,
            'devboard_access': devboard_user_access(request.user)
        })
    else:
        resp = JsonResponse({
            'signin': False,
        })
        resp.status_code = 403
        return resp

def devboard_access(fnc):
    def inner(*args, **kwargs):
        request = args[0]
        have_access = devboard_user_access(request.user)
        if have_access:
            return fnc(*args, **kwargs)
        else:
            response = JsonResponse({
                'error': 'You do not have access to this API. You should be a superuser.'
            })
            response.status_code = 403
            return response

    return inner

@devboard_access
def generate_auth_qrcode(request):
    token = str(uuid4())
    fillColor = request.GET.get('fillColor') or 'black'
    backgroundColor = request.GET.get('backgroundColor') or 'white'
    qr = qrcode.QRCode(border=2, box_size=10)
    url = request.build_absolute_uri().split('?')[0]
    qr.add_data(url + token + '/')
    image = qr.make_image(fill_color=fillColor, back_color=backgroundColor)
    os.makedirs('media/devboard/auth/qrcode/', exist_ok=True)
    image.save(f'media/devboard/auth/qrcode/{token}.png')
    code = QrCodeAuth(token=token, user=request.user, file=f'media/devboard/auth/qrcode/{token}.png')
    code.save()
    return FileResponse(open(f'media/devboard/auth/qrcode/{token}.png', 'rb'))

def get_auth_by_code(request, token):
    code = QrCodeAuth.objects.filter(token=token).first()
    if code is not None:
        if code.datetime.today:
            login(request, code.user)
            #os.remove(code.file.path)
            code.delete()
    return redirect('devboard:app', path='')

def profile_picture(request, username):
    account = Account.objects.filter(user__username=username).first()
    if account is not None:
        if account.image and os.path.exists(account.image.path):
            return FileResponse(open(account.image.path, 'rb'))
        else:
            if account.gender == 'woman':
                return FileResponse(open('media/devboard/auth/account/defaults/woman1.png', 'rb'))
    return FileResponse(open('media/devboard/auth/account/defaults/man1.png', 'rb'))

@devboard_access
def test_view(request):
    response = JsonResponse({
        'success': 'You have access to API.'
    })
    response.status_code = 200
    return response

urlpatterns = [
    path('signin/', signin), # SIGN IN USER
    path('logout/', logout_view), # SIGN IN USER
    path('csrf/', csrf), # GET CSRF TOKEN
    path('me/', me), # AM I SIGN IN?
    path('profile/<username>/', profile_picture), # GET PROFILE PICTURE
    path('qrcode/', generate_auth_qrcode), # GENERATE QR CODE
    path('qrcode/<token>/', get_auth_by_code), # AUTH BY QRCODE
    path('test/', test_view), # AUTH BY QRCODE
]
