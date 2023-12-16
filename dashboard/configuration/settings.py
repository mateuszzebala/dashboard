from django.conf import settings
import json
import threading
import time

def flatten_dict(d, parent_key='', sep='.'):
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_dict(v, new_key, sep=sep).items())
        else:
            items.append((new_key, v))
    return dict(items)

class SETTINGS:
    data = dict()
    settings_file_path = 'dashboard/configuration/settings.json'
    lock = threading.Lock()

    @staticmethod
    def init():
        settings.DEBUG = SETTINGS.get('server.config.debug')
        settings.ALLOWED_HOSTS = SETTINGS.get('server.allowed_hosts')
        settings.CORS_ALLOWED_ORIGINS = SETTINGS.get('server.cors_allowed_origins')
        settings.CSRF_TRUSTED_ORIGINS = SETTINGS.get('server.csrf_trusted_origins')
        settings.CORS_ALLOW_CREDENTIALS = SETTINGS.get('server.config.credientals')

    @staticmethod
    def get(prop):
        with SETTINGS.lock:
            with open(SETTINGS.settings_file_path, 'r') as config:
                return flatten_dict(json.load(config)).get(prop)

    @staticmethod
    def get_all_props():
        with SETTINGS.lock:
            with open(SETTINGS.settings_file_path, 'r') as config:
                return flatten_dict(json.load(config))

    @staticmethod
    def get_all(prop):
        with SETTINGS.lock:
            with open(SETTINGS.settings_file_path, 'r') as config:
                return json.load(config)

    @staticmethod
    def set(prop, value):
        with SETTINGS.lock:
            with open(SETTINGS.settings_file_path, 'r') as config_file:
                data = json.load(config_file)

            key_splited = prop.split('.')
            root = data
            for key in key_splited[:-1]:
                if root.get(key) is None:
                    root[key] = {}
                root = root[key]
            root[key_splited[-1]] = value

            with open(SETTINGS.settings_file_path, 'w') as config_file:
                json.dump(data, config_file, indent=4)

    @staticmethod
    def __gettiem__(prop):
        return SETTINGS.get(prop)
