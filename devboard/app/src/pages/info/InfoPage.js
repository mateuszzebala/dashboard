import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { LINKS } from '../../router/links'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useParams } from 'react-router'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { Link } from '../../atoms'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 120%;
    color: ${({ theme }) => theme.primary};
    h1, h2, h3, h4, h5, h6 {
        margin: 0;
        font-weight: 500;
        color: ${({ theme }) => theme.primary};
    }
    p {
        margin: 0;
        font-weight: 200;
        color: ${({ theme }) => theme.primary};
    }
`

export const InfoByApp = {
    [APPS.home.name]: (
        <StyledWrapper>
            <Link accent to={LINKS.other.components()}>COMPONENTS</Link>
            <h3>CONFIG</h3>
            <p>
                Switch the most important config toggles on your server.
                <br />
                PAGE: If is false then all of the endpoints (without devboard)
                is disabled and all pages showing PAGE DISABLED
                <br />
                DEBUG: If is true then all of the errors are showing. This
                should be true only on development
                <br />
                NEW USERS: If this is false then all endpoints to create new
                users (without devboards endpoints) is disabled.
                <br />
                DDoS BLOCK: If this is true then in middleware server checking
                if from one ip is a lot of requests if yes then block it.
                <br />
                SAVE REQUESTS: If this is true then all of requests from other
                apps are saved as logs
            </p>
            <h3>LOG LIST</h3>
            <p>
                It widget showing last logs on server from others apps. If you
                want you can disabled saveing it by toggling SAVE REQUESTS
                Switch. Also you can disable auto reload each second in settings
            </p>
            <h3>HOSTS MANAGE</h3>
            <p>
                Three hosts groups used by django for security. If you want to
                add some host you should write it to input and click plus
                button. If you want to remove some host then right click on it
            </p>
        </StyledWrapper>
    ),
    [APPS.database.name]: (
        <StyledWrapper>
            <h1>Database</h1>
            <p>Info about database app</p>
            <p>I will complete this page after end of app</p>
        </StyledWrapper>
    ),
    [APPS.files.name]: (
        <StyledWrapper>
            <h3>FILES</h3>
            <p>Info about files app</p>
            <p>I will complete this page after end of app</p>
        </StyledWrapper>
    ),
}

export const InfoPage = () => {
    const { appName } = useParams()

    return (
        <MainTemplate
            app={{
                name: 'Info',
                link: LINKS.info.index(),
                icon: AiOutlineInfoCircle,
            }}
            title={appName || ''}
        >
            {appName ? InfoByApp[appName] : InfoByApp['index']}
        </MainTemplate>
    )
}
