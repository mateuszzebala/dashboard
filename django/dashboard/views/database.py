from django.views import View
from django.http import JsonResponse
from dashboard.utils import error_message, get_all_models, get_model, get_type_of_field, get_relation_type_of_field, get_field_options, get_relation_items, relation_can_be_set, get_field
from django.urls import path
from dashboard.serializers import get_field_serializer, set_field_serializer, set_relation_serialize
from html import unescape
from django.contrib import admin
from math import ceil
from .auth import is_superuser

@is_superuser
def get_models_view(reqeust):
    return JsonResponse({
        'models': dict((model.__name__, model._meta.app_label) for model in get_all_models())
    })

@is_superuser
def get_model_info_view(reqeust, model_name):
    model = get_model(model_name)
    if model is None: return error_message('Model does not exists', 400)

    return JsonResponse({
        'model': model.__name__,
        'app': model._meta.app_label,
        'actions': [*[action.short_description for action in admin.site._registry.get(model).actions], 'delete'],
        'fields': dict((str(field.name), {
            'type': field.get_internal_type(),
            'relation': {
                'model': field.related_model.__name__ if field.related_model else None,
                'type': get_relation_type_of_field(field),
                'is': field.is_relation,
            },
            'params': {
                'null': field.null,
                'max_length': None if field.get_internal_type() != 'CharField' else field.max_length,
                'editable': field.editable,
                'auto_created': field.auto_created,
                'choices': get_field_options(field),
            },
            'registered': field.name in admin.site._registry.get(model).list_display
        }) for field in model._meta.get_fields()),

})

@is_superuser
def select_items_view(request, model_name):
    model = get_model(model_name)
    if model is None: return error_message('Model does not exists', 400)

    length = int(request.GET.get('length')) or -1
    page = int((request.GET.get('page') or 0))
    order_by = request.GET.get('order_by') or 'pk'
    asc = request.GET.get('asc') == 'true'
    query = request.GET.get('query') or ''
    pages = 0
    try:
        items = []
        query = dict(equation.strip().split('=') for equation in query.split(','))
        items = model.objects.filter(**query)
    except:
        items = model.objects.all()

    items = list(items.order_by(order_by))
    pages = ceil(len(items) / length) if length != -1 else 1
    if length != -1: items = items[page*length:page*length+length]
    if not asc: items.reverse()


    return JsonResponse({
        'model': model.__name__,
        'pages': pages,
        'items': [item_to_json(item) for item in items]
    })

@is_superuser
def manage_item_view(request, model_name, pk):
    model = get_model(model_name)
    if model is None: return error_message('Model does not exists', 400)
    item = model.objects.filter(pk=pk).first()
    if item is None: return error_message('Item does not exists', 400)

    match (request.POST.get('method')):
        case 'DELETE': return delete_item_view(request, item)
        case 'PATCH': return patch_item_view(request, item)

    return get_item_view(request, item)

def get_item_view(request, item):
    return JsonResponse(item_to_json(item))

def delete_item_view(request, item):
    item.delete()
    return JsonResponse({'done': True})

def patch_item_view(request, item):
    field = request.POST.get('field')
    value_post = unescape(request.POST.get('value') or '')
    value_files = request.FILES.get('value')
    if value_files is not None: value = value_files
    else: value = value_post
    fields = list(filter(lambda f: f.name == field, item.__class__._meta.get_fields()))
    field = fields[0] if len(fields) > 0 else None
    setattr(item, field.name, set_field_serializer(value, field.get_internal_type()))
    item.save()
    return JsonResponse({'done': True})

@is_superuser
def put_item_view(request, model_name):
    model = get_model(model_name)
    if model is None: return error_message('Model does not exists', 400)
    names_of_fields = list(map(lambda field: field.name, list(filter(lambda field: not field.is_relation, model._meta.get_fields()))))
    names_of_relations = list(map(lambda field: field.name, list(filter(lambda field: field.is_relation, model._meta.get_fields()))))
    data_fields = dict(
        (
            field_name,
            set_field_serializer(
                request.POST.get(f'field_{field_name}') or request.FILES.get(f'field_{field_name}'), 
                get_type_of_field(model, field_name)
            )
        ) for field_name in names_of_fields)
    
    for relation in names_of_relations:
        if relation_can_be_set(get_field(model, relation)):
            data_fields.update({relation: set_relation_serialize(request.POST.get(f'relation_{relation}'), get_relation_type_of_field(get_field(model, relation)), get_field(model, relation))})

    item = model(**data_fields)
    item.save()
    return JsonResponse({'pk':item.pk})

def item_to_json(item):
    return {
        'pk': item.pk,
        'str': str(item),
        'fields': dict((field.name, get_field_serializer(getattr(item, field.name), field.get_internal_type())) for field in filter(lambda field: not field.is_relation, item.__class__._meta.get_fields())),
        'relations': dict((field.name, get_relation_items(item, field.name)) for field in filter(lambda field: field.is_relation, item.__class__._meta.get_fields()) )
    }

@is_superuser
def make_action_view(request, model_name):
    model = get_model(model_name)
    if model is None: return error_message('Model does not exists', 400)
    action = request.POST.get('action')
    primary_keys = list(map(lambda key: key, request.POST.get('primary_keys').split(',')))

    if action == 'delete':
        for pk in primary_keys:
            item = model.objects.filter(pk=pk).first()
            if item is not None:
                item.delete()
    else:
        actions = admin.site._registry.get(model).actions
        actions = list(filter(lambda fnc: fnc.short_description == action, actions))
        if len(actions) > 0:
            action = actions[0]
            print(action)
        for pk in primary_keys:
            action(admin.site._registry.get(model), request, model.objects.filter(pk=pk))

    return JsonResponse({})

urlpatterns = [
    path('', get_models_view), # GET MODELS
    path('<model_name>/', get_model_info_view), # GET MODEL INFO
    path('<model_name>/create/', put_item_view), # GET MODEL INFO
    path('<model_name>/items/', select_items_view), # GET ITEMS VIEW
    path('<model_name>/items/action/', make_action_view), # MAKE ACTION VIEW
    path('<model_name>/items/<pk>/', manage_item_view), # MANAGE ITEM  # POST: {'method':string}
]