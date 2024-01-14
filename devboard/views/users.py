from django.urls import path
from django.http import JsonResponse
from django.contrib.auth.models import User
from devboard.models import Account
from .auth import devboard_access
from datetime import date
from django.contrib.sessions.models import Session
from django.contrib.auth import login


@devboard_access
def get_account(request, userId):
    user = User.objects.filter(id=userId).first()
    account = Account.objects.filter(user__id=userId).first()

    return JsonResponse({
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'phone': account.phone,
        'bio': account.bio,
        'birth_date': account.birth_date,
        'address': account.address,
        'street': account.street,
        'city': account.city,
        'country': account.country,
        'phone': account.phone,
        'state': account.state,
        'zip_code': account.zip_code,
        'website': account.website,
        'pronouns': account.pronouns,
        'gender': account.gender,
    })

@devboard_access
def edit_user(request, userId):
    user = User.objects.filter(id=userId).first()
    account = Account.objects.filter(user__id=userId).first()
    user.username = request.POST.get('username')
    user.first_name = request.POST.get('first_name') or ''
    user.last_name = request.POST.get('last_name') or ''
    user.email = request.POST.get('email') or ''
    account.phone = request.POST.get('phone') or ''
    account.bio = request.POST.get('bio') or ''
    account.birth_date = date(*list(map(lambda i: int(i), request.POST.get('birth_date').split('-'))))
    account.address = request.POST.get('address') or ''
    account.street = request.POST.get('street') or ''
    account.city = request.POST.get('city') or ''
    account.country = request.POST.get('country') or ''
    account.phone = request.POST.get('phone') or ''
    account.state = request.POST.get('state') or ''
    account.zip_code = request.POST.get('zip_code') or ''
    account.website = request.POST.get('website') or ''
    account.pronouns = request.POST.get('pronouns') or ''
    account.image = request.FILES.get('profileImage') or account.image
    account.gender = request.POST.get('gender') or ''
    user.save()
    account.save()
    return JsonResponse({})


@devboard_access
def logout_user(request):
    user_pk = request.POST.get('id')
    user = User.objects.filter(pk=user_pk).first()
    if user is not None:
        sessions = Session.objects.all()
        for session in sessions:
            if int(session.get_decoded().get('_auth_user_id')) == user.id:
                session.delete()
    return JsonResponse({})

@devboard_access
def singin_by_id(request, pk):
    user = User.objects.filter(pk=pk).first()
    print(user)
    if user is not None:
        login(request, user)
    return JsonResponse({})

@devboard_access
def active_user(request):
    user_pk = request.POST.get('id')
    active = request.POST.get('active') == 'true'
    user = User.objects.filter(pk=user_pk).first()
    if user is not None and request.POST.get('active') is not None:
        user.is_active = active
        user.save()
    return JsonResponse({
        'active': user.is_active
    })

@devboard_access
def create_account(request):
    user = User()
    user.username = request.POST.get('username')
    user.first_name = request.POST.get('first_name') or ''
    user.last_name = request.POST.get('last_name') or ''
    user.email = request.POST.get('email') or ''
    user.save()
    user.set_password(request.POST.get('password'))
    user.save()
    account = Account()
    account.user = user
    account.phone = request.POST.get('phone') or ''
    account.bio = request.POST.get('bio') or ''
    account.birth_date = date(*list(map(lambda i: int(i), request.POST.get('birth_date').split('-')))) if request.POST.get('birth_date') is not None else None
    account.address = request.POST.get('address') or ''
    account.street = request.POST.get('street') or ''
    account.city = request.POST.get('city') or ''
    account.country = request.POST.get('country') or ''
    account.phone = request.POST.get('phone') or ''
    account.state = request.POST.get('state') or ''
    account.zip_code = request.POST.get('zip_code') or ''
    account.website = request.POST.get('website') or ''
    account.pronouns = request.POST.get('pronouns') or ''
    account.image = request.FILES.get('profileImage') or None
    account.gender = request.POST.get('gender') or ''
    account.save()
    return JsonResponse({
        'pk': account.id,
    })


urlpatterns = [
    path('logout/', logout_user),
    path('create/', create_account),
    path('edit/<userId>/', edit_user),
    path('signin/<pk>/', singin_by_id),
    path('active/', active_user),
    path('<int:userId>/', get_account),
]
