import { BiEditAlt, BiHomeAlt2 } from 'react-icons/bi'
import { AiOutlineBarChart, AiOutlineMessage } from 'react-icons/ai'
import {BsFolder, BsKey } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { FaRegEye, FaRegMoneyBillAlt, FaTerminal } from 'react-icons/fa'
import { LINKS } from '../router/links'
import { FETCH } from '../api/api'
import { ENDPOINTS } from '../api/endpoints'
import { PiDatabaseBold } from 'react-icons/pi'
import { HiOutlineMail, HiOutlineShoppingBag, HiOutlineTerminal } from 'react-icons/hi'
import { MdCalendarMonth } from 'react-icons/md'

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
        icon: BiHomeAlt2,
        link: LINKS.home(),
    },
    database: {
        name: 'Database',
        icon: PiDatabaseBold,
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
                ADMINS: '/',
                CREATE: '/',
            }
        },
    },
    files: {
        name: 'Files',
        icon: BsFolder,
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
        icon: BiEditAlt,
        link: LINKS.editor.index(),
    },
    terminal: {
        name: 'Terminal',
        icon: HiOutlineTerminal,
        link: LINKS.terminal.index(),
        sublinks: () => {
            return {
                ROOT: LINKS.terminal.indexPath(SUBLINKS.TERMINAL.root),
                HOME: LINKS.terminal.indexPath(SUBLINKS.TERMINAL.home),
                PROJECT: LINKS.terminal.indexPath(SUBLINKS.TERMINAL.project),
            }
        },
    },

    messages: {
        name: 'Messages',
        icon: AiOutlineMessage,
        link: LINKS.messages.index(),
        sublinks: () => {
            return {
                ALL: '/',
                READ: '/',
                UNREAD: '/',
            }
        },
    },
    email: {
        name: 'Email',
        icon: HiOutlineMail,
        link: LINKS.email.index(),
    },
    finance: {
        name: 'Finance',
        icon: FaRegMoneyBillAlt,
        link: LINKS.finance.index(),
    },
    shop: {
        name: 'Shop',
        icon: HiOutlineShoppingBag,
        link: LINKS.shop.index(),
        sublinks: () => {
            return {
                PRODUCTS: LINKS.shop.products(),
                ORDERS: LINKS.shop.orders(),
                CARTS: LINKS.shop.carts(),
            }
        },
    },
    calendar: {
        name: 'Calendar',
        icon: MdCalendarMonth,
        link: LINKS.calendar.index(),
    },
    requests: {
        name: 'Requests',
        icon: FaRegEye,
        link: LINKS.requests.index(),
    },
    sessions: {
        name: 'Sessions',
        icon: BsKey,
        link: LINKS.sessions.index(),
    },
    statistics: {
        name: 'Statistics',
        icon: AiOutlineBarChart,
        link: LINKS.statistics.index(),
        sublinks: () => {
            return {
                'PAGE ACTIVITY': '/',
                'WORLD MAP': LINKS.statistics.map(),
                'SERVER EFFICIENCY ': '/',
            }
        },
    },
}
