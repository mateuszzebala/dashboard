import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { WorldMap } from '../../organisms/statistics/WorldMap'
import { FloatingActionButton } from '../../atoms/FloatingActionButton'
import { FaMinus, FaPlus } from 'react-icons/fa'

export const StatisticsWorldMapPage = () => {
    const [scale, setScale] = React.useState(2)
    return (
        <MainTemplate padding={0} app={APPS.statistics} title="WORLD MAP">
            <WorldMap
                scale={scale}
                setScale={setScale}
                countries={{
                    US: 90,
                    GB: 90,
                    AU: 90,
                    CA: 90,
                }}
            />
            <FloatingActionButton
                bottom={70}
                icon={<FaPlus />}
                onClick={() => {
                    setScale((prev) => prev + 0.3)
                }}
            />
            <FloatingActionButton
                icon={<FaMinus />}
                onClick={() => {
                    setScale((prev) => prev - 0.3)
                }}
            />
        </MainTemplate>
    )
}
