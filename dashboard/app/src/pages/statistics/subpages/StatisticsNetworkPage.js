import React from 'react'
import { MainTemplate } from '../../../templates/MainTemplate'
import { APPS } from '../../../apps/apps'
import { AreaChart } from '../../../atoms'
import { FETCH } from '../../../api/api'
import { ENDPOINTS } from '../../../api/endpoints'
import { useTheme } from '../../../utils/hooks'
import { range } from '../../../utils/utils'

export const StatisticsNetworkPage = () => {
    const [stats, setStats] = React.useState({
        download: [],
        upload: [],
    })
    const [max, setMax] = React.useState(100)
    const [theme] = useTheme()

    const reload = () => {
        FETCH(ENDPOINTS.statistics.network()).then(data => {
            setStats(data.data.stats)
            setMax(data.data.max)
        })
    }

    React.useEffect(reload, [])

    React.useEffect(()=>{
        const interval = setInterval(reload, 500)
        return () => clearInterval(interval)
    }, [])

    return (
        <MainTemplate app={APPS.statistics} title={'NETWORK'}>
            <AreaChart 
                title={'NETWORK'} 
                max={max}
                padding={70}
                getValue={(val)=>Math.round(val) + 'Mb/s'} 
                values={range(0, max, max/10)}
                dataSets={[
                    {
                        name: 'DOWNLOAD',
                        color: theme.shoper,
                        values: stats.download.map(sec => ({label: '', value: sec}))
                    },
                    {
                        name: 'UPLOAD',
                        color: theme.success,
                        values: stats.upload.map(sec => ({label: '', value: sec}))
                    },
                ]}
            /> 

     

        </MainTemplate>
    )
}