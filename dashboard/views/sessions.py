from django.http import JsonResponse
from .auth import dashboard_access
from django.urls import path
from django.contrib.sessions.models import Session
from django.contrib.auth.models import User
from dashboard.models import Account




@dashboard_access
def get_session_info(request, pk):
    session = Session.objects.filter(pk=pk).first()
    decoded = session.get_decoded()
    user_id = decoded.get('_auth_user_id')
    user = None if user_id is None else User.objects.get(pk=user_id)
    account = None if user is None else Account.objects.filter(user__pk=user.pk).first()
    return JsonResponse({
        'session_key': session.session_key,
        'session_data': decoded,
        'user': None if user is None else {
            'id': user.id,
            'username': user.username,
            'account': None if account is None else account.id
        },
        'expire_date': session.expire_date ,
        'your_session': request.session.session_key == session.session_key
    })


# set expirly, get_session_cookie_age, add to session, remove from session, edit session

urlpatterns = [
    path('<pk>/', get_session_info)
]