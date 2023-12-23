import React from 'react'
import { useModalForm, useTheme } from '../../utils/hooks'
import styled from 'styled-components'
import { range } from '../../utils/utils'
import { ChartInfo } from './ChartInfo'
import { FaChartPie } from 'react-icons/fa'

const StyledSvg = styled.svg`
    circle{
        stroke-opacity: 70%;
        transition: stroke-opacity 0.3s;
        cursor: pointer;
        
    }
    g:hover{
        text{
            text-decoration: underline;
        }
        stroke-opacity: 90%;
    }
`

const StyledLabel = styled.text`
    text-transform: uppercase;
`

const StyledWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 20px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    h1{
        margin: 0;
        padding: 3px;
    }
`

const StyledParts = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    text-transform: uppercase;
    font-weight: bold;
    align-items: flex-end;
    flex-direction: column;
    justify-content: center;
    span{
        text-align: center;
    }
`

const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    justify-content: center;
    gap: 10px;
`

export const PieChart = ({ dataSet, title }) => {
    const modalForm = useModalForm()
    const [theme] = useTheme()

    let gapCounter = 0
    let labelCounter = 0

    return (
        <StyledWrapper>
            <h1>{title.toUpperCase()}</h1>
            <StyledRow>
                
                <StyledSvg
                    onClick={() => {
                        modalForm({
                            content: ChartInfo,
                            title: title.toUpperCase(),
                            icon: <FaChartPie />,
                            data: [{ name: title, values: dataSet, color: theme.primary }],
                        })
                    }}
                    viewBox="0 0 64 64"
                    style={{
                        borderRadius: '50%',
                        background: 'transparent',
                    }}
                >
                    {range(0, dataSet.length - 1).map((id) => {
                        gapCounter += dataSet[id - 1] ? -dataSet[id - 1].value * 1.01 : 0
                        const percentage = dataSet[id].value * 1.01
                        const deg = 360 * (labelCounter / 100) + (360 * (percentage / 200))
                        const radians = deg * (Math.PI / 180)
                        const labelX = 50 + 35 * Math.cos(radians)
                        const labelY = 50 + 35 * Math.sin(radians)
                        labelCounter += percentage
                        
                        return (
                            <g key={id}>
                                <circle
                                    strokeWidth="32"
                                    fill="none"
                                    r="25%"
                                    cx="50%"
                                    cy="50%"
                                    style={{
                                        strokeDasharray: `${percentage} 100`,
                                        stroke: dataSet[id].color,
                                        strokeDashoffset: gapCounter,
                                    }}
                                ></circle>
                                <StyledLabel x={`${labelX}%`} y={`${labelY}%`} fontSize={'2px'} fill={'black'} textAnchor="middle">
                                    {dataSet[id].label}
                                </StyledLabel>
                            </g>
                        )
                    })}
                </StyledSvg>
            </StyledRow>
        </StyledWrapper>
    )
}
