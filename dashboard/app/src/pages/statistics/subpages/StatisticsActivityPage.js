import React from 'react'
import { MainTemplate } from '../../../templates/MainTemplate'
import { APPS } from '../../../apps/apps'
import { BarChart, Button } from '../../../atoms'
import { useTheme } from '../../../utils/hooks'
import { FiRefreshCw } from 'react-icons/fi'

export const StatisticsActivityPage = () => {
    const [theme] = useTheme()
    return (
        <MainTemplate app={APPS.statistics} title={'ACTIVITY'} submenuChildren={
            <>
                <Button icon={<FiRefreshCw/>} second size={1.4} subContent={'RELOAD'}/>
            </>
        }>
            <BarChart max={1000} title={'ACTIVITY'} getValue={(val) => val * 10} values={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} dataSets={[
                {
                    name: 'Requests',
                    color: theme.accent,
                    values: [
                        { label: '15h', value: 233 },
                        { label: '14h', value: 333 },
                        { label: '13h', value: 343 },
                        { label: '12h', value: 443 },
                        { label: '11h', value: 233 },
                        { label: '10h', value: 777 },
                        { label: '9h', value: 812 },
                        { label: '8h', value: 823 },
                        { label: '7h', value: 892 },
                        { label: '6h', value: 314 },
                        { label: '5h', value: 450 },
                        { label: '4h', value: 412 },
                        { label: '3h', value: 530 },
                        { label: '2h', value: 300 },
                        { label: '1h', value: 340 }
                    ]
                },

            ]}/>

        </MainTemplate>
    )
}