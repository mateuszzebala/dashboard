from django.contrib import admin
from .models import Account, Email, RequestLog

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['id', 'state', 'country', 'website']

# admin.site.register(Email)
admin.site.register(RequestLog)