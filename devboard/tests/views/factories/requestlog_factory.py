import factory
from devboard.models import RequestLog

class RequestLogFactory(factory.django.DjangoModelFactory):
    ip_v4 = factory.LazyFunction(lambda: '127.0.0.1')
    path = factory.LazyFunction(lambda: '/devboard/api/')
    
    class Meta:
        model = RequestLog
    

