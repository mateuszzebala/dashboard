import { FiBarChart, FiDatabase, FiEdit2, FiEye, FiFolder, FiHome, FiKey, FiMail, FiTerminal, FiUsers } from 'react-icons/fi'
import { LINKS } from '../router/links'
import { FETCH } from '../api/api'
import { ENDPOINTS } from '../api/endpoints'

export const SUBLINKS = {}

export const initSubLinks = async () => {
    SUBLINKS.TERMINAL = (await FETCH(ENDPOINTS.terminal.init())).data
    SUBLINKS.FILES = (await FETCH(ENDPOINTS.files.init())).data
    SUBLINKS.DATABASE = Object.keys(
        (await FETCH(ENDPOINTS.database.models())).data.models
    )
    return SUBLINKS
}

export const APPS = {
    home: {
        name: 'Home',
        icon: FiHome,
        link: LINKS.home(),
    },
    database: {
        name: 'Database',
        icon: FiDatabase,
        link: LINKS.database.index(),
        sublinks: () =>
            SUBLINKS.DATABASE.sort().reduce((obj, item) => {
                obj[item] = LINKS.database.model(item)
                return obj
            }, {}),
    },
    users: {
        name: 'Users',
        icon: FiUsers,
        link: LINKS.users.index(),
        sublinks: () => {
            return {
                ADMINS: LINKS.users.indexAdmins(true),
                CREATE: LINKS.users.new(),
            }
        },
    },
    files: {
        name: 'Files',
        icon: FiFolder,
        link: LINKS.files.index(),
        sublinks: () => {
            return {
                ROOT: LINKS.files.indexPath(SUBLINKS.FILES.root),
                HOME: LINKS.files.indexPath(SUBLINKS.FILES.home),
                PROJECT: LINKS.files.indexPath(SUBLINKS.FILES.project),
            }
        },
    },
    editor: {
        name: 'Editor',
        icon: FiEdit2,
        link: LINKS.editor.index(),
    },
    terminal: {
        name: 'Terminal',
        icon: FiTerminal,
        link: LINKS.terminal.index(),
        sublinks: () => {
            return {
                ROOT: LINKS.terminal.indexPath(SUBLINKS.TERMINAL.root),
                HOME: LINKS.terminal.indexPath(SUBLINKS.TERMINAL.home),
                PROJECT: LINKS.terminal.indexPath(SUBLINKS.TERMINAL.project),
            }
        },
    },
    email: {
        name: 'Email',
        icon: FiMail,
        link: LINKS.email.index(),
        sublinks: () => {
            return {
                'EMAILS': LINKS.email.index(),
                'NEWSLETTER': LINKS.email.newsletter(),
            }
        },
    },
    requests: {
        name: 'Requests',
        icon: FiEye,
        link: LINKS.requests.index(),
    },
    sessions: {
        name: 'Sessions',
        icon: FiKey,
        link: LINKS.sessions.index(),
    },
    statistics: {
        name: 'Statistics',
        icon: FiBarChart,
        link: LINKS.statistics.index(),
        sublinks: () => {
            return {
                'PAGE ACTIVITY': LINKS.statistics.activity(),
                'WORLD MAP': LINKS.statistics.map(),
                'SERVER EFFICIENCY ': LINKS.statistics.efficiency(),
                'BROWSERS ': LINKS.statistics.browsers(),
                'SYSTEMS ': LINKS.statistics.systems(),
            }
        },
    },
}
