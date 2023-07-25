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
    

class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='Media/dashboard/account/', null=True)
    bio = models.TextField(null=True)
    phone = models.CharField(max_length=15, null=True)
    birth_date = models.DateField(null=True)
    email_confirmed = models.BooleanField(default=False)
    country = models.CharField(max_length=24, null=True)
    address = models.CharField(max_length=32, null=True)
    street = models.CharField(max_length=32, null=True)
    city = models.CharField(max_length=32, null=True)
    state = models.CharField(max_length=32, null=True)
    zip_code = models.CharField(max_length=6, null=True)
    website = models.CharField(max_length=64, null=True)
    pronouns = models.CharField(max_length=16, null=True)

    def __str__(self):
        return f"{self.user.username}"
