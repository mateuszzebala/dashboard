from django.urls import path
from django.http import JsonResponse
from django.contrib.auth.models import User
from dashboard.models import Account
from .auth import is_superuser
from datetime import date


@is_superuser
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

@is_superuser
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

urlpatterns = [
    path('<userId>/', get_account),
    path('edit/<userId>/', edit_user),
]