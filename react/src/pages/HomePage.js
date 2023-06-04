import React from 'react'
import { MainTemplate } from '../templates/MainTemplate'
import { AppList } from '../organisms/home/applist/AppList'
import styled from 'styled-components'
import { LogsList } from '../organisms/home/logslist/LogsList'
import { ServerManage } from '../organisms/home/servermanage/ServerManage'

const StyledWrapper = styled.main`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 20px;
    gap: 20px;
    height: 100%;
`

export const HomePage = () => {
    return (
        <MainTemplate title={'HOME'}>
            <StyledWrapper>
                <AppList />
                <ServerManage />
                <LogsList />
            </StyledWrapper>
        </MainTemplate>
    )
}
