import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { AreaChart, BarChart, ColumnChart, LineChart, PieChart } from '../../atoms'
import { useTheme } from '../../utils/hooks'


export const SessionsPage = () => {
    const [theme] = useTheme()
    return <MainTemplate app={APPS.sessions}>
        <ColumnChart gap={25} max={600} title={'TOP CATEGORIES'} setValue={val => val + 300} getValue={(val) => val - 300} values={[0, 100, 200, 300, 400, 500, 600]} dataSets={[
            {
                name: 'INCOME',
                color: theme.success,
                values: [
                    { label: '3DAYS AGO', value: 200 },
                    { label: '2DAYS AGO', value: 100 },
                    { label: 'YESTRDAY', value: -100 },
                    { label: 'TODAY', value: -200 },
                ]
            },
            {
                name: 'LOSSESS',
                color: theme.error,
                values: [
                    { label: '3DAYS AGO', value: 100 },
                    { label: '2DAYS AGO', value: -50 },
                    { label: 'YESTRDAY', value: 100 },
                    { label: 'TODAY', value: -100 },
                ]
            },
        ]}/>

    </MainTemplate>
}
