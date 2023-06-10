import { Routes, Route, useNavigate } from 'react-router-dom'
import React from 'react'
import { HomePage } from '../pages/HomePage'
import { Page404 } from '../pages/Page404'
import { DatabasePage } from '../pages/database/DatabasePage'
import { DatabaseModelPage } from '../pages/database/DatabaseModelPage'
import { DatabaseItemPage } from '../pages/database/DatabaseItemPage'
import { FilesPage } from '../pages/files/FilesPage'
import { MessagesPage } from '../pages/messages/MessagesPage'
import { UsersPage } from '../pages/users/UsersPage'
import { SignInPage } from '../pages/SignInPage'
import { FinancePage } from '../pages/finance/FinancePage'
import { TerminalPage } from '../pages/terminal/TerminalPage'
import { PythonPage } from '../pages/python/PythonPage'
import { NotesPage } from '../pages/notes/NotesPage'
import { EmailPage } from '../pages/email/EmailPage'
import { StatisticsPage } from '../pages/statistics/StatisticsPage'
import { MapPage } from '../pages/map/MapPage'
import { RequestsPage } from '../pages/requests/RequestsPage'
import { AccountPage } from '../pages/account/AccountPage'
import { SettingsPage } from '../pages/settings/SettingsPage'
import { SearchPage } from '../pages/search/SearchPage'
import { SessionsPage } from '../pages/sessions/SessionsPage'
import { DatabasePutItem } from '../pages/database/DatabasePutItem'
import { FETCH } from '../api/api'
import { endpoints } from '../api/endpoints'
import { links } from './links'

const pages = {
    '/': HomePage,

    '/signin/': SignInPage,

    '/database/': DatabasePage,
    '/database/:modelName': DatabaseModelPage,
    '/database/:modelName/:pk': DatabaseItemPage,
    '/database/:modelName/create': DatabasePutItem,

    '/files/': FilesPage,

    '/messages/': MessagesPage,

    '/users/': UsersPage,

    '/finance/': FinancePage,

    '/terminal/': TerminalPage,

    '/python/': PythonPage,

    '/email/': EmailPage,

    '/notes/': NotesPage,

    '/statistics/': StatisticsPage,

    '/map/': MapPage,

    '/requests/': RequestsPage,

    '/account/': AccountPage,

    '/settings/': SettingsPage,

    '/sessions/': SessionsPage,

    '/search/': SearchPage,

    '*': Page404,
}

export const Router = () => {
    const navigate = useNavigate()
    React.useEffect(() => {
        FETCH(endpoints.auth.me()).then((data) => {
            if (!data.data.signin) {
                navigate(links.auth.signin())
            }
        })
    }, [])

    return (
        <Routes>
            {Object.keys(pages).map((path) => {
                const Elem = pages[path]
                return <Route key={path} path={path} element={<Elem />} />
            })}
        </Routes>
    )
}
