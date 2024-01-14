from django.views import View
from django.http import JsonResponse
from devboard.utils import error_message, get_all_models, get_model, get_type_of_field, get_relation_type_of_field, get_field_options, get_relation_items, relation_can_be_set, get_field
from django.urls import path
from devboard.serializers import get_field_serializer, set_field_serializer, set_relation_serialize
from html import unescape
from django.contrib import admin
from math import ceil
from .auth import devboard_access

@devboard_access
def get_models_view(reqeust):
    return JsonResponse({
        'models': dict((model.__name__, model._meta.app_label) for model in get_all_models())
    })

@devboard_access
def get_model_info_view(reqeust, model_name):
    model = get_model(model_name)
    if model is None: return error_message(f'Model "{model_name}" does not exists or is not registered!', 400)

    return JsonResponse({
        'model': model.__name__,
        'app': model._meta.app_label,
        'actions': [action.short_description for action in admin.site._registry.get(model).actions],
        'registered_fields': admin.site._registry.get(model).list_display,
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
        }) for field in filter(lambda field: field.editable, model._meta.get_fields())),

})

@devboard_access
def select_items_view(request, model_name):
    model = get_model(model_name)
    if model is None: return error_message(f'Model "{model_name}" does not exists or is not registered!', 400)

    length = int(request.GET.get('length')) or -1
    page = int((request.GET.get('page') or 0))
    order_by = request.GET.get('order_by') or 'pk'
    asc = request.GET.get('asc') == 'true'
    query = request.GET.get('query') or ''
    pages = 0
    queryError = False
    
    items = []

    items = model.objects.all()
    for equation in query.split(','):
        if not '=' in equation: continue
        split = equation.strip().split('=')
        key, value = split
        query = {}
        try:
            if len(split) < 2 or not key or not value:
                continue
            if value.lower() == 'true': 
                value = True
            elif value.lower() == 'false': 
                value = False
            query[key] = value
            items = items.filter(**query)
        except:
            queryError = True

    items = list(items.order_by(order_by))
    pages = ceil(len(items) / length) if length != -1 else 1
    if length != -1: items = items[page*length:page*length+length]
    if not asc: items.reverse()

    return JsonResponse({
        'model': model.__name__,
        'pages': pages,
        'items': [item_to_json(item) for item in items],
        'queryError': queryError
    })

@devboard_access
def manage_item_view(request, model_name, pk):
    model = get_model(model_name)
    if model is None: return error_message('Model does not exists', 400)
    item = model.objects.filter(pk=pk).first()
    if item is None: return error_message('Item does not exists', 400)

    if request.POST.get('method') == 'DELETE': 
        return delete_item_view(request, item)
    if request.POST.get('method') == 'PATCH': return patch_item_view(request, item)

    return get_item_view(request, item)

@devboard_access
def get_item_view(request, item):
    return JsonResponse(item_to_json(item))

@devboard_access
def delete_item_view(request, item):
    item.delete()
    return JsonResponse({'done': True})

@devboard_access
def patch_item_view(request, item):
    field = request.POST.get('field')
    print(request.POST.get('value'))
    value_post = unescape(request.POST.get('value') or '')
    value_files = request.FILES.get('value')
    if value_files is not None: value = value_files
    else: value = value_post
    fields = list(filter(lambda f: f.name == field, item.__class__._meta.get_fields()))
    field = fields[0] if len(fields) > 0 else None
    setattr(item, field.name, set_field_serializer(value, field.get_internal_type()))
    item.save()
    return JsonResponse({'done': True})


@devboard_access
def put_item_view(request, model_name):
    model = get_model(model_name)
    if model is None: return error_message('Model does not exists', 400)
    names_of_fields = list(map(lambda field: field.name, list(filter(lambda field: not field.is_relation and not field.auto_created, model._meta.get_fields()))))
    names_of_relations = list(map(lambda field: field.name, list(filter(lambda field: field.is_relation and field.editable, model._meta.get_fields()))))
    item = model()
 
    for field in names_of_fields:
        set_field_serializer(
            request.FILES.get(field) or request.POST.get(field), 
            get_type_of_field(model, field),
            get_field(model, field),
            item
        )
   
    for relation in names_of_relations:
        set_relation_serialize(
            request.POST.get(relation),
            get_relation_type_of_field(get_field(model, relation)),
            get_field(model, relation),
            item
        )

    item.save()
    return JsonResponse({'pk':item.pk})


@devboard_access
def patch_item_view(request, model_name, pk):
    model = get_model(model_name)
    if model is None: return error_message('Model does not exists', 400)
    names_of_fields = list(map(lambda field: field.name, list(filter(lambda field: not field.is_relation and not field.auto_created, model._meta.get_fields()))))
    names_of_relations = list(map(lambda field: field.name, list(filter(lambda field: field.is_relation and not field.one_to_many, model._meta.get_fields()))))
    item = model.objects.filter(pk=pk).first()
    for field in names_of_fields:
        print(field, request.POST.get(field))
        set_field_serializer(
            request.FILES.get(field) or request.POST.get(field), 
            get_type_of_field(model, field),
            get_field(model, field),
            item
        )
    for relation in names_of_relations:
        set_relation_serialize(
            request.POST.get(relation),
            get_relation_type_of_field(get_field(model, relation)),
            get_field(model, relation),
            item
        )

    item.save()
    return JsonResponse({'pk':item.pk})

def get_value_or_admin_value(adminModel, field, item):
    value = ''
    try:
        value = getattr(item, field)
    except AttributeError:
        fnc = getattr(adminModel, field)
        value = fnc(item)
    if callable(value): 
        value = value()
    return value


def item_to_json(item):
    model = item.__class__
    adminModel = admin.site._registry.get(model)
    
    return {
        'pk': item.pk,
        'str': str(item),
        'fields': dict((field.name, get_field_serializer(getattr(item, field.name), field.get_internal_type())) for field in filter(lambda field: not field.is_relation, item.__class__._meta.get_fields())),
        'relations': dict((field.name, get_relation_items(item, field)) for field in filter(lambda field: field.is_relation and not field.one_to_many and field.editable, item.__class__._meta.get_fields())),
        'registered_fields': dict((field, get_value_or_admin_value(adminModel, field, item)) for field in adminModel.list_display)
    }

@devboard_access
def make_action_view(request, model_name):
    model = get_model(model_name)
    if model is None: return error_message('Model does not exists', 400)
    action = request.POST.get('action')
    primary_keys = list(map(lambda key: key, request.POST.get('primary_keys').split(',')))
    try:
        actions = admin.site._registry.get(model).actions
        actions = list(filter(lambda fnc: fnc.short_description == action, actions))
        if len(actions) > 0:
            action = actions[0]
        for pk in primary_keys:
            action(admin.site._registry.get(model), request, model.objects.filter(pk=pk))
    except:
        ...
    return JsonResponse({})


@devboard_access
def get_possible_items(request, model_name, field_name):
    model = get_model(model_name)
    if model is None: return error_message(f'Model "{model_name}" does not exists or is not registered!', 400)
    field = get_field(model, field_name)
    related_model = field.related_model

    length = int(request.GET.get('length')) or -1
    page = int((request.GET.get('page') or 0))
    order_by = request.GET.get('order_by') or 'pk'
    asc = request.GET.get('asc') == 'true'
    query = request.GET.get('query') or ''
    pages = 0
    queryError = False

    items = []

    items = related_model.objects.all()
    for equation in query.split(','):
        if not '=' in equation: continue
        split = equation.strip().split('=')
        key, value = split
        query = {}
        try:
            if len(split) < 2 or not key or not value:
                continue
            if value.lower() == 'true': 
                value = True
            elif value.lower() == 'false': 
                value = False
            query[key] = value
            items = items.filter(**query)
        except:
            queryError = True

    if field.one_to_one:
        items = items.filter(**{f'{model_name.lower()}__isnull':True})

    items = list(items.order_by(order_by))
    pages = ceil(len(items) / length) if length != -1 else 1
    if length != -1: items = items[page*length:page*length+length]
    if not asc: items.reverse()

    return JsonResponse({
        'model': related_model.__name__,
        'pages': pages,
        'items': [item_to_json(item) for item in items],
        'queryError': queryError
    })

@devboard_access
def get_relation_value(reuqest, model_name, field_name, pk):

    model = get_model(model_name)
    if model is None: return error_message('Model does not exists', 400)
    item = model.objects.filter(pk=pk).first()
    if item is None: 
        return JsonResponse({
            'value': None
        })

    value = getattr(item, field_name)
    field = get_field(model, field_name)

    if field.many_to_many:
        return JsonResponse({
            'value': [item_to_json(item) for item in value.all()] if value.exists() else []
        })
    
    return JsonResponse({
        'value': item_to_json(value)
    })


urlpatterns = [
    path('', get_models_view), # GET MODELS
    path('<model_name>/', get_model_info_view), # GET MODEL INFO
    path('<model_name>/create/', put_item_view), # CREATE MODEL VIEW
    path('<model_name>/edit/<pk>/', patch_item_view), # EDIT MODEL VIEW
    path('<model_name>/items/', select_items_view), # GET ITEMS VIEW
    path('<model_name>/<field_name>/possible/', get_possible_items), # GET POSSIBLE ITEMS VIEW
    path('<model_name>/<field_name>/<pk>/value/', get_relation_value), # GET RELATION VALUE
    path('<model_name>/items/action/', make_action_view), # MAKE ACTION VIEW
    path('<model_name>/items/<pk>/', manage_item_view), # MANAGE ITEM  # POST: {'method':string}
]
