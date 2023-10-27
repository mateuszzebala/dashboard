import datetime
import json
import os
from django.core.files import File
from django.core.files.images import ImageFile
import shutil
from django.conf import settings
from pathlib import Path

def get_field_serializer(value, field_type):
    if field_type == 'DateTimeField':
        return value and {
            'year': value.year, 'month': value.month, 'day': value.day, 'hours': value.hour, 'minutes': value.minute, 'seconds': value.second
        }
    if field_type == 'DateField': return value and {
            'year': value.year, 'month': value.month, 'day': value.day,
        }
    if field_type == 'TimeField': return value and {
            'hours': value.hour, 'minutes': value.minute, 'seconds': value.second
        }
    if field_type == 'DurationField': return value and {
            'days': value.days, 'seconds': value.seconds
        }
    if field_type == 'FileField': return None if not value else value.path
    return value

def set_field_serializer(value, field_type, field, item):
   
    if field_type == 'AutoField': 
        return
    if field_type == 'DateTimeField': 
        value = json.loads(value)
        value = value and datetime.datetime(value['year'], value['month'], value['day'], value['hours'], value['minutes'], value['seconds'])
        setattr(item, field.name, value)
        return
    if field_type == 'DateField': 
        value = json.loads(value)
        value = value and datetime.date(value['year'], value['month'], value['day'])
        setattr(item, field.name, value)
        return
    if field_type == 'TimeField':
        value = json.loads(value)
        value = value and datetime.time(value['hours'], value['minutes'], value['seconds'])
        setattr(item, field.name, value)
        return
    if field_type == 'DurationField': 
        value = json.loads(value)
        value = value and datetime.timedelta(value['days'], value['seconds'])
        setattr(item, field.name, value)
        return
    if field_type == 'JSONField':
        setattr(item, field.name, json.loads(value))
        return
    if field_type == 'FileField' or field_type == 'ImageField':
        if os.path.exists(str(value)):
            upload_to = getattr(item.__class__, field.name).field.upload_to
            if callable(upload_to):
                path = upload_to(item, os.path.basename(value))
            else:
                path = os.path.join(settings.BASE_DIR, upload_to, os.path.basename(value))
            parent_path = Path(os.path.dirname(path))
            parent_path.mkdir(parents=True, exist_ok=True)
            try:
                shutil.copy(value, path)
            except shutil.SameFileError:
                return
            getattr(item, field.name).name = path
            return
        setattr(item, field.name, value)
        return
    if field_type == 'BooleanField':
        setattr(item, field.name, False if not value == 'true' else True)
        return
    setattr(item, field.name, value)

def set_relation_serialize(value, relation, field, item):
    if value == 'null': value = None
    if relation == 'one_to_one':
        rel_item = field.related_model.objects.filter(pk=value).first()
        setattr(item, field.name, rel_item)
        return
    if relation == 'many_to_one':
        rel_item = field.related_model.objects.filter(pk=value).first()
        setattr(item, field.name, rel_item)
        return
    if relation == 'many_to_many':
        item.save()
        try:
            if value is None:
                getattr(item, field.name).clear()
                return
        except AttributeError:
            return
        for pk in value.split(','):
            if pk != 'null':
                getattr(item, field.name).add(pk)
        return
    setattr(item, field.name, value)
    