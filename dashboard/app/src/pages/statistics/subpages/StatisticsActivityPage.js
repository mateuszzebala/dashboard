import React from 'react'
import { MainTemplate } from '../../../templates/MainTemplate'
import { APPS } from '../../../apps/apps'
import { AreaChart, Button, ColumnChart } from '../../../atoms'
import { useTheme } from '../../../utils/hooks'
import { FiRefreshCw } from 'react-icons/fi'
import { FaChartArea } from 'react-icons/fa'
import { FaChartColumn } from 'react-icons/fa6'

export const StatisticsActivityPage = () => {
    const [theme] = useTheme()
    const [columnChart, setColumnChart] = React.useState(false)

    const Chart = columnChart ? ColumnChart : AreaChart

    return (
        <MainTemplate app={APPS.statistics} title={'ACTIVITY'} submenuChildren={
            <>
                <Button icon={<FiRefreshCw/>} second size={1.4} subContent={'RELOAD'}/>
                <Button onClick={()=>setColumnChart(prev => !prev)} icon={columnChart ? <FaChartArea/> : <FaChartColumn/>} second size={1.4} subContent={'CHART'}/>
            </>
        }>
            <Chart gap={15} max={1000} title={'VISITS'} getValue={(val) => val} values={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]} dataSets={[
                {
                    name: '',
                    color: theme.primary,
                    values: [
                        { label: '24h', value: 333 },
                        { label: '23h', value: 533 },
                        { label: '22h', value: 933 },
                        { label: '21h', value: 133 },
                        { label: '20h', value: 833 },
                        { label: '19h', value: 233 },
                        { label: '18h', value: 333 },
                        { label: '17h', value: 733 },
                        { label: '16h', value: 333 },
                        { label: '15h', value: 233 },
                        { label: '14h', value: 433 },
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