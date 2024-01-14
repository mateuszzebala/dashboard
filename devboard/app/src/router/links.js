import { MANIFEST } from '../api/api'

export const LINKS = {
    home: () => '/devboard/',
    database: {
        index: () => '/devboard/database/',
        model: (modelName) => `/devboard/database/${modelName}/`,
        item: (modelName, pk) => `/devboard/database/${modelName}/${pk}/`,
        putItem: (modelName) => `/devboard/database/${modelName}/add/`,
        patchItem: (modelName, pk) => `/devboard/database/${modelName}/edit/${pk}/`,
    },
    users: {
        index: () => '/devboard/users/',
        indexAdmins: (admin) => `/devboard/users/?admins=${admin ? 'true' : 'false'}`,
        user: (id) => `/devboard/users/${id}/`,
        new: () => '/devboard/users/new/',
    },
    editor: {
        index: () => '/devboard/editor/',
        edit: (path, type = 'text') => `/devboard/editor/${type}/?path=${path}`,
    },
    files: {
        index: () => '/devboard/files/',
        indexPath: (path) => `/devboard/files/?path=${path}`,

        liked: () => '/devboard/files/liked/',
        last: () => '/devboard/files/last/',
    },
    terminal: {
        index: () => '/devboard/terminal/',
        indexPath: (path) => `/devboard/terminal/?path=${path}`,
    },
    python: {
        index: () => '/devboard/python/',
    },
    email: {
        index: () => '/devboard/email/',
        inbox: (mail) => `/devboard/email/inbox/?mail=${mail}`,
        newsletter: () => '/devboard/email/newsletter/',
        add: () => '/devboard/email/add/',
        compose: (mail) => `/devboard/email/compose/?mail=${mail}`,
        read: (id) => `/devboard/email/read/?id=${id}`,
    },
    requests: {
        index: () => '/devboard/requests/',
        request: (id) => `/devboard/requests/${id}/`,
    },

    statistics: {
        index: () => '/devboard/statistics/',
        map: () => '/devboard/statistics/map/',
        browsers: () => '/devboard/statistics/browsers/',
        systems: () => '/devboard/statistics/systems/',
        efficiency: () => '/devboard/statistics/efficiency/',
        activity: () => '/devboard/statistics/activity/',
        network: () => '/devboard/statistics/network/',
    },
    settings: {
        index: () => '/devboard/settings/',
        byApp: (page) => `/devboard/settings/?page=${page}`,
    },
    sessions: {
        index: () => '/devboard/sessions/',
        session: (key) => `/devboard/sessions/${key}/`,
    },
    search: {
        index: (query = '') => `/devboard/search/${query}/`,
    },
    auth: {
        signin: () => '/devboard/signin/',
        signinNext: (next) => `/devboard/signin/?next=${next}`,
    },
    info: {
        app: (appName) => `/devboard/info/${appName}/`,
        index: () => '/devboard/info/',
    },
    other: {
        admin: () => `${MANIFEST.page_url}/admin/`,
        page: () => MANIFEST.page_url,
        components: () => '/devboard/components/',
    },
}
