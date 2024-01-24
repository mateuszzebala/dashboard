import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { FaGlobeEurope } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { LINKS } from '../../router/links'
import { MdDevicesOther, MdOutlineNetworkCheck } from 'react-icons/md'
import { FaChrome } from 'react-icons/fa6'
import { FiPieChart, FiServer } from 'react-icons/fi'

const StyledWrapper = styled.div`
    display: grid;
    gap: 20px;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    grid-template-columns: repeat(auto-fill, minmax(200px, 300px));
`
const StyledTile = styled.button`
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100%;
    font-size: 20px;
    padding: 20px;
    gap: 10px;
    flex-direction: column;
    text-align: center;
    background-color: ${({ theme }) => theme.secondary};
    border: 0;
    transition: background-color 0.3s, outline-width 0.3s;
    aspect-ratio: 1/1;
    outline: 0 solid ${({ theme }) => theme.quaternary}88;
    &:hover {
        background-color: ${({ theme }) => theme.quaternary};
        outline-width: 10px;
        svg {
            transform: scale(90%);
        }
    }
    svg {
        transition: transform 0.3s;
        font-size: 100px;
    }
`

export const StatisticsPage = () => {
    const navigate = useNavigate()
    return (
        <MainTemplate app={APPS.statistics}>
            <StyledWrapper>
                <StyledTile
                    onClick={() => {
                        navigate(LINKS.statistics.activity())
                    }}
                >
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
                >
                    <MdDevicesOther /> OPERATING SYSTEMS
                </StyledTile>
                <StyledTile
                    onClick={() => {
                        navigate(LINKS.statistics.browsers())
                    }}
                >
                    <FaChrome /> BROWSERS
                </StyledTile>
                <StyledTile
                    onClick={() => {
                        navigate(LINKS.statistics.network())
                    }}
                >
                    <MdOutlineNetworkCheck /> NETWORK
                </StyledTile>
            </StyledWrapper>
        </MainTemplate>
    )
}
