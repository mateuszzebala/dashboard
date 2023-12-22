import React from 'react'
import { MainTemplate } from '../../../templates/MainTemplate'
import { APPS } from '../../../apps/apps'

export const StatisticsEfficiencyPage = () => {
    return (
        <MainTemplate app={APPS.statistics} title={'EFFICIENCY'}></MainTemplate>
    )
}