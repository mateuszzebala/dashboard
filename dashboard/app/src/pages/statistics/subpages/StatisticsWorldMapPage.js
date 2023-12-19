import React from 'react'
import { MainTemplate } from '../../../templates/MainTemplate'
import { APPS } from '../../../apps/apps'
import { Input } from '../../../atoms/Input'
import { WorldMap } from '../../../organisms/statistics/WorldMap'
import { FloatingActionButton } from '../../../atoms/FloatingActionButton'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { FETCH } from '../../../api/api'
import { ENDPOINTS } from '../../../api/endpoints'

export const StatisticsWorldMapPage = () => {
    const [scale, setScale] = React.useState(2)
    const [countries, setCountries] = React.useState({})

    React.useEffect(() => {
        FETCH(ENDPOINTS.statistics.countries(), {}).then((data) => {
            setCountries(data.data.countries)
        })
    }, [])

    return (
        <MainTemplate padding={0} app={APPS.statistics} title="WORLD MAP">
            {/* <WorldMap scale={scale} setScale={setScale} countries={countries} /> */}
            <FloatingActionButton
                bottom={70}
                icon={<FaPlus />}
                onClick={() => {
                    setScale((prev) => prev * 2)
                }}
            />
            <FloatingActionButton
                icon={<FaMinus />}
                onClick={() => {
                    setScale((prev) => prev / 2)
                }}
            />
        </MainTemplate>
    )
}
