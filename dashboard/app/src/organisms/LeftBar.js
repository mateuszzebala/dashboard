import React from 'react'
import styled from 'styled-components'
import { LeftBarItem } from '../molecules/LeftBarItem'
import { APPS } from '../apps/apps'
import { toBoolStr } from '../utils/utils'
import { useLocation, useNavigate } from 'react-router-dom'
import { LINKS } from '../router/links'
import { useModalForm, useSettings } from '../utils/hooks'
import { GiPoland } from 'react-icons/gi'

const StyledBar = styled.nav`
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.secondary};
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px 0 0;
    width: 230px;
    overflow-x: hidden;
    z-index: 2;
    transition: max-width 0.3s ease, min-width 0.3s ease;
    max-width: ${({ close }) => (close ? '0' : '200px')};
    min-width: ${({ close }) => (close ? '0' : '200px')};
    box-shadow: 0 0 10px -5px ${({ theme }) => theme.primary}88;
    gap: 10px;
    a {
        text-decoration: none;
        text-align: center;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`

const StyleDashboard = styled.span`
    font-size: 25px;
    padding: 10px;
    text-align: center;
    color: ${({ theme }) => theme.secondary};
    cursor: pointer;
    outline: 0px dashed ${({ theme }) => theme.secondary}88;
    border-radius: 3px;
    transition: outline-width 0.1s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:focus{
        outline-width: 3px;
    }
    span{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5px;
        border-radius: 5px;
        font-size: 30px;
    }

    span:first-child{
        background-color: ${({theme})=>theme.primary};;
        color: ${({theme})=>theme.secondary};
        font-weight: bold;
    }
    
    span:last-child{
        color: ${({theme})=>theme.primary};
        background-color: ${({theme})=>theme.secondary};
        font-weight: lighter;
    }

`

const StyledMenuItems = styled.div`
    overflow-y: auto;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 10px;
    flex-direction: column;
    height: 100%;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`

const PolishFlag = styled.div`
    width: 230px;
    height: 50px;
    position: fixed;
    top: 0px;
    left: -80px;
    transform-origin: center;
    transform: rotate(-45deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: wait;
    div{
        width: 230px;
        height: 25px;
    }
    div:nth-child(1){background-color: #FFFFFF;}
    div:nth-child(2){background-color: #DC143C;}
`

const StyledFlag = styled.img`
    width: 100%;
    border-radius: 17px;
    border: solid 5px ${({ theme }) => theme.primary};
`

export const LeftBar = ({ close }) => {
    const [settings] = useSettings()
    const navigate = useNavigate()
    const modalForm = useModalForm()
    const location = useLocation()
    const [currectApp, setCurrentApp] = React.useState('None')

    React.useEffect(()=>{
        const appFromUrl = location.pathname.split('/').slice(1)[1]
        setCurrentApp(appFromUrl === '' ? '' : appFromUrl || 'None')
    }, [])

    return (
        <StyledBar close={toBoolStr(close)}>
            {settings['dashboard.polish_flag'] && <PolishFlag onClick={() => {
                modalForm({
                    content: () => <>
                        <StyledFlag src="https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/400px-Flag_of_Poland.svg.png" />
                    </>,
                    title: 'POLES FOR EVERYONE',
                    icon: <GiPoland />
                })
            }}>
                <div></div>
                <div></div>
            </PolishFlag>}
            <StyleDashboard tabIndex={0} onClick={() => navigate(LINKS.home())}>
                <span>DASH</span>
                <span>BOARD</span>
            </StyleDashboard>
            <StyledMenuItems>
                {Object.values(APPS).map((app) => {
                    if (!settings[`dashboard.app.${app.name.toLowerCase()}`]) return ''
                    return (
                        <LeftBarItem
                            active={app.name === APPS.home.name ? currectApp === '' : app.name.toLowerCase() === currectApp.toLowerCase()}
                            key={app.name}
                            app={app}
                            sublinks={app.sublinks && app.sublinks()}
                        />
                    )
                })}
            </StyledMenuItems>
        </StyledBar>
    )
}
