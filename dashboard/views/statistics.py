from django.http import JsonResponse
from .auth import dashboard_access
from django.urls import path
import datetime
from dashboard.models import RequestLog
from dashboard.serializers import get_field_serializer
from django.db.models import Count
import datetime
import math
import pytz
import psutil
import requests
import time

@dashboard_access
def get_countries_statistics(request):
    logs = RequestLog.objects.filter(country__isnull=False).values('country').annotate(total=Count('country'))
    countries = dict((log.get('country'), log.get('total')) for log in logs)
    totals = list(countries.values())
    if len(totals) >= 2:
        max_value = max(*totals)
    else:
        max_value = totals[0]
    for country, value in countries.items():
        countries[country] = 100/max_value*value
    print(countries)
    return JsonResponse({
        'countries': countries
    })

@dashboard_access
def get_country_info(request, country):
    today = datetime.datetime.now()
    month_logs = RequestLog.objects.filter(country=country, datetime__year=today.year, datetime__month=today.month)
    today_logs = RequestLog.objects.filter(country=country, datetime__date=datetime.date.today())
    year_logs = RequestLog.objects.filter(country=country, datetime__year=today.year)
    all_logs = RequestLog.objects.filter(country=country)

    return JsonResponse({
        'today': len(today_logs),
        'month': len(month_logs),
        'year': len(year_logs),
        'all': len(all_logs)
    })

    
@dashboard_access
def get_activity(request):
    period = request.GET.get('period')

    stats = {}
    now = datetime.datetime.now(tz=pytz.UTC)


    time_units = {'minute': 1, 'hour': 60, 'day': 60 * 24, 'week': 60 * 24 * 7, 'month': 60 * 24 * 30, 'year': 60 * 24 * 365}

    factor = time_units[period]

    for value in range(-10, 1):
        from_datetime = now + datetime.timedelta(minutes=value * factor - factor)
        to_datetime = now + datetime.timedelta(minutes=value * factor)
        print(from_datetime, to_datetime)
        stats[value] = len(RequestLog.objects.filter(datetime__gte=from_datetime, datetime__lte=to_datetime))

    maximum = int(math.ceil(max(stats.values()) / 100.0)) * 100

    return JsonResponse({
        'stats': stats,
        'max': maximum if maximum > 0 else 1
    })

server_stats = {
    'cpu': [0 for _ in range(20)],
    'memory': [0 for _ in range(20)],
}

@dashboard_access
def server_efficiency(request):
    server_stats['cpu'].append(psutil.cpu_percent())
    server_stats['cpu'].pop(0)
    server_stats['memory'].append(psutil.virtual_memory().percent)
    server_stats['memory'].pop(0)
    return JsonResponse(server_stats)

network_stats = {
    'download': [0 for _ in range(20)],
    'upload': [0 for _ in range(20)],
}

@dashboard_access
def network_statistics(request):
    start_time = time.time()
    file = requests.get("http://ipv4.download.thinkbroadband.com/5MB.zip", stream=True)
    total_length = file.headers.get('content-length')
    download_speed = int(total_length) / (time.time() - start_time)
    network_stats['download'].append(download_speed / (1024 * 1024))
    network_stats['download'].pop(0)
    return JsonResponse({
        'stats': network_stats,
        'max': max(*network_stats['download'], *network_stats['upload'])
    })

urlpatterns = [
    path('countries/', get_countries_statistics), # GET COUNTRIES STATISTICS
    path('country/<country>/', get_country_info), # GET COUNTRY INFO
    path('activity/', get_activity), # ACTIVITY STATS
    path('efficiency/', server_efficiency), # EFFICIENCY STATS
    path('network/', network_statistics), # NETWORK STATS
]
