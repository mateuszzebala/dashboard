import { MANIFEST } from '../api/api'

export const LINKS = {
    home: () => '/dashboard/',
    database: {
        index: () => '/dashboard/database/',
        model: (modelName) => `/dashboard/database/${modelName}/`,
        item: (modelName, pk) => `/dashboard/database/${modelName}/${pk}/`,
        putItem: (modelName) => `/dashboard/database/${modelName}/create/`,
        patchItem: (modelName, pk) =>
            `/dashboard/database/${modelName}/edit/${pk}/`,
    },
    messages: {
        index: () => '/dashboard/messages/',
        message: (messageId) => `/dashboard/messages/${messageId}/`,
    },
    users: {
        index: () => '/dashboard/users/',
        user: (id) => `/dashboard/users/${id}/`,
    },
    editor: {
        index: () => '/dashboard/editor/',
        edit: (path, type = 'text') =>
            `/dashboard/editor/${type}/?path=${path}`,
    },
    files: {
        index: () => '/dashboard/files/',
        indexPath: (path) => `/dashboard/files/?path=${path}`,

        liked: () => '/dashboard/files/liked/',
        last: () => '/dashboard/files/last/',
    },
    terminal: {
        index: () => '/dashboard/terminal/',
        indexPath: (path) => `/dashboard/terminal/?path=${path}`,
    },
    python: {
        index: () => '/dashboard/python/',
    },
    email: {
        index: () => '/dashboard/email/',
    },
    notes: {
        index: () => '/dashboard/notes/',
    },
    requests: {
        index: () => '/dashboard/requests/',
    },
    finance: {
        index: () => '/dashboard/finance/',
    },
    statistics: {
        index: () => '/dashboard/statistics/',
        map: () => '/dashboard/statistics/map/',
    },
    map: {
        index: () => '/dashboard/map/',
    },
    settings: {
        index: () => '/dashboard/settings/',
    },
    sessions: {
        index: () => '/dashboard/sessions/',
    },
    search: {
        index: (query = '') => `/dashboard/search/${query}/`,
    },
    auth: {
        signin: () => '/dashboard/signin/',
        signinNext: (next) => `/dashboard/signin/?next=${next}`,
    },
    info: {
        app: (appName) => `/dashboard/info/${appName}/`,
        index: () => '/dashboard/info/',
    },

    other: {
        admin: () => `${MANIFEST.page_url}/admin/`,
        page: () => MANIFEST.page_url,
        shoper: () => `${MANIFEST.page_url}/shoper/`,
        bloger: () => `${MANIFEST.page_url}/bloger/`,
    },
}
