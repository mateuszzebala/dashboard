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
        kill: () => API(['terminal', 'kill']),
    },
    files: {
        content: () => API(['files', 'content']),
        init: () => API(['files', 'init']),
        file: (path) => API(['files', 'file'], { path }),

        mkdir: () => API(['files', 'mkdir']),
        remove: () => API(['files', 'remove']),
        touch: () => API(['files', 'touch']),

        upload: (path) => API(['files', 'file', 'upload'], { path }),
    },
    editor: {
        json: (path) => API(['editor', 'json'], { path }),
        save: {
            run: (path) => API(['editor', 'save', 'run'], { path }),
            text: (path) => API(['editor', 'save', 'text'], { path }),
            image: (path) => API(['editor', 'save', 'image'], { path }),
        },
    },
    other: {},
}
