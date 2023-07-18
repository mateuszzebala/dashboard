import { BiEditAlt, BiHomeAlt2 } from 'react-icons/bi'
import { AiOutlineBarChart, AiOutlineMessage } from 'react-icons/ai'
import { BsTerminal, BsDatabase, BsFolder, BsKey } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { FaRegEye } from 'react-icons/fa'
import { links } from '../router/links'
import { FETCH } from '../api/api'
import { ENDPOINTS } from '../api/endpoints'

const SUBLINKS = {}

export const initLinks = async () => {
    SUBLINKS.TERMINAL = (await FETCH(ENDPOINTS.terminal.init())).data
    SUBLINKS.FILES = (await FETCH(ENDPOINTS.files.init())).data
}
await initLinks()
export const APPS = {
    home: {
        name: 'Home',
        icon: BiHomeAlt2,
        link: links.home(),
    },
    database: {
        name: 'Database',
        icon: BsDatabase,
        link: links.database.index(),
    },
    users: {
        name: 'Users',
        icon: FiUsers,
        link: links.users.index(),
        sublinks: () => {
            return {
                ADMINS: '/',
                CREATE: '/',
            }
        },
    },
    files: {
        name: 'Files',
        icon: BsFolder,
        link: links.files.index(),
        sublinks: () => {
            return {
                ROOT: links.files.indexPath(SUBLINKS.FILES.root),
                HOME: links.files.indexPath(SUBLINKS.FILES.home),
                PROJECT: links.files.indexPath(SUBLINKS.FILES.project),
            }
        },
    },
    editor: {
        name: 'Editor',
        icon: BiEditAlt,
        link: links.editor.index(),
    },
    terminal: {
        name: 'Terminal',
        icon: BsTerminal,
        link: links.terminal.index(),
        sublinks: () => {
            return {
                ROOT: links.terminal.indexPath(SUBLINKS.TERMINAL.root),
                HOME: links.terminal.indexPath(SUBLINKS.TERMINAL.home),
                PROJECT: links.terminal.indexPath(SUBLINKS.TERMINAL.project),
            }
        },
    },

    messages: {
        name: 'Messages',
        icon: AiOutlineMessage,
        link: links.messages.index(),
        sublinks: () => {
            return {
                ALL: '/',
                READ: '/',
                UNREAD: '/',
            }
        },
    },
    // email: {
    //     name: 'Email',
    //     icon: HiOutlineMail,
    //     link: links.email.index(),
    // },

    requests: {
        name: 'Requests',
        icon: FaRegEye,
        link: links.requests.index(),
    },
    sessions: {
        name: 'Sessions',
        icon: BsKey,
        link: links.sessions.index(),
    },
    statistics: {
        name: 'Statistics',
        icon: AiOutlineBarChart,
        link: links.statistics.index(),
        sublinks: () => {
            return {
                'PAGE ACTIVITY': '/',
                'WORLD MAP': '/',
                'SERVER EFFICIENCY ': '/',
            }
        },
    },
}
