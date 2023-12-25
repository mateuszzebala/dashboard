from django.contrib import admin
from django.contrib.sessions.models import Session
from .models import Account, Email, RequestLog

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['id', 'state', 'country', 'website']

# admin.site.register(Email)
admin.site.register(Session)