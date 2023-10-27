from django.contrib import admin
from .models import Log, Configuration, TestModel, Account, QrCodeAuth, Message
from django.contrib.auth.models import Permission
from django.contrib.sessions.models import Session

@admin.register(Log)
class LogAdmin(admin.ModelAdmin):
    list_display = ['method', 'datetime', 'path', 'country']

@admin.register(TestModel)
class TestModelAdmin(admin.ModelAdmin):
    list_display = ['pk', 'someBool', 'fileField', 'timeField']

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
    list_display = ['token', 'datetime', 'user']

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['email', 'user', 'datetime', 'text', 'read']
