import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { links } from '../../router/links'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useParams } from 'react-router'
import { APPS } from '../../apps/apps'
import { Typography } from '../../atoms/Typography'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const InfoByApp = {
    index: (
        <StyledWrapper>
            <Typography variant={'h4'}>
                On each app in right you have info icon. If you will click it
                then you see info about this app and how to use it
            </Typography>
        </StyledWrapper>
    ),
    [APPS.home.name]: (
        <StyledWrapper>
            <Typography variant={'h3'}>CONFIG</Typography>
            <Typography variant={'p'}>
                Switch the most important config toggles on your server.
                <br />
                PAGE: If is false then all of the endpoints (without dashboard)
                is disabled and all pages showing PAGE DISABLED
                <br />
                DEBUG: If is true then all of the errors are showing. This
                should be true only on development
                <br />
                NEW USERS: If this is false then all endpoints to create new
                users (without dashboards endpoints) is disabled.
                <br />
                DDoS BLOCK: If this is true then in middleware server checking
                if from one ip is a lot of requests if yes then block it.
                <br />
                SAVE REQUESTS: If this is true then all of requests from other
                apps are saved as logs
            </Typography>
            <Typography variant={'h3'}>LOG LIST</Typography>
            <Typography variant={'p'}>
                It widget showing last logs on server from others apps. If you
                want you can disabled saveing it by toggling SAVE REQUESTS
                Switch. Also you can disable auto reload each second in settings
            </Typography>
            <Typography variant={'h3'}>HOSTS MANAGE</Typography>
            <Typography variant={'p'}>
                Three hosts groups used by django for security. If you want to
                add some host you should write it to input and click plus
                button. If you want to remove some host then right click on it
            </Typography>
        </StyledWrapper>
    ),
    [APPS.database.name]: (
        <StyledWrapper>
            <Typography variant={'h1'}>Database</Typography>
            <Typography variant={'p'}>Info about database app</Typography>
            <Typography variant={'p'}>
                I will complete this page after end of app
            </Typography>
        </StyledWrapper>
    ),
}

export const InfoPage = () => {
    const { appName } = useParams()

    return (
        <MainTemplate
            app={{
                name: 'Info',
                link: links.info.index(),
                icon: AiOutlineInfoCircle,
            }}
            title={appName || ''}
        >
            {appName ? InfoByApp[appName] : InfoByApp['index']}
        </MainTemplate>
    )
}
