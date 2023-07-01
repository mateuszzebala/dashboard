import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'

export const FinancePage = () => {
    return <MainTemplate app={APPS.finance}></MainTemplate>
}
