import { API } from './api'

export const ENDPOINTS = {
    home: {
        configuration: () => API(['home', 'configuration']),
        hosts: () => API(['home', 'hosts']),
        logs: () => API(['home', 'logs']),
    },
    database: {
        models: () => API(['database']),
        model: (model) => API(['database', model]),
        items: (model, args = {}) => API(['database', model, 'items'], args),
        item: (model, pk) => API(['database', model, 'items', pk]),
        create: (model) => API(['database', model, 'create']),
        action: (model) => API(['database', model, 'items', 'action']),
    },
    auth: {
        signin: () => API(['auth', 'signin']),
        csrf: () => API(['auth', 'csrf']),
        logout: () => API(['auth', 'logout']),
        me: () => API(['auth', 'me']),
    },
    terminal: {
        command: () => API(['terminal', 'command']),
        init: () => API(['terminal', 'init']),
    },
    other: {},
}
