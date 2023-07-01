from django.contrib import admin
from .models import Log
from django.contrib.auth.models import Permission
from django.contrib.sessions.models import Session

@admin.register(Log)
class LogAdmin(admin.ModelAdmin):
    list_display = ['method', 'datetime', 'path']

@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'codename']

@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ['session_key', 'expire_date']