import React from 'react'
import { MainTemplate } from '../templates/MainTemplate'
import { AppList } from '../organisms/home/applist/AppList'
import styled from 'styled-components'
import { LogsList } from '../organisms/home/logslist/LogsList'
import { ServerManage } from '../organisms/home/servermanage/ServerManage'

const StyledWrapper = styled.main`
    scroll-behavior: smooth;
    display: grid;
    grid-template-columns: repeat(1, 100%);
    grid-template-rows: repeat(1, 100%);
    height: 100%;
    scroll-snap-type: y mandatory;
`

const StyledRow = styled.div`
    display: flex;
    align-items: flex-start;
    scroll-snap-align: start;
    align-items: stretch;
    justify-content: stretch;
    padding: 20px;
    gap: 20px;
    height: 100%;
`

export const HomePage = () => {
    return (
        <MainTemplate title={'HOME'}>
            <StyledWrapper>
                <StyledRow>
                    <AppList />
                    <ServerManage />
                    <LogsList />
                </StyledRow>
            </StyledWrapper>
        </MainTemplate>
    )
}
