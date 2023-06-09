
import json

class CONFIG:
    CONFIGURATION = {}
    def ENABLE_SERVER():
        return CONFIG.CONFIGURATION['enable_server']

    def DEBUG():
        return CONFIG.CONFIGURATION['debug']
    
    def NEW_USERS():
        return CONFIG.CONFIGURATION['new_users']
    
    def DDOS_BLOCK():
        return CONFIG.CONFIGURATION['ddos_block']
    
    def SAVE_REQUESTS():
        return CONFIG.CONFIGURATION['save_requests']


def load_configuration():
    config = open('dashboard/configuration/configuration.json', 'r')
    CONFIG.CONFIGURATION = json.load(config).get('config')
    config.close()

  

def set_configuration(name, value):
    CONFIG.CONFIGURATION[name] = value
    with open('dashboard/configuration/configuration.json', 'w', encoding='utf-8') as config:
        json.dump({'config':CONFIG.CONFIGURATION}, config, indent=3)

    
load_configuration()
