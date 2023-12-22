import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import {LineChart} from '../../atoms'

export const SessionsPage = () => {
    return <MainTemplate app={APPS.sessions}>
        <LineChart/>
    </MainTemplate>
}
