import { API } from './api'

export const endpoints = {
    home: {
        configuration: () => API(['home', 'configuration']),
        hosts: () => API(['home', 'hosts']),
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
        signin: () => API(['signin']),
    },
    other: {},
}
