import { BiHomeAlt2 } from 'react-icons/bi'
import { AiOutlineBarChart, AiOutlineMessage } from 'react-icons/ai'
import { BsTerminal, BsDatabase, BsFolder, BsKey } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { FaRegEye } from 'react-icons/fa'
import { links } from '../router/links'
import { TbBrandPython } from 'react-icons/tb'
import { FETCH } from '../api/api'
import { ENDPOINTS } from '../api/endpoints'

const SUBLINKS = {}

export const initLinks = async () => {
    const { home, project, root } = (await FETCH(ENDPOINTS.terminal.init()))
        .data
    SUBLINKS.TERMINAL = {
        home: home || '/',
        project: project || '/',
        root: root || '/',
    }
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
                LIKED: '/',
                LAST: '/',
            }
        },
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
    python: {
        name: 'Python',
        icon: TbBrandPython,
        link: links.python.index(),
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
    // notes: {
    //     name: 'Notes',
    //     icon: FaRegStickyNote,
    //     link: links.notes.index(),
    // },
    requests: {
        name: 'Requests',
        icon: FaRegEye,
        link: links.requests.index(),
    },
    // finance: {
    //     name: 'Finance',
    //     icon: BiDollarCircle,
    //     link: links.finance.index(),
    // },
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
    // map: {
    //     name: 'Map',
    //     icon: BsGlobeEuropeAfrica,
    //     link: links.map.index(),
    // },
}
