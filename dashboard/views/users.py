from django.urls import path
from django.http import JsonResponse
from django.contrib.auth.models import User
from dashboard.models import Account
from .auth import is_superuser

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


urlpatterns = [
    path('<userId>/', get_account),
]