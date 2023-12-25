import React from 'react'
import { MainTemplate } from '../../../templates/MainTemplate'
import { APPS } from '../../../apps/apps'
import { AreaChart, Button, ColumnChart, LineChart, Select } from '../../../atoms'
import { useTheme } from '../../../utils/hooks'
import { FiBarChart, FiCalendar, FiRefreshCw } from 'react-icons/fi'
import { FaChartArea } from 'react-icons/fa'
import { FaChartColumn } from 'react-icons/fa6'
import { FETCH } from '../../../api/api'
import { ENDPOINTS } from '../../../api/endpoints'
import { range } from '../../../utils/utils'

export const StatisticsActivityPage = () => {
    const [theme] = useTheme()
    const [columnChart, setColumnChart] = React.useState(false)
    const [data, setData] = React.useState({stats: {}, max: 0})
    const [reload, setReload] = React.useState(0)
    const [period, setPeriod] = React.useState('hour')

    const Chart = columnChart ? ColumnChart : LineChart

    React.useEffect(()=>{
        FETCH(ENDPOINTS.statistics.activity(period)).then(data=>{
            setData(data.data)
        })

    }, [period, reload])

    return (
        <MainTemplate app={APPS.statistics} title={'ACTIVITY'} submenuChildren={
            <>
                <Button onClick={()=>setReload(prev => prev + 1)} icon={<FiRefreshCw/>} second size={1.4} subContent={'RELOAD'}/>
                <Button onClick={()=>setColumnChart(prev => !prev)} icon={columnChart ? <FaChartArea/> : <FiBarChart/>} second size={1.4} subContent={'CHART'}/>
                <Select canBeNull={false} second size={1.4} value={period} setValue={setPeriod} asButton subContent={'PERIOD'} icon={<FiCalendar/>} data={{
                    'minute': 'MINUTE',
                    'hour': 'HOUR',
                    'day': 'DAY',
                    'week': 'WEEK',
                    'month': 'MONTH',
                    'year': 'YEAR',
                }}/>
            </>
        }>
            <Chart gap={15} max={data.max} values={range(0, data.max, data.max/5).map(i => Math.round(i))} title={'VIEWS PER ' + period.toUpperCase()} getValue={(val) => val} dataSets={[
                {
                    name: 'VIEWS PER ' + period.toUpperCase(),
                    color: theme.primary,
                    values: Object.keys(data.stats).sort((a, b) => parseInt(a) - parseInt(b)).map(ago => ({label: ago + ' ' + period, value: data.stats[ago]}))
                },
            ]}/>

        </MainTemplate>
    )
}