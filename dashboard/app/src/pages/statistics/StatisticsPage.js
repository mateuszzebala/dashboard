import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { FaGlobeEurope } from 'react-icons/fa'
import { AiOutlineLineChart } from 'react-icons/ai'
import { BiServer } from 'react-icons/bi'
import { useNavigate } from 'react-router'
import { LINKS } from '../../router/links'
import { BsBrowserSafari } from 'react-icons/bs'
import { MdDevicesOther } from 'react-icons/md'
import { FaChrome, FaChromecast, FaMoneyBillTransfer } from 'react-icons/fa6'
import { FiPieChart, FiServer } from 'react-icons/fi'

const StyledWrapper = styled.div`
    display: grid;
    gap: 10px;
    height: 100%;
    align-items: center;
    justify-content: center;
      padding: 10px 0;
      grid-template-columns: repeat(auto-fill, minmax(200px, 300px));
`
const StyledTile = styled.div`
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100%;
    height: 100%;
    font-size: 20px;
    padding: 20px;
    gap: 10px;
    flex-direction: column;
    text-align: center;
    transition: background-color 0.3s;
    &:hover{
      background-color: ${({theme})=>theme.primary}22;
      svg{
        transform: scale(115%) rotate(10deg);
      }
      text-decoration: underline;
    }
    svg{
      transition: transform 0.3s;
      font-size: 100px;
    }
`

export const StatisticsPage = () => {
    const navigate = useNavigate()
    return (
        <MainTemplate app={APPS.statistics}>
            <StyledWrapper>
                <StyledTile>
                    <FiPieChart /> PAGE ACTIVITY
                </StyledTile>
                <StyledTile
                    onClick={() => {
                        navigate(LINKS.statistics.map())
                    }}
                >
                    <FaGlobeEurope /> MAP
                </StyledTile>
                <StyledTile
                    onClick={() => {
                        navigate(LINKS.statistics.efficiency())
                    }}
                >
                    <FiServer /> SERVER EFFICIENCY
                </StyledTile>
                <StyledTile
                    onClick={() => {
                        navigate(LINKS.statistics.systems())
                    }}
                ><MdDevicesOther/> OPERATING SYSTEMS</StyledTile>
                <StyledTile onClick={()=>{
                    navigate(LINKS.statistics.browsers())
                }}><FaChrome/> BROWSERS</StyledTile>
            </StyledWrapper>
        </MainTemplate>
    )
}
