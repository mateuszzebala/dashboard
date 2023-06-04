import React from 'react'
import styled from 'styled-components'
import { AppItem } from './AppItem.js'
import { APPS } from '../../../apps/index.js'

const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 45%);
    gap: 20px;
    min-width: 250px;
    max-height: 100%;
    flex-wrap: wrap;
    padding: 10px;
    overflow: scroll;
    box-shadow: 0 0 8px -5px black;
    border-radius: 10px;
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
