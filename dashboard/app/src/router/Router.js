import { Routes, Route } from 'react-router-dom'
import React from 'react'
import { HomePage } from '../pages/other/HomePage'
import { Page404 } from '../pages/other/Page404'
import { DatabasePage } from '../pages/database/DatabasePage'
import { DatabaseModelPage } from '../pages/database/DatabaseModelPage'
import { DatabaseItemPage } from '../pages/database/DatabaseItemPage'
import { FilesPage } from '../pages/files/FilesPage'
import { MessagesPage } from '../pages/messages/MessagesPage'
import { UsersPage } from '../pages/users/UsersPage'
import { SignInPage } from '../pages/other/SignInPage'
import { FinancePage } from '../pages/finance/FinancePage'
import { TerminalPage } from '../pages/terminal/TerminalPage'
import { NotesPage } from '../pages/notes/NotesPage'
import { EmailPage } from '../pages/email/EmailPage'
import { StatisticsPage } from '../pages/statistics/StatisticsPage'
import { MapPage } from '../pages/map/MapPage'
import { RequestsPage } from '../pages/requests/RequestsPage'
import { SettingsPage } from '../pages/settings/SettingsPage'
import { SearchPage } from '../pages/search/SearchPage'
import { InfoPage } from '../pages/info/InfoPage'
import { SessionsPage } from '../pages/sessions/SessionsPage'
import { DatabasePutItemPage } from '../pages/database/DatabasePutItemPage'
import { FileEditorPage } from '../pages/editor/FileEditorPage'
import { EditorPage } from '../pages/editor/EditorPage'
import { DatabasePatchItemPage } from '../pages/database/DatabasePatchItemPage'
import { StatisticsWorldMapPage } from '../pages/statistics/subpages/StatisticsWorldMapPage'
import { UserPage } from '../pages/users/UserPage'
import { MessagePage } from '../pages/messages/MessagePage'
import { StatisticsBrowsersPage } from '../pages/statistics/subpages/StatisticsBrowsersPage'

const pages = {
    '/dashboard/': HomePage,

    '/dashboard/signin/': SignInPage,

    '/dashboard/database/': DatabasePage,
    '/dashboard/database/:modelName/': DatabaseModelPage,
    '/dashboard/database/:modelName/:pk/': DatabaseItemPage,
    '/dashboard/database/:modelName/add/': DatabasePutItemPage,
    '/dashboard/database/:modelName/edit/:pk': DatabasePatchItemPage,

    '/dashboard/files/': FilesPage,

    '/dashboard/editor/': EditorPage,
    '/dashboard/editor/:type/': FileEditorPage,

    '/dashboard/messages/': MessagesPage,
    '/dashboard/messages/:messageId/': MessagePage,

    '/dashboard/users/': UsersPage,
    '/dashboard/users/:id/': UserPage,

    '/dashboard/finance/': FinancePage,

    '/dashboard/terminal/': TerminalPage,

    '/dashboard/email/': EmailPage,

    '/dashboard/notes/': NotesPage,

    '/dashboard/statistics/': StatisticsPage,
    '/dashboard/statistics/map/': StatisticsWorldMapPage,
    '/dashboard/statistics/browsers/': StatisticsBrowsersPage,

    '/dashboard/map/': MapPage,

    '/dashboard/requests/': RequestsPage,

    '/dashboard/settings/': SettingsPage,

    '/dashboard/sessions/': SessionsPage,

    '/dashboard/search/': SearchPage,

    '/dashboard/info/:appName/': InfoPage,
    '/dashboard/info/': InfoPage,

    '*': Page404,
}

export const Router = () => {
    return (
        <Routes>
            {Object.keys(pages).map((path) => {
                const Elem = pages[path]
                return <Route key={path} path={path} element={<Elem />} />
            })}
        </Routes>
    )
}
