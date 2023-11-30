import React from 'react'
import styled from 'styled-components'
import { LeftBarItem } from '../molecules/LeftBarItem'
import { SiDjango } from 'react-icons/si'
import { APPS } from '../apps/apps'
import { FaHeart, FaReact, FaRegHeart } from 'react-icons/fa'
import { toBoolStr } from '../utils/utils'
import { Link } from 'react-router-dom'
import { LINKS } from '../router/links'
import Logo from '../assets/logos/logo-light-colors.svg'
import { useModalForm } from '../utils/hooks'

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
    img{
        width: 120px;
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

const LGBTFlag = styled.div`
    width: 180px;
    height: 42px;
    position: fixed;
    top: 20px;
    left: -80px;
    transform-origin: center;
    transform: rotate(-45deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: wait;
    div{
        width: 180px;
        height: 7px;
        
    }
    div:nth-child(1){background-color: #E40303;}
    div:nth-child(2){background-color: #FF8C00;}
    div:nth-child(3){background-color: #FFED00;}
    div:nth-child(4){background-color: #008026;}
    div:nth-child(5){background-color: #24408E;}
    div:nth-child(6){background-color: #732982;}
`

export const LeftBar = ({ close }) => {
    const modalForm = useModalForm()
    return (
        <StyledBar close={toBoolStr(close)}>
            <LGBTFlag onClick={()=>{
                modalForm({
                    content: ()=><>
                        <img width={300} src="https://images.photowall.com/products/52624/lgbt-grungy-heart.jpg?h=699&q=85"/>
                    </>,
                    title: 'FREE LOVE',
                    icon: <FaRegHeart />
                })
            }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </LGBTFlag>
            <Link to={LINKS.home()}>
                <StyleDashboard>
                    <img src={Logo}/>

                </StyleDashboard>
            </Link>
            <StyledMenuItems>
                {Object.values(APPS).map((app) => {
                    return (
                        <LeftBarItem
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
