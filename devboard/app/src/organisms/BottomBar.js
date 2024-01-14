import React from 'react'
import styled from 'styled-components'
import { APPS } from '../apps/apps'
import { useNavigate } from 'react-router'

const StyledBar = styled.nav`
    background-color: ${({ theme }) => theme.primary};
    height: 80px;
    width: 100vw;
    position: fixed;
    bottom: 0;
    display: flex;
    gap: 5px;
    overflow: scroll;
    align-items: center;
    padding: 0 10px;
    ::-webkit-scrollbar {
        height: 0;
    }
`

const AppButton = styled.button`
    background-color: transparent;
    border: 0;
    color: ${({ theme }) => theme.secondary};
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 70px;
    width: 20%;
    align-items: center;
    svg {
        font-size: 20px;
    }
`

const StyledSpace = styled.div`
    height: 100px;
    width: 100vw;
`

export const BottomBar = () => {
    const navigate = useNavigate()
    return (
        <>
            <StyledSpace></StyledSpace>
            <StyledBar>
                {Object.values(APPS).map((app) => {
                    return (
                        <AppButton
                            key={app.name}
                            onClick={() => {
                                navigate(app.link)
                            }}
                        >
                            {<app.icon />} {app.name.toUpperCase()}
                        </AppButton>
                    )
                })}
            </StyledBar>
        </>
    )
}
