import React from 'react'
import { MainTemplate } from '../../../templates/MainTemplate'
import { APPS } from '../../../apps/apps'
import styled from 'styled-components'
import { FiChrome } from 'react-icons/fi'
import { BsBrowserEdge, BsBrowserSafari } from 'react-icons/bs'
import { GoBrowser } from 'react-icons/go'
import { BiLogoOpera } from 'react-icons/bi'
import { FaChrome, FaFirefoxBrowser, FaInternetExplorer } from 'react-icons/fa'
import { SiBrave, SiTorbrowser, SiVivaldi } from 'react-icons/si'


const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 5px;
  padding: 20px;
`

const StyledBrowser = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  cursor: pointer;
  background-color: ${({theme})=>theme.primary}11;
  border-radius: 7px;
  font-size: 20px;
  align-items: center;
  span:first-child{
    display: inline-flex;
    gap: 10px;
    width: 80%;
    align-items: center;
    svg{
      font-size: 30px;
    }
  }
  span:last-child{
    width: 20%;
    text-align: right;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: normal;
  }
`

const StyledPercentBar = styled.div`
  @keyframes animate{
    from{
      transform: scaleX(0%);
    }
    to{
      transform: scaleX(100%);
    }
  }
  transform-origin: left center;
  height: 15px;
  border-radius: 5px;
  width: ${({value})=>value}%;
  animation: animate 1s ease forwards;
  background-color: ${({theme})=>theme.primary};
`


const browserData = [
    {
        name: 'Chrome/Chromium',
        icon: <FaChrome/>,
        percent: 51,
    },
    {
        name: 'Edge',
        icon: <BsBrowserEdge/>,
        percent: 25,
    },
    {
        name: 'Opera',
        icon: <BiLogoOpera/>,
        percent: 12,
    },
    {
        name: 'Firefox',
        icon: <FaFirefoxBrowser/>,
        percent: 4,
    },
    {
        name: 'Brave',
        icon: <SiBrave/>,
        percent: 2,
    },
    {
        name: 'Safari',
        icon: <BsBrowserSafari/>,
        percent: 2,
    },
    {
        name: 'Tor',
        icon: <SiTorbrowser/>,
        percent: 1,
    },
    {
        name: 'Vivaldi',
        icon: <SiVivaldi/>,
        percent: 1,
    },
    {
        name: 'Internet Explorer',
        icon: <FaInternetExplorer/>,
        percent: 1,
    },
    {
        name: 'Other',
        icon: <GoBrowser/>,
        percent: 1,
    },

]

export const StatisticsBrowsersPage = () => {
    return (
        <MainTemplate app={APPS.statistics} title={'BROWSERS'}>
            <StyledWrapper>
                {browserData.map(browser => (
                    <StyledBrowser key={browser.name}>
                        <span>{browser.icon} <StyledPercentBar value={browser.percent}/> {browser.percent}%</span>
                        <span>{browser.name}</span>
                    </StyledBrowser>
                ))}

            </StyledWrapper>
        </MainTemplate>
    )
}