import React from 'react'
import styled from 'styled-components'
import { AppItem } from './AppItem.js'
import { APPS } from '../../../apps/index.js'

const StyledWrapper = styled.div`
    display: flex;
    gap: 20px;
    min-width: 240px;
    max-width: 240px;
    max-height: 100%;
    flex-wrap: wrap;
    padding: 0 10px;
    overflow: scroll;
    justify-content: center;
    &::-webkit-scrollbar {
        width: 0;
    }
`

export const AppList = () => {
    return (
        <StyledWrapper>
            {APPS.map((app) => {
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
        </StyledWrapper>
    )
}
