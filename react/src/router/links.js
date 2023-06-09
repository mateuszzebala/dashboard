export const links = {
    home: () => '/',
    database: {
        index: () => '/database/',
        model: (modelName) => `/database/${modelName}`,
        item: (modelName, pk) => `/database/${modelName}/${pk}`,
        putItem: (modelName) => `/database/${modelName}/create`,
    },
    messages: {
        index: () => '/messages/',
    },
    users: {
        index: () => '/users/',
    },
    files: {
        index: () => '/files/',
    },
    terminal: {
        index: () => '/terminal/',
    },
    python: {
        index: () => '/python/',
    },
    email: {
        index: () => '/email/',
    },
    notes: {
        index: () => '/notes/',
    },
    requests: {
        index: () => '/requests/',
    },
    finance: {
        index: () => '/finance/',
    },
    statistics: {
        index: () => '/statistics/',
    },
    map: {
        index: () => '/map/',
    },
    settings: {
        index: () => '/settings/',
    },
    account: {
        index: () => '/account/',
    },
    sessions: {
        index: () => '/sessions/',
    },
    search: {
        index: (query = '') => `/search/${query}`,
    },
}
