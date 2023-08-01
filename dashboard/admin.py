from django.contrib import admin
from .models import Log, Configuration, TestModel, Account, QrCodeAuth
from django.contrib.auth.models import Permission
from django.contrib.sessions.models import Session

@admin.register(Log)
class LogAdmin(admin.ModelAdmin):
    list_display = ['method', 'datetime', 'path']

@admin.register(TestModel)
class TestModelAdmin(admin.ModelAdmin):
    list_display = ['is_some', 'other']

@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'codename']

@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ['session_key', 'expire_date']

@admin.register(Configuration)
class ConfigurationAdmin(admin.ModelAdmin):
    list_display = ['name', 'value']

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['id', 'state', 'country', 'website']

@admin.register(QrCodeAuth)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['url', 'token', 'datetime', 'user']

