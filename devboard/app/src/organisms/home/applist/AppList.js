import React from 'react'
import styled from 'styled-components'
import { AppItem } from './AppItem.js'
import { APPS } from '../../../apps/apps'
import { useSettings } from '../../../utils/hooks.js'

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 45%);
    gap: 20px;
    min-width: 250px;
    max-height: 100%;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
    overflow: scroll;
    box-shadow: 0 0 8px -5px ${({ theme }) => theme.primary};
    border-radius: 10px;
    &::-webkit-scrollbar {
        width: 0;
    }
`

export const AppList = () => {
    const [settings] = useSettings()
    return (
        <StyledGrid>
            {Object.values(APPS).map((app) => {
                if (!settings[`devboard.app.${app.name.toLowerCase()}`]) return ''
                const Icon = app.icon
                return (
                    <AppItem
                        key={app.name}
                        icon={<Icon />}
                        name={app.name}
                        link={app.link}
                    />
                )
            })}
        </StyledGrid>
    )
}
