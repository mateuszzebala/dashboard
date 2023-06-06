import { BiHomeAlt2, BiDollarCircle } from 'react-icons/bi'
import { AiOutlineBarChart, AiOutlineMessage } from 'react-icons/ai'
import {
    BsTerminal,
    BsDatabase,
    BsFolder,
    BsPlay,
    BsCalendarWeek,
    BsGlobeEuropeAfrica,
} from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { FaRegStickyNote, FaRegEye } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { links } from '../router/links'

export const APPS = [
    {
        name: 'Home',
        icon: BiHomeAlt2,
        link: links.home(),
    },
    {
        name: 'Database',
        icon: BsDatabase,
        link: links.database.index(),
    },
    {
        name: 'Messages',
        icon: AiOutlineMessage,
        link: links.messages.index(),
    },
    {
        name: 'Users',
        icon: FiUsers,
        link: links.users.index(),
    },
    {
        name: 'Files',
        icon: BsFolder,
        link: links.files.index(),
    },
    {
        name: 'Terminal',
        icon: BsTerminal,
        link: links.terminal.index(),
    },
    {
        name: 'Python',
        icon: BsPlay,
        link: links.python.index(),
    },
    {
        name: 'Calendar',
        icon: BsCalendarWeek,
        link: links.calendar.index(),
    },
    {
        name: 'Email',
        icon: HiOutlineMail,
        link: links.email.index(),
    },
    {
        name: 'Notes',
        icon: FaRegStickyNote,
        link: links.notes.index(),
    },
    {
        name: 'Requests',
        icon: FaRegEye,
        link: links.requests.index(),
    },
    {
        name: 'Finance',
        icon: BiDollarCircle,
        link: links.finance.index(),
    },
    {
        name: 'Statistics',
        icon: AiOutlineBarChart,
        link: links.statistics.index(),
    },
    {
        name: 'Map',
        icon: BsGlobeEuropeAfrica,
        link: links.map.index(),
    },
]
