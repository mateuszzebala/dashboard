from django.contrib import admin
from .models import TestModel

@admin.action(description="Make price = 0")
def make_no_price(modeladmin, request, queryset):
    queryset(price=0)

@admin.register(TestModel)
class TestModelAdmin(admin.ModelAdmin):
    list_display = ['types', 'price', 'duration']
    actions = [make_no_price]