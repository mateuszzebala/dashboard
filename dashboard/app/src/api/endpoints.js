import { theme } from '../theme/theme'
import { API } from './api'

export const ENDPOINTS = {
    home: {
        logs: () => API(['home', 'logs']),
        informations: () => API(['home', 'informations']),
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
        file: (path) => API(['files', 'file'], { path, datetime: new Date().toISOString(), }),
        mkdir: () => API(['files', 'mkdir']),
        remove: () => API(['files', 'remove']),
        touch: () => API(['files', 'touch']),
        upload: (path) => API(['files', 'upload'], { path }),
        zip: () => API(['files', 'zip']),
        move: () => API(['files', 'move']),
    },
    email: {
        all: () => API(['email', 'all']),
        send: () => API(['email', 'send']),
        star: () => API(['email', 'star']),
        connect: () => API(['email', 'connect']),
        info: (email) => API(['email', 'info', email]),
        inbox: (email, args={}) => API(['email', 'inbox', email], args),
    },
    editor: {
        json: (path) => API(['editor', 'json'], { path }),
        liked_and_last: () => API(['editor', 'liked&last']),
        replace: (path) => API(['editor', 'replace'], { path }),
        save: {
            run: (path) => API(['editor', 'save', 'run'], { path }),
            text: (path) => API(['editor', 'save', 'text'], { path }),
            image: (path) => API(['editor', 'save', 'image'], { path }),
        },
    },
    other: {
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
    requests: {
        get: () => API(['requests', 'get']),
        info: (id) => API(['requests', 'info', id]),
        delete: (id) => API(['requests', 'delete', id]),
    },
}
