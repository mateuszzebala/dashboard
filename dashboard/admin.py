from django.contrib import admin
from .models import Log, Configuration, TestModel
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
class DashboardConfigurationAdmin(admin.ModelAdmin):
    list_display = ['name', 'value']
