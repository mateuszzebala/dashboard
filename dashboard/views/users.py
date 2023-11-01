from django.urls import path
from django.http import JsonResponse
from django.contrib.auth.models import User
from dashboard.models import Account
from .auth import dashboard_access
from datetime import date
from django.contrib.sessions.models import Session


@dashboard_access
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
        'phone': account.phone,
        'state': account.state,
        'zip_code': account.zip_code,
        'website': account.website,
        'pronouns': account.pronouns,
    })

@dashboard_access
def edit_user(request, userId):
    user = User.objects.filter(id=userId).first()
    account = Account.objects.filter(user__id=userId).first()
    user.username = request.POST.get('username')
    user.first_name = request.POST.get('first_name')
    user.last_name = request.POST.get('last_name')
    user.email = request.POST.get('email')
    account.phone = request.POST.get('phone')
    account.bio = request.POST.get('bio')
    account.birth_date = date(*list(map(lambda i: int(i), request.POST.get('birth_date').split('-'))))
    account.address = request.POST.get('address')
    account.street = request.POST.get('street')
    account.city = request.POST.get('city')
    account.phone = request.POST.get('phone')
    account.state = request.POST.get('state')
    account.zip_code = request.POST.get('zip_code')
    account.website = request.POST.get('website')
    account.pronouns = request.POST.get('pronouns')
    account.image = request.FILES.get('profileImage') or account.image
    user.save()
    account.save()
    return JsonResponse({})


@dashboard_access
def logout_user(request):
    user_pk = request.POST.get('id')
    user = User.objects.filter(pk=user_pk).first()
    if user is not None:
        sessions = Session.objects.all()
        for session in sessions:
            if int(session.get_decoded().get('_auth_user_id')) == user.id:
                session.delete()
    return JsonResponse({})


@dashboard_access
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


urlpatterns = [
    path('logout/', logout_user),
    path('<int:userId>/', get_account),
    path('edit/<userId>/', edit_user),
    path('active/', active_user),
]