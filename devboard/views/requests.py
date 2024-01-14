from django.urls import path
from django.http import JsonResponse
from devboard.models import RequestLog
from .auth import devboard_access
import datetime


def get_request_info(req):
    return {
        'id': req.id,
        'method': req.method,
        'path': req.path,
        'status_code': req.status_code,
        'datetime': req.datetime.strftime('%Y-%m-%d %H:%M:%S'),
        'ip_v4': req.ip_v4
    }

@devboard_access
def get_requests(request):
    query = request.POST.get('query') or ''
    statuses = request.POST.get('statuses') or 'all'
    methods = request.POST.get('methods') or 'all'
    fromDatetime = datetime.datetime.fromisoformat(request.POST.get('fromDatetime')) if request.POST.get('fromDatetime') else datetime.datetime(year=1, month=1, day=1, hour=1, minute=1, second=1)
    toDatetime = datetime.datetime.fromisoformat(request.POST.get('toDatetime')) if request.POST.get('toDatetime') else datetime.datetime.now()
    userId = request.POST.get('userId') or None
    sessionKey = request.POST.get('sessionKey') or None
    sortBy = request.POST.get('sortBy') or 'datetime'
    asc = request.POST.get('asc') == 'true'
    page = int(request.POST.get('page')) if request.POST.get('page') else 0
    length = int(request.POST.get('length')) if request.POST.get('length') else 30

    logs = RequestLog.objects.all()

    if statuses and statuses != 'all':
        if statuses == 'successes':
            logs = logs.filter(status_code__gte=200, status_code__lt=300)
        elif statuses == 'errors':
            logs = logs.filter(status_code__gte=500)
        elif statuses == 'warnings':
            logs = logs.filter(status_code__gte=300, status_code__lt=500)

    if methods and methods!= 'all':
        if methods.lower() == 'get':
            logs = logs.filter(method='GET')
        elif methods.lower() == 'post':
            logs = logs.filter(method='POST')
        elif methods.lower() == 'put':
            logs = logs.filter(method='PUT')
        elif methods.lower() == 'delete':
            logs = logs.filter(method='DELETE')
        elif methods.lower() == 'patch':
            logs = logs.filter(method='PATCH')
        elif methods.lower() == 'options':
            logs = logs.filter(method='OPTIONS')
        elif methods.lower() == 'head':
            logs = logs.filter(method='HEAD')
        elif methods.lower() == 'trace':
            logs = logs.filter(method='TRACE')
        elif methods.lower() == 'connect':
            logs = logs.filter(method='CONNECT')
    
    if fromDatetime:
        logs = logs.filter(datetime__gte=fromDatetime)
    
    if toDatetime:
        logs = logs.filter(datetime__lte=toDatetime)

    if sortBy:
        logs = logs.order_by(sortBy)
    
    if not asc:
        logs = logs.reverse()


    all_counter = len(logs)
    logs = logs[length*page:length*(page+1)]

    return JsonResponse({
        'logs': [get_request_info(req) for req in logs],
        'counter': all_counter,
    })


@devboard_access
def info_request(request, id):
    request_log = RequestLog.objects.filter(id=id).first()
    return JsonResponse({
        'id': request_log.id,
        'browser_type': request_log.browser_type,
        'datetime': request_log.datetime.strftime('%Y-%m-%d %H:%M:%S'),
        'method': request_log.method,
        'ip_v4': request_log.ip_v4,
        'path': request_log.path,
        'device': request_log.device,
        'device_type': request_log.device_type,
        'user': request_log.user.id if request_log.user is not None else None,
        'session_key': request_log.session.session_key if request_log.session is not None else None,
        'country': request_log.country,
        'status_code': request_log.status_code,
        'args': str(request_log.args),
    })

@devboard_access
def delete_request(request, id):
    request_log = RequestLog.objects.filter(id=id).first()
    request_log.delete()
    return JsonResponse({'done':True})


urlpatterns = [
    path('get/', get_requests),
    path('info/<id>/', info_request),
    path('delete/<id>/', delete_request)
]
