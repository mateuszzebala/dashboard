from django.http import JsonResponse
from .auth import dashboard_access, dashboard_user_access
from django.urls import path
from django.contrib.sessions.models import Session
from django.contrib.auth.models import User
from dashboard.models import Account
from datetime import datetime, timezone
import math
from django.conf import settings

def session_to_json(request, session):
    decoded = session.get_decoded()
    user_id = decoded.get('_auth_user_id')
    user = None if user_id is None else User.objects.get(pk=user_id)
    account = None if user is None else Account.objects.filter(user__pk=user.pk).first()
    now = datetime.now(timezone.utc)

    return {
        'session_key': session.session_key,
        'session_data': decoded,
        'active': ((session.expire_date - now).total_seconds() > 0),
        'user': None if user is None else {
            'id': user.id,
            'username': user.username,
            'dashboard_access': dashboard_user_access(user),
            'email': user.email,
            'account': None if account is None else account.id
        },
        'expire_date': session.expire_date ,
        'your_session': request.session.session_key == session.session_key
    }

@dashboard_access
def get_session_info(request, pk):
    session = Session.objects.filter(pk=pk).first()
    return JsonResponse(session_to_json(request, session))

@dashboard_access
def filter_sessions(request):
    length = int(request.GET.get('length') or 50)
    page = int(request.GET.get('page') or 0)
    active = request.GET.get('active') == 'true'

    kwargs = {}

    if active:
        kwargs['expire_date__gt'] = datetime.now(timezone.utc)
    else:
        kwargs['expire_date__lt'] = datetime.now(timezone.utc)

    sessions = Session.objects.filter(**kwargs).order_by('expire_date').reverse()
    pages = math.ceil(len(sessions) / length)
    sessions = sessions[page*length:page*length+length]

    return JsonResponse({
        'sessions': [session_to_json(request, session) for session in sessions],
        'pages': pages,
    })

@dashboard_access
def delete_session(request, pk):
    session = Session.objects.filter(pk=pk).first()
    if session is not None: session.delete()
    return JsonResponse({})

@dashboard_access
def signin_to_session(reqeust, key):
    response = JsonResponse({})
    response.set_cookie(settings.SESSION_COOKIE_NAME, key)
    return response

@dashboard_access
def set_expire_date(reqeust, key):
    session = Session.objects.filter(session_key=key).first()
    value = reqeust.POST.get('value')
    session.expire_date = datetime.strptime(value, '%Y-%m-%dT%H:%M:%S')
    session.save()
    return JsonResponse({})

urlpatterns = [
    path('filter/', filter_sessions),
    path('<pk>/', get_session_info),
    path('delete/<pk>/', delete_session),
    path('signin/<key>/', signin_to_session),
    path('expire/<key>/', set_expire_date),
]