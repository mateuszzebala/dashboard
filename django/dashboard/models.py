from django.db import models
from django.contrib.auth.models import User

TYPES = (
    ('type1', 'TYPE 1'),
    ('type2', 'TYPE 2'),
    ('type3', 'TYPE 3'),
    ('type4', 'TYPE 4'),
    ('type5', 'TYPE 5'),
)

class TestModel(models.Model):
    types = models.CharField(max_length=10, choices=TYPES)
    price = models.FloatField()
    duration = models.DurationField()
    brother = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    profile_picture = models.ImageField(upload_to='media/prfilePictures/')