import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { AppList } from '../../organisms/home/applist/AppList'
import styled from 'styled-components'
import { LogsList } from '../../organisms/home/logslist/LogsList'
import { ServerManage } from '../../organisms/home/servermanage/ServerManage'
import { APPS } from '../../apps/apps'
import { HostManager } from '../../organisms/home/hosts/HostManager'
import { useModalForm, useSettings } from '../../utils/hooks'
import { FloatingActionButton, ServerInformations } from '../../atoms'
import { FaInfoCircle } from 'react-icons/fa'

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
    display: flex;
    flex-direction: row;
    padding: 20px;
    gap: 20px;
    height: 100%;
    > *{
        width: 33%;
    }
`




export const HomePage = () => {
    const [settings] = useSettings() 
    const modalForm = useModalForm()

    return (
        <MainTemplate app={APPS.home}>
           
            <StyledPage page={APPS.home.name}>
                
                <StyledWidgets>
                    {settings['home.app_list_widget'] && <AppList />}
                    {settings['home.server_config_widget'] && <ServerManage />}
                    {settings['home.logs_widget'] && <LogsList reloadEachSecond={settings['home.reload_logs']}/>}
                </StyledWidgets>
                {settings['home.hosts_widgets'] && (
                    <StyledHosts>
                        <HostManager
                            name={'ALLOWED HOSTS'}
                            hostKey={'server.allowed_hosts'}
                        />
                        <HostManager
                            name={'CORS ALLOWED ORIGINS'}
                            hostKey={'server.cors_allowed_origins'}
                        />
                        <HostManager
                            name={'CSRF TRUSTED ORIGINS'}
                            hostKey={'server.csrf_trusted_origins'}
                        />
                    </StyledHosts>
                )}
                {settings['home.informations_widget'] && 
                    <FloatingActionButton icon={<FaInfoCircle/>} size={1.4} onClick={()=>{
                        modalForm({
                            content: ServerInformations,
                            title: 'INFORMATIONS',
                            icon: <FaInfoCircle/>
                        })
                    }}/>
                }
            </StyledPage>
            
        </MainTemplate>
    )
}
