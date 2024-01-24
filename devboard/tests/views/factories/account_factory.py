import factory
from devboard.models import Account
from .user_factory import UserFactory

class AdminAccountFactory(factory.django.DjangoModelFactory):
    user = factory.LazyFunction(lambda: UserFactory.create(is_superuser=True))
    
    class Meta:
        model = Account
        
