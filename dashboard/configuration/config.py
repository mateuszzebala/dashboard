
import json

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
    



def load_configuration():
    config = open('dashboard/configuration/settings.json', 'r')
    data = json.load(config).get('server')
    SERVER_CONFIG.CONFIGURATION = data.get('config')
    SERVER_CONFIG.ALLOWED_HOSTS = data.get('allowed_hosts')
    SERVER_CONFIG.CORS_ALLOWED_ORIGINS = data.get('cors_allowed_origins')
    SERVER_CONFIG.CSRF_TRUSTED_ORIGINS = data.get('csrf_trusted_origins')
    config.close()


def save_configuration():
    with open('dashboard/configuration/settings.json', 'r', encoding='utf-8') as last_conf:
        conf = json.load(last_conf)
    conf['server'] = {}
    conf['server']['config'] = SERVER_CONFIG.CONFIGURATION
    conf['server']['allowed_hosts'] = SERVER_CONFIG.ALLOWED_HOSTS
    conf['server']['cors_allowed_origins'] = SERVER_CONFIG.CORS_ALLOWED_ORIGINS
    conf['server']['csrf_trusted_origins'] = SERVER_CONFIG.CSRF_TRUSTED_ORIGINS
    with open('dashboard/configuration/settings.json', 'w', encoding='utf-8') as config:
        json.dump(conf, config, indent=4)

load_configuration()
