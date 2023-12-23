import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { AreaChart, BarChart, ColumnChart, LineChart, PieChart } from '../../atoms'
import { useTheme } from '../../utils/hooks'


export const SessionsPage = () => {
    const [theme] = useTheme()
    return <MainTemplate app={APPS.sessions}>
        <ColumnChart gap={25} max={500} title={'TOP CATEGORIES'} getValue={(val) => val} values={[0, 100, 200, 300, 400, 500]} dataSets={[
            {
                name: 'INCOME',
                color: theme.success,
                values: [
                    { label: 'SOCKS', value: 250 },
                    { label: 'TOPS', value: 312 },
                    { label: 'OTHER', value: 120 },
                    { label: 'PANTS', value: 333 },
                    { label: 'SHOES', value: 240 }
                ]
            },
            {
                name: 'LOSSES',
                color: theme.error,
                values: [
                    { label: 'SOCKS', value: 410 },
                    { label: 'TOPS', value: 412 },
                    { label: 'OTHER', value: 300 },
                    { label: 'PANTS', value: 150 },
                    { label: 'SHOES', value: 420 }
                ]
            },
            {
                name: 'LOSSES - INCOME',
                color: theme.warning,
                values: [
                    { label: 'SOCKS', value: 200 },
                    { label: 'TOPS', value: 312 },
                    { label: 'OTHER', value: 200 },
                    { label: 'PANTS', value: 250 },
                    { label: 'SHOES', value: 10 }
                ]
            },
            {
                name: 'POPULAR',
                color: theme.shoper,
                values: [
                    { label: 'SOCKS', value: 129 },
                    { label: 'TOPS', value: 315 },
                    { label: 'OTHER', value: 500 },
                    { label: 'PANTS', value: 120 },
                    { label: 'SHOES', value: 40 }
                ]
            },
        ]}/>

    </MainTemplate>
}
