import { Route, Routes } from 'react-router-dom'
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
import { ComposeEmailPage } from '../pages/email/ComposeEmailPage'
import { RequestPage } from '../pages/requests/RequestPage'
import { StatisticsSystemPage } from '../pages/statistics/subpages/StatisticsSystemsPage'
import { StatisticsEfficiencyPage } from '../pages/statistics/subpages/StatisticsEfficiencyPage'
import { StatisticsActivityPage } from '../pages/statistics/subpages/StatisticsActivityPage'
import { StatisticsNetworkPage } from '../pages/statistics/subpages/StatisticsNetworkPage'
import { SessionPage } from '../pages/sessions/SessionPage'

const pages = {
    '/devboard/': {page: HomePage, app: APPS.home},

    '/devboard/signin/': {page: SignInPage, app: null},

    '/devboard/database/': {page: DatabasePage, app: APPS.database},
    '/devboard/database/:modelName/': {page: DatabaseModelPage, app: APPS.database},
    '/devboard/database/:modelName/:pk/': {page: DatabaseItemPage, app: APPS.database},
    '/devboard/database/:modelName/add/': {page: DatabasePutItemPage, app: APPS.database},
    '/devboard/database/:modelName/edit/:pk': {page: DatabasePatchItemPage, app: APPS.database},

    '/devboard/files/': {page: FilesPage, app: APPS.files},

    '/devboard/editor/': {page: EditorPage, app: APPS.editor},
    '/devboard/editor/:type/': {page: FileEditorPage, app: APPS.editor},

    '/devboard/users/': {page: UsersPage, app: APPS.users},
    '/devboard/users/new/': {page: NewUserPage, app: APPS.users},
    '/devboard/users/:id/': {page: UserPage, app: APPS.users},

    '/devboard/terminal/': {page: TerminalPage, app: APPS.terminal},

    '/devboard/email/': {page: EmailPage, app: APPS.email},
    '/devboard/email/inbox/': {page: EmailInboxPage, app: APPS.email},
    '/devboard/email/newsletter/': {page: EmailNewsletterPage, app: APPS.email},
    '/devboard/email/add/': {page: AddEmailPage, app: APPS.email},
    '/devboard/email/read/': {page: ShowEmailPage, app: APPS.email},
    '/devboard/email/compose/': {page: ComposeEmailPage, app: APPS.email},

    '/devboard/statistics/': {page: StatisticsPage, app: APPS.statistics},
    '/devboard/statistics/map/': {page: StatisticsWorldMapPage, app: APPS.statistics},
    '/devboard/statistics/browsers/': {page: StatisticsBrowsersPage, app: APPS.statistics},
    '/devboard/statistics/systems/': {page: StatisticsSystemPage, app: APPS.statistics},
    '/devboard/statistics/efficiency/': {page: StatisticsEfficiencyPage, app: APPS.statistics},
    '/devboard/statistics/activity/': {page: StatisticsActivityPage, app: APPS.statistics},
    '/devboard/statistics/network/': {page: StatisticsNetworkPage, app: APPS.statistics},

    '/devboard/requests/': {page: RequestsPage, app: APPS.requests},
    '/devboard/requests/:id/': {page: RequestPage, app: APPS.requests},

    '/devboard/settings/': {page: SettingsPage, app: null},

    '/devboard/sessions/': {page: SessionsPage, app: APPS.sessions},
    '/devboard/sessions/:key/': {page: SessionPage, app: APPS.sessions},

    '/devboard/search/': {page: SearchPage, app: null},

    '/devboard/info/:appName/': {page: InfoPage, app: null},
    '/devboard/info/': {page: InfoPage, app: null},

    '/devboard/components/': {page: ComponentsPage, app: null},
    
    '*': {page: Page404, app: null},
}

export const Router = () => {
    const [settings] = useSettings()
    return (
        <Routes>
            {Object.keys(pages).map((path) => {
                if (pages[path].app && !settings[`devboard.app.${pages[path].app.name.toLowerCase()}`]) return ''
                const Elem = pages[path].page
                return <Route key={path} path={path} element={<Elem />} />
            })}
        </Routes>
    )
}
