import React from 'react'
import { MainTemplate } from '../../../templates/MainTemplate'
import { APPS } from '../../../apps/apps'
import { WorldMap } from '../../../organisms/statistics/WorldMap'
import { FloatingActionButton, Loading } from '../../../atoms'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { FETCH } from '../../../api/api'
import { ENDPOINTS } from '../../../api/endpoints'
import styled from 'styled-components'

const StyledLoading = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.secondary};
`

export const StatisticsWorldMapPage = () => {
    const [scale, setScale] = React.useState(2)
    const [countries, setCountries] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        FETCH(ENDPOINTS.statistics.countries(), {}).then((data) => {
            setCountries(data.data.countries)
            setLoading(false)
        })
    }, [])

    return (
        <MainTemplate padding={0} app={APPS.statistics} title="WORLD MAP">
            {!loading && (
                <>
                    <WorldMap scale={scale} setScale={setScale} countries={countries} />
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
                </>
            )}
            {loading && (
                <StyledLoading>
                    <Loading size={2} />
                </StyledLoading>
            )}
        </MainTemplate>
    )
}
