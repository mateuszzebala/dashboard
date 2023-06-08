import { BiHomeAlt2, BiDollarCircle } from 'react-icons/bi'
import { AiOutlineBarChart, AiOutlineMessage } from 'react-icons/ai'
import {
    BsTerminal,
    BsDatabase,
    BsFolder,
    BsGlobeEuropeAfrica,
    BsKey,
} from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { FaRegStickyNote, FaRegEye } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { links } from '../router/links'
import { TbBrandPython } from 'react-icons/tb'

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
    messages: {
        name: 'Messages',
        icon: AiOutlineMessage,
        link: links.messages.index(),
    },
    users: {
        name: 'Users',
        icon: FiUsers,
        link: links.users.index(),
    },
    files: {
        name: 'Files',
        icon: BsFolder,
        link: links.files.index(),
    },
    terminal: {
        name: 'Terminal',
        icon: BsTerminal,
        link: links.terminal.index(),
    },
    python: {
        name: 'Python',
        icon: TbBrandPython,
        link: links.python.index(),
    },
    email: {
        name: 'Email',
        icon: HiOutlineMail,
        link: links.email.index(),
    },
    notes: {
        name: 'Notes',
        icon: FaRegStickyNote,
        link: links.notes.index(),
    },
    requests: {
        name: 'Requests',
        icon: FaRegEye,
        link: links.requests.index(),
    },
    finance: {
        name: 'Finance',
        icon: BiDollarCircle,
        link: links.finance.index(),
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
    },
    map: {
        name: 'Map',
        icon: BsGlobeEuropeAfrica,
        link: links.map.index(),
    },
}
