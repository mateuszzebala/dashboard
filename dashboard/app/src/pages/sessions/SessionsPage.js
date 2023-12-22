import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { AreaChart, BarChart, Button } from '../../atoms'
import { useTheme } from '../../utils/hooks'

export const SessionsPage = () => {
    const [theme] = useTheme()
    const [barChart, setBarChart] = React.useState(true)

    const Chart = barChart ? BarChart : AreaChart

    return <MainTemplate app={APPS.sessions} submenuChildren={<>
        <Button onClick={()=>setBarChart(prev => !prev)} size={1.4}>TOGGLE</Button>
    </>}>
        <Chart title={'VIEWS'} gap={20} dataSets={[
            {
                name: '1',
                color: theme.primary,
                values: [
                    { label: '12.01', value: 120, y: 20 },
                    { label: '12.02', value: 140, y: 40 },
                    { label: '12.03', value: 120, y: 20 },
                    { label: '12.04', value: 150, y: 50 },
                    { label: '12.05', value: 170, y: 70 },
                    { label: '12.06', value: 120, y: 20 },
                    { label: '12.07', value: 130, y: 30 },
                    { label: '12.08', value: 170, y: 70 },
                    { label: '12.09', value: 110, y: 10 },
                    { label: '12.10', value: 130, y: 30 },
                    { label: '12.11', value: 140, y: 40 },
                ]
            },
            {
                name: '2',
                color: theme.warning,
                values: [
                    { label: '12.01', value: 120, y: 10 },
                    { label: '12.02', value: 140, y: 20 },
                    { label: '12.03', value: 120, y: 30 },
                    { label: '12.04', value: 150, y: 40 },
                    { label: '12.05', value: 170, y: 50 },
                    { label: '12.06', value: 120, y: 60 },
                    { label: '12.07', value: 130, y: 70 },
                    { label: '12.08', value: 170, y: 80 },
                    { label: '12.09', value: 110, y: 90 },
                    { label: '12.10', value: 130, y: 80 },
                    { label: '12.11', value: 140, y: 70 },
                ]
            },
            {
                name: '3',
                color: theme.error,
                values: [
                    { label: '12.01', value: 120, y: 10 },
                    { label: '12.02', value: 140, y: 30 },
                    { label: '12.03', value: 120, y: 40 },
                    { label: '12.04', value: 150, y: 60 },
                    { label: '12.05', value: 170, y: 20 },
                    { label: '12.06', value: 120, y: 70 },
                    { label: '12.07', value: 130, y: 30 },
                    { label: '12.08', value: 170, y: 30 },
                    { label: '12.09', value: 110, y: 80 },
                    { label: '12.10', value: 130, y: 20 },
                    { label: '12.11', value: 140, y: 10 },
                ]
            },
        ]}/>
    </MainTemplate>
}
