from django.db import models
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session

METHODS = (
    ('GET', 'GET'),
    ('POST', 'POST'),
    ('PUT', 'PUT'),
    ('PATCH', 'PATCH'),
    ('OPTIONS', 'OPTIONS'),
    ('HEAD', 'HEAD'),
    ('DELETE', 'DELETE'),
    ('CONNECT', 'CONNECT'),
    ('TRACE', 'TRACE'),
)

class Log(models.Model):
    ip_v4 = models.CharField(max_length=20)
    datetime = models.DateTimeField(auto_now_add=True)
    method = models.CharField(choices=METHODS, max_length=10)
    path = models.CharField(max_length=512)
    args = models.JSONField()
    status_code = models.IntegerField()
    device = models.CharField(max_length=20, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    session = models.ForeignKey(Session, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.method} - {self.path}"

class Configuration(models.Model):
    name = models.CharField(max_length=32)
    value = models.JSONField()

    def __str__(self):
        return self.name


class TestModel(models.Model):
    is_some = models.BooleanField(null=True)
    other = models.FileField(upload_to='To_REMOVE_Media/images')
    