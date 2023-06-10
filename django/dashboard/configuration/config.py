
import json

class SERVER_CONFIG:
    CONFIGURATION = {}
    ALLOWED_HOSTS = []
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

    def GET_ALLOWED_HOSTS():
        return SERVER_CONFIG.ALLOWED_HOSTS


def load_configuration():
    config = open('dashboard/configuration/server_config.json', 'r')
    data = json.load(config)
    SERVER_CONFIG.CONFIGURATION = data.get('config')
    SERVER_CONFIG.ALLOWED_HOSTS = data.get('allowed_hosts')
    config.close()


def save_configuration():
    with open('dashboard/configuration/server_config.json', 'w', encoding='utf-8') as config:
        json.dump({'config':SERVER_CONFIG.CONFIGURATION, 'allowed_hosts': SERVER_CONFIG.ALLOWED_HOSTS}, config, indent=3)

    
load_configuration()
