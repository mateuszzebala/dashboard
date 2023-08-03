import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { FaGlobeEurope } from 'react-icons/fa'
import { AiOutlineLineChart } from 'react-icons/ai'
import { BiServer } from 'react-icons/bi'
import { useNavigate } from 'react-router'
import { LINKS } from '../../router/links'

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    height: 100%;
    align-items: center;
    justify-content: center;
`
const StyledTile = styled.div`
    box-shadow: 0 0 8px -5px ${({ theme }) => theme.primary};
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 47%;
    height: 47%;
    font-size: 20px;
    transition: transform 0.2s;
    padding: 20px;
    gap: 10px;
    flex-direction: column;
    text-align: center;
    &:hover {
        transform: scale(0.95);
    }
`

export const StatisticsPage = () => {
    const navigate = useNavigate()
    return (
        <MainTemplate app={APPS.statistics}>
            <StyledWrapper>
                <StyledTile>
                    <AiOutlineLineChart /> PAGE ACTIVITY
                </StyledTile>
                <StyledTile
                    onClick={() => {
                        navigate(LINKS.statistics.map())
                    }}
                >
                    <FaGlobeEurope /> WORLD MAP
                </StyledTile>
                <StyledTile>
                    <BiServer /> SERVER EFFICIENCY
                </StyledTile>
                <StyledTile>MAP</StyledTile>
            </StyledWrapper>
        </MainTemplate>
    )
}
