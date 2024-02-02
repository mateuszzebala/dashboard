from django.contrib import admin
from django.contrib.sessions.models import Session
from .models import Account, Email, RequestLog

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'first_name', 'email']

    def username(self, obj):
        return obj.user.username
    
    def first_name(self, obj):
        return obj.user.first_name
    
    def email(self, obj):
        return obj.user.email


#admin.site.register(Email)
admin.site.register(RequestLog)
#admin.site.register(Session)