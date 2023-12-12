import { Routes, Route } from 'react-router-dom'
import React from 'react'
import { HomePage } from '../pages/other/HomePage'
import { Page404 } from '../pages/other/Page404'
import { DatabasePage } from '../pages/database/DatabasePage'
import { DatabaseModelPage } from '../pages/database/DatabaseModelPage'
import { DatabaseItemPage } from '../pages/database/DatabaseItemPage'
import { FilesPage } from '../pages/files/FilesPage'
import { UsersPage } from '../pages/users/UsersPage'
import { SignInPage } from '../pages/other/SignInPage'
import { TerminalPage } from '../pages/terminal/TerminalPage'
import { EmailPage } from '../pages/email/EmailPage'
import { StatisticsPage } from '../pages/statistics/StatisticsPage'
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
import { StatisticsBrowsersPage } from '../pages/statistics/subpages/StatisticsBrowsersPage'
import { EmailInboxPage } from '../pages/email/EmailInboxPage'
import { APPS } from '../apps/apps'
import { useSettings } from '../utils/hooks'
import { EmailNewsletterPage } from '../pages/email/EmailNewsletterPage'
import { ComponentsPage } from '../pages/other/ComponentsPage'
import { NewUserPage } from '../pages/users/NewUserPage'
import { AddEmailPage } from '../pages/email/AddEmailPage'
import { ShowEmailPage } from '../pages/email/inboxPages/ShowEmailPage'

const pages = {
    '/dashboard/': {page: HomePage, app: APPS.home},

    '/dashboard/signin/': {page: SignInPage, app: null},

    '/dashboard/database/': {page: DatabasePage, app: APPS.database},
    '/dashboard/database/:modelName/': {page: DatabaseModelPage, app: APPS.database},
    '/dashboard/database/:modelName/:pk/': {page: DatabaseItemPage, app: APPS.database},
    '/dashboard/database/:modelName/add/': {page: DatabasePutItemPage, app: APPS.database},
    '/dashboard/database/:modelName/edit/:pk': {page: DatabasePatchItemPage, app: APPS.database},

    '/dashboard/files/': {page: FilesPage, app: APPS.files},

    '/dashboard/editor/': {page: EditorPage, app: APPS.editor},
    '/dashboard/editor/:type/': {page: FileEditorPage, app: APPS.editor},

    '/dashboard/users/': {page: UsersPage, app: APPS.users},
    '/dashboard/users/new/': {page: NewUserPage, app: APPS.users},
    '/dashboard/users/:id/': {page: UserPage, app: APPS.users},

    '/dashboard/terminal/': {page: TerminalPage, app: APPS.terminal},

    '/dashboard/email/': {page: EmailPage, app: APPS.email},
    '/dashboard/email/inbox/': {page: EmailInboxPage, app: APPS.email},
    '/dashboard/email/newsletter/': {page: EmailNewsletterPage, app: APPS.email},
    '/dashboard/email/add/': {page: AddEmailPage, app: APPS.email},
    '/dashboard/email/read/': {page: ShowEmailPage, app: APPS.email},

    '/dashboard/statistics/': {page: StatisticsPage, app: APPS.statistics},
    '/dashboard/statistics/map/': {page: StatisticsWorldMapPage, app: APPS.statistics},
    '/dashboard/statistics/browsers/': {page: StatisticsBrowsersPage, app: APPS.statistics},

    '/dashboard/requests/': {page: RequestsPage, app: APPS.requests},

    '/dashboard/settings/': {page: SettingsPage, app: null},

    '/dashboard/sessions/': {page: SessionsPage, app: APPS.sessions},

    '/dashboard/search/': {page: SearchPage, app: null},

    '/dashboard/info/:appName/': {page: InfoPage, app: null},
    '/dashboard/info/': {page: InfoPage, app: null},

    '/dashboard/components/': {page: ComponentsPage, app: null},
    
    '*': {page: Page404, app: null},
}

export const Router = () => {
    const [settings] = useSettings()
    return (
        <Routes>
            {Object.keys(pages).map((path) => {
                if (pages[path].app && !settings[`dashboard.app.${pages[path].app.name.toLowerCase()}`]) return ''
                const Elem = pages[path].page
                return <Route key={path} path={path} element={<Elem />} />
            })}
        </Routes>
    )
}
