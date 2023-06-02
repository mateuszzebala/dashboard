import datetime
import json
from django.core.files import File
from django.core.files.images import ImageFile

def get_field_serializer(value, field_type):
    match (field_type):
        case 'DateTimeField': return value and {
            'year': value.year, 'month': value.month, 'day': value.day, 'hour': value.hour, 'minute': value.minute, 'second': value.second
        }
        case 'DateField': return value and {
            'year': value.year, 'month': value.month, 'day': value.day,
        }
        case 'TimeField': return value and {
            'hour': value.hour, 'minute': value.minute, 'second': value.second
        }
        case 'DurationField': return value and {
            'days': value.days, 'seconds': value.seconds
        }
        case 'FileField': return value and value.path
        case 'ImageField': return value and value.path
    return value

def set_field_serializer(value, field_type):
    match (field_type):
        case 'DateTimeField': 
            value = json.loads(value)
            return value and datetime.datetime(value['year'], value['month'], value['day'], value['hour'], value['minute'], value['second'])
        case 'DateField': 
            value = json.loads(value)
            return value and datetime.date(value['year'], value['month'], value['day'])
        case 'TimeField': 
            value = json.loads(value)
            return value and datetime.time(value['hour'], value['minute'], value['second'])
        case 'DurationField': 
            value = json.loads(value)
            return value and datetime.timedelta(value['days'], value['seconds'])
        case 'FileField': return value
        case 'ImageField': return value
        case 'BooleanField': return False if not value else True
    return value

def set_relation_serialize(value, relation):
    ...
    