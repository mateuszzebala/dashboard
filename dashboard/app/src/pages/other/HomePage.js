import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { AppList } from '../../organisms/home/applist/AppList'
import styled from 'styled-components'
import { LogsList } from '../../organisms/home/logslist/LogsList'
import { ServerManage } from '../../organisms/home/servermanage/ServerManage'
import { APPS } from '../../apps/apps'
import { HostSelect } from '../../organisms/home/hosts/HostSelect'
import { ENDPOINTS } from '../../api/endpoints'

const StyledPage = styled.main`
    scroll-behavior: smooth;
    display: grid;
    grid-template-columns: repeat(1, 100%);
    grid-template-rows: repeat(1, 100%);
    height: 100%;
    scroll-snap-type: y mandatory;
`

const StyledWidgets = styled.div`
    display: flex;
    scroll-snap-align: start;
    align-items: stretch;
    justify-content: space-between;
    padding: 20px;
    gap: 20px;
    overflow-y: scroll;
    height: 100%;
    &::-webkit-scrollbar {
        height: 0;
    }
`

const StyledHosts = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 31%);
    justify-content: justify-content;
    padding: 20px;
    gap: 20px;
    height: 100%;
`


export const HomePage = () => {
    return (
        <MainTemplate app={APPS.home}>
            <StyledPage page={APPS.home.name}>
                <StyledWidgets>
                    <AppList />
                    <ServerManage />
                    <LogsList />

                </StyledWidgets>
                <StyledHosts>
                    <HostSelect
                        endpoint={ENDPOINTS.home.allowed_hosts()}
                        name={'ALLOWED HOSTS'}
                    />
                    <HostSelect
                        endpoint={ENDPOINTS.home.cors_allowed_origins()}
                        name={'CORS ALLOWED ORIGINS'}
                    />
                    <HostSelect
                        endpoint={ENDPOINTS.home.csrf_trusted_origins()}
                        name={'CSRF TRUSTED ORIGINS'}
                    />
                </StyledHosts>
            </StyledPage>
        </MainTemplate>
    )
}
