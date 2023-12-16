import { theme } from '../theme/theme'
import { API } from './api'

export const ENDPOINTS = {
    home: {
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
        zip: () => API(['files', 'zip']),
        move: () => API(['files', 'move']),
    },
    email: {
        send: () => API(['email', 'send']),
        all: () => API(['email', 'all']),
        info: (email) => API(['email', 'info', email]),
        inbox: (email, args={}) => API(['email', 'inbox', email], args),
    },
    editor: {
        json: (path) => API(['editor', 'json'], { path }),
        liked_and_last: () => API(['editor', 'liked&last']),
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
        logout: () => API(['users', 'logout']),
        get: (userId) => API(['users', userId]),
        edit: (userId) => API(['users', 'edit', userId]),
        active: () => API(['users', 'active']),
    },
    settings: {
        set: () => API(['settings', 'set']),
        get: () => API(['settings', 'get']),
    },
}
