import factory
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class UserFactory(factory.django.DjangoModelFactory):
    username = factory.sequence(lambda x: f"username_{x}")
    password = factory.LazyFunction(lambda: make_password('admin'))
    first_name = factory.sequence(lambda x: f"firstname_{x}")

    class Meta:
        model = User
        
