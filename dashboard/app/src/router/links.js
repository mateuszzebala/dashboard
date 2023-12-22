import { MANIFEST } from '../api/api'

export const LINKS = {
    home: () => '/dashboard/',
    database: {
        index: () => '/dashboard/database/',
        model: (modelName) => `/dashboard/database/${modelName}/`,
        item: (modelName, pk) => `/dashboard/database/${modelName}/${pk}/`,
        putItem: (modelName) => `/dashboard/database/${modelName}/add/`,
        patchItem: (modelName, pk) =>
            `/dashboard/database/${modelName}/edit/${pk}/`,
    },
    users: {
        index: () => '/dashboard/users/',
        indexAdmins: (admin) => `/dashboard/users/?admins=${admin ? 'true' : 'false'}`,
        user: (id) => `/dashboard/users/${id}/`,
        new: () => '/dashboard/users/new/',
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
        inbox: (mail) => `/dashboard/email/inbox/?mail=${mail}`,
        newsletter: () => '/dashboard/email/newsletter/',
        add: () => '/dashboard/email/add/',
        compose: (mail) => `/dashboard/email/compose/?mail=${mail}`,
        read: (id) => `/dashboard/email/read/?id=${id}`,
    },
    requests: {
        index: () => '/dashboard/requests/',
        request: (id) => `/dashboard/requests/${id}/`,
    },

    statistics: {
        index: () => '/dashboard/statistics/',
        map: () => '/dashboard/statistics/map/',
        browsers: () => '/dashboard/statistics/browsers/',
        systems: () => '/dashboard/statistics/systems/',
        efficiency: () => '/dashboard/statistics/efficiency/',
    },
    settings: {
        index: () => '/dashboard/settings/',
        byApp: (page) => `/dashboard/settings/?page=${page}`,
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
        shoper: () => '/shoper/',
        bloger: () => '/bloger/',
        components: () => '/dashboard/components/',
    },
}
