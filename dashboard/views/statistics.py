from django.http import JsonResponse
from .auth import is_superuser
from django.urls import path
import datetime
from dashboard.models import Log
from dashboard.serializers import get_field_serializer
from django.db.models import Count

@is_superuser
def get_countries_statistics(request):
    logs = Log.objects.filter(country__isnull=False).values('country').annotate(total=Count('country'))
    countries = dict((log['country'], log['total']) for log in logs)
    max_value = max(countries.values())
    for country, value in countries.items():
        countries[country] = 100/max_value*value
    return JsonResponse({
        'countries': countries
    })

@is_superuser
def get_country_info(request, country):
    today = datetime.datetime.now()
    month_logs = Log.objects.filter(country=country, datetime__year=today.year, datetime__month=today.month)
    today_logs = Log.objects.filter(country=country, datetime__date=datetime.date.today())
    year_logs = Log.objects.filter(country=country, datetime__year=today.year)
    all_logs = Log.objects.filter(country=country)

    return JsonResponse({
        'today': len(today_logs),
        'month': len(month_logs),
        'year': len(year_logs),
        'all': len(all_logs)
    })


urlpatterns = [
    path('countries/', get_countries_statistics), # GET COUNTRIES STATISTICS
    path('country/<country>/', get_country_info), # GET COUNTRY INFO
]