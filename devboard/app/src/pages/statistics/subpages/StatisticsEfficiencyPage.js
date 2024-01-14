import React from 'react'
import { MainTemplate } from '../../../templates/MainTemplate'
import { APPS } from '../../../apps/apps'
import { AreaChart, Button } from '../../../atoms'
import { FETCH } from '../../../api/api'
import { ENDPOINTS } from '../../../api/endpoints'
import { useTheme } from '../../../utils/hooks'
import { FiPlayCircle, FiStopCircle } from 'react-icons/fi'

export const StatisticsEfficiencyPage = () => {
    const [stats, setStats] = React.useState({
        cpu: [],
        memory: [],
    })
    const [running, setRunning] = React.useState(true)
    const [theme] = useTheme()

    const reload = () => {
        FETCH(ENDPOINTS.statistics.efficiency()).then((data) => {
            setStats(data.data)
        })
    }

    React.useEffect(reload, [])

    React.useEffect(() => {
        if (running) {
            const interval = setInterval(reload, 500)
            return () => clearInterval(interval)
        }
    }, [running])

    return (
        <MainTemplate
            app={APPS.statistics}
            title={'EFFICIENCY'}
            submenuChildren={
                <>
                    <Button onClick={() => setRunning((prev) => !prev)} icon={running ? <FiStopCircle /> : <FiPlayCircle />} size={1.4} second subContent={running ? 'STOP' : 'START'} />
                </>
            }
        >
            <AreaChart
                title={'SERVER EFFICIENCY'}
                max={100}
                getValue={(val) => val + '%'}
                values={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                dataSets={[
                    {
                        name: 'MEMORY',
                        color: theme.success,
                        values: stats.memory.map((sec) => ({ label: '', value: sec })),
                    },
                    {
                        name: 'CPU',
                        color: theme.accent,
                        values: stats.cpu.map((sec) => ({ label: '', value: sec })),
                    },
                ]}
            />
        </MainTemplate>
    )
}
