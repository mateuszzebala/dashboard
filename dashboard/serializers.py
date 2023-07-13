import datetime
import json
from django.core.files import File
from django.core.files.images import ImageFile

def get_field_serializer(value, field_type):
    if field_type == 'DateTimeField':
        return value and {
            'year': value.year, 'month': value.month, 'day': value.day, 'hour': value.hour, 'minute': value.minute, 'second': value.second
        }
    if field_type == 'DateField': return value and {
            'year': value.year, 'month': value.month, 'day': value.day,
        }
    if field_type == 'TimeField': return value and {
            'hour': value.hour, 'minute': value.minute, 'second': value.second
        }
    if field_type == 'DurationField': return value and {
            'days': value.days, 'seconds': value.seconds
        }
    if field_type == 'FileField': return value and value.path
    if field_type ==  'ImageField': return value and value.path
    return value

def set_field_serializer(value, field_type):
    if field_type == 'DateTimeField': 
            value = json.loads(value)
            return value and datetime.datetime(value['year'], value['month'], value['day'], value['hour'], value['minute'], value['second'])
    if field_type == 'DateField': 
            value = json.loads(value)
            return value and datetime.date(value['year'], value['month'], value['day'])
    if field_type == 'TimeField': 
            value = json.loads(value)
            return value and datetime.time(value['hour'], value['minute'], value['second'])
    if field_type == 'DurationField': 
            value = json.loads(value)
            return value and datetime.timedelta(value['days'], value['seconds'])
    if field_type == 'FileField': return value
    if field_type == 'ImageField': return value
    if field_type == 'BooleanField': return False if not value else True
    return value

def set_relation_serialize(value, relation, field):
    match(relation):
        case 'one_to_one':
            item = field.related_model.objects.filter(pk=value).first()
            return item
    return None
    ## TODO
    