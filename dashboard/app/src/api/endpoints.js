import { theme } from '../theme/theme'
import { API } from './api'

export const ENDPOINTS = {
    home: {
        configuration: () => API(['home', 'configuration']),
        allowed_hosts: () => API(['home', 'hosts', 'allowed_hosts']),
        cors_allowed_origins: () =>
            API(['home', 'hosts', 'cors_allowed_origins']),
        csrf_trusted_origins: () =>
            API(['home', 'hosts', 'csrf_trusted_origins']),
        logs: () => API(['home', 'logs']),
    },
    database: {
        models: () => API(['database']),
        model: (model) => API(['database', model]),
        items: (model, args = {}) => API(['database', model, 'items'], args),
        item: (model, pk) => API(['database', model, 'items', pk]),
        create: (model) => API(['database', model, 'create']),
        possible_values: (model, field, args = {}) => API(['database', model, field, 'possible'], args),
        relation_value: (model, field, pk) => API(['database', model, field, pk, 'value']),
        edit: (model, pk) => API(['database', model, 'edit', pk]),
        action: (model) => API(['database', model, 'items', 'action']),
    },
    auth: {
        signin: () => API(['auth', 'signin']),
        csrf: () => API(['auth', 'csrf']),
        logout: () => API(['auth', 'logout']),
        me: () => API(['auth', 'me']),
        profile: (username) => API(['auth', 'profile', username]),
        qrcode: (
            fillColor = theme.primary,
            backgroundColor = theme.secondary
        ) =>
            API(['auth', 'qrcode'], {
                datetime: new Date().toISOString(),
                fillColor,
                backgroundColor,
            }),
    },
    terminal: {
        command: () => API(['terminal', 'command']),
        init: () => API(['terminal', 'init']),
        kill: () => API(['terminal', 'kill']),
    },
    files: {
        content: () => API(['files', 'content']),
        init: () => API(['files', 'init']),
        file: (path) => API(['files', 'file'], { path }),

        mkdir: () => API(['files', 'mkdir']),
        remove: () => API(['files', 'remove']),
        touch: () => API(['files', 'touch']),

        upload: (path) => API(['files', 'upload'], { path }),
    },
    editor: {
        json: (path) => API(['editor', 'json'], { path }),
        save: {
            run: (path) => API(['editor', 'save', 'run'], { path }),
            text: (path) => API(['editor', 'save', 'text'], { path }),
            image: (path) => API(['editor', 'save', 'image'], { path }),
        },
    },
    other: {
        get_config: (name) => API(['other', 'config', 'get'], { name }),
        set_config: (name) => API(['other', 'config', 'set'], { name }),
        time: () => API(['other', 'time']),
    },
    statistics: {
        countries: () => API(['statistics', 'countries']),
        country: (country) => API(['statistics', 'country', country]),
    },
    users: {
        get: (userId) => API(['users', userId]),
        edit: (userId) => API(['users', 'edit', userId]),
    },
}
