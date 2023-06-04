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
import { LINKS } from '../router/links'

export const APPS = [
    {
        name: 'Home',
        icon: BiHomeAlt2,
        link: LINKS.HOME,
    },
    {
        name: 'Database',
        icon: BsDatabase,
        link: LINKS.DATABASE,
    },
    {
        name: 'Messages',
        icon: AiOutlineMessage,
        link: LINKS.MESSAGES,
    },
    {
        name: 'Users',
        icon: FiUsers,
        link: LINKS.USERS,
    },
    {
        name: 'Files',
        icon: BsFolder,
        link: LINKS.FILES,
    },
    {
        name: 'Terminal',
        icon: BsTerminal,
        link: LINKS.TERMINAL,
    },
    {
        name: 'Python',
        icon: BsPlay,
        link: LINKS.PYTHON,
    },
    {
        name: 'Calendar',
        icon: BsCalendarWeek,
        link: LINKS.CALENDAR,
    },
    {
        name: 'Email',
        icon: HiOutlineMail,
        link: LINKS.EMAIL,
    },
    {
        name: 'Notes',
        icon: FaRegStickyNote,
        link: LINKS.NOTES,
    },
    {
        name: 'Requests',
        icon: FaRegEye,
        link: LINKS.REQUESTS,
    },
    {
        name: 'Finance',
        icon: BiDollarCircle,
        link: LINKS.FINANCE,
    },
    {
        name: 'Statistics',
        icon: AiOutlineBarChart,
        link: LINKS.STATISTICS,
    },
    {
        name: 'Map',
        icon: BsGlobeEuropeAfrica,
        link: LINKS.MAP,
    },
]
