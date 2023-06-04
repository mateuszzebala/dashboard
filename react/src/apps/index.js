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

export const APPS = [
    {
        name: 'Home',
        icon: BiHomeAlt2,
        link: '/',
    },
    {
        name: 'Database',
        icon: BsDatabase,
        link: '/database/',
    },
    {
        name: 'Messages',
        icon: AiOutlineMessage,
        link: '/messages/',
    },
    {
        name: 'Users',
        icon: FiUsers,
        link: '/users/',
    },
    {
        name: 'Files',
        icon: BsFolder,
        link: '/files/',
    },
    {
        name: 'Terminal',
        icon: BsTerminal,
        link: '/terminal/',
    },
    {
        name: 'Python',
        icon: BsPlay,
        link: '/python/',
    },
    {
        name: 'Calendar',
        icon: BsCalendarWeek,
        link: '/calendar/',
    },
    {
        name: 'Email',
        icon: HiOutlineMail,
        link: '/email/',
    },
    {
        name: 'Notes',
        icon: FaRegStickyNote,
        link: '/notes/',
    },
    {
        name: 'Requests',
        icon: FaRegEye,
        link: '/requests/',
    },
    {
        name: 'Finance',
        icon: BiDollarCircle,
        link: '/finance/',
    },
    {
        name: 'Statistics',
        icon: AiOutlineBarChart,
        link: '/statistics/',
    },
    {
        name: 'Map',
        icon: BsGlobeEuropeAfrica,
        link: '/map/',
    },
]
