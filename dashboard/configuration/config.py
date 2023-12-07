from django.conf import settings
import json

settings_json_file_path = 'dashboard/configuration/settings.json'



class SERVER_CONFIG:
    CONFIGURATION = {}
    ALLOWED_HOSTS = []
    CORS_ALLOWED_ORIGINS = []
    CSRF_TRUSTED_ORIGINS = []
    def ENABLE_SERVER():
        return SERVER_CONFIG.CONFIGURATION['enable_server']

    def DEBUG():
        return SERVER_CONFIG.CONFIGURATION['debug']
    
    def NEW_USERS():
        return SERVER_CONFIG.CONFIGURATION['new_users']
    
    def DDOS_BLOCK():
        return SERVER_CONFIG.CONFIGURATION['ddos_block']
    
    def SAVE_REQUESTS():
        return SERVER_CONFIG.CONFIGURATION['save_requests']
    
    def CREDENTIALS():
        return SERVER_CONFIG.CONFIGURATION['credientals']

    def GET_ALLOWED_HOSTS():
        return SERVER_CONFIG.ALLOWED_HOSTS

    def GET_CORS_ALLOWED_ORIGINS():
        return SERVER_CONFIG.CORS_ALLOWED_ORIGINS

    def GET_CSRF_TRUSTED_ORIGINS():
        return SERVER_CONFIG.CSRF_TRUSTED_ORIGINS
    


def set_settings_prop(prop, value):
    with open(settings_json_file_path, 'r') as config_file:
        data = json.load(config_file)

    key_splited = prop.split('.')
    root = data
    for key in key_splited[:-1]:
        if root.get(key) is None:
            root[key] = {}
        root = root[key]
    root[key_splited[-1]] = value

    with open(settings_json_file_path, 'w') as config_file:
        data = json.dump(data, config_file, indent=4)

def get_settings(*args):
    with open(settings_json_file_path, 'r') as config:
        return json.load(config)

def load_configuration():
    data = get_settings().get('server')
    SERVER_CONFIG.CONFIGURATION = data.get('config')
    SERVER_CONFIG.ALLOWED_HOSTS = data.get('allowed_hosts')
    SERVER_CONFIG.CORS_ALLOWED_ORIGINS = data.get('cors_allowed_origins')
    SERVER_CONFIG.CSRF_TRUSTED_ORIGINS = data.get('csrf_trusted_origins')
    
    settings.DEBUG = SERVER_CONFIG.DEBUG()
    settings.ALLOWED_HOSTS = SERVER_CONFIG.GET_ALLOWED_HOSTS()
    settings.CORS_ALLOWED_ORIGINS = SERVER_CONFIG.GET_CORS_ALLOWED_ORIGINS()
    settings.CSRF_TRUSTED_ORIGINS = SERVER_CONFIG.GET_CSRF_TRUSTED_ORIGINS()
    settings.CORS_ALLOW_CREDENTIALS = SERVER_CONFIG.CREDENTIALS()

def init():
    load_configuration()
    