export const links = {
    home: () => '/dashboard/',
    database: {
        index: () => '/dashboard/database/',
        model: (modelName) => `/dashboard/database/${modelName}`,
        item: (modelName, pk) => `/dashboard/database/${modelName}/${pk}/`,
        putItem: (modelName) => `/dashboard/database/${modelName}/create`,
    },
    messages: {
        index: () => '/dashboard/messages/',
    },
    users: {
        index: () => '/dashboard/users/',
    },
    files: {
        index: () => '/dashboard/files/',
        indexPath: (path) => `/dashboard/files/?path=${path}`,
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
    },
    map: {
        index: () => '/dashboard/map/',
    },
    settings: {
        index: () => '/dashboard/settings/',
    },
    account: {
        index: () => '/dashboard/account/',
    },
    sessions: {
        index: () => '/dashboard/sessions/',
    },
    search: {
        index: (query = '') => `/dashboard/search/${query}/`,
    },
    auth: {
        signin: () => '/dashboard/signin/',
    },
    info: {
        app: (appName) => `/dashboard/info/${appName}/`,
        index: () => '/dashboard/info/',
    },
}
