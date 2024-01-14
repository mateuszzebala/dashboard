import React from 'react'
import styled from 'styled-components'
import useResizeObserver from 'use-resize-observer'
import { useModalForm } from '../../utils/hooks'
import { ChartInfo } from './ChartInfo'
import { FaChartColumn } from 'react-icons/fa6'

const StyledWrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: relative;
`

const StyledChart = styled.svg`
    width: 100%;
    height: 100%;
    cursor: pointer;
    text{
        font-family: var(--font-family);
        fill: ${({theme})=> theme.primary};
    }
    line{
        stroke: ${({ theme }) => theme.quaternary}88;
        stroke-width: 2px;
    }
`

const StyledRect = styled.rect`
    fill: ${({ color, theme }) => color || theme.primary};
    stroke: ${({ color, theme }) => color || theme.primary};
    stroke-opacity: 50%;
    fill-opacity: 30%;
    stroke-width: 5px;
    stroke-linejoin: round;
`

const StyledDataSetName = styled.span`
    font-weight: 500;
    text-transform: uppercase;
`

const StyledChartTop = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    align-items: center;
    top: 0;
    left: ${({left})=>left}px;
    padding: 0;
    height: ${({height})=>height}px;
    gap: 20px;
    h1{
        margin: 0;
        text-transform: uppercase;
    }
`


export const BarChart = ({ title, dataSets = [], max=100, padding = 60, gap = 10, values=null, getValue=(val)=>val }) => {
    const svgRef = React.useRef()
    const [svgSize, setSvgSize] = React.useState({ width: 0, height: 0 })
    const [chartSize, setChartSize] = React.useState({ width: 0, height: 0 })
    const modalForm = useModalForm()

    const { ref } = useResizeObserver({
        onResize: ({ width, height }) => {
            setSvgSize({ width, height })
            setChartSize({ width: width - padding * 2, height: height - padding * 2 })
        }
    })

    const getChartPoint = (xPer, yPer) => ({
        x: Math.round(xPer * 0.01 * chartSize.width + padding),
        y: Math.round((yPer - 100) * (-1) * 0.01 * chartSize.height + padding)
    })

    const distinctPointsX = []
    const distinctPointsY = []

    if(values){
        values.forEach(value => distinctPointsX.push({value}))
    }
    else{
        dataSets.forEach(dataSet => {
            dataSet.values.forEach(point => !distinctPointsX.some(p => point.value == p.value) && distinctPointsX.push(point))
        })
    }

    dataSets.forEach(dataSet => {
        dataSet.values.forEach(point => !distinctPointsY.some(p => point.label == p.label) && distinctPointsY.push(point))
    })

    let counterLabels = -1
    let counterSet = -1
    let counterSetsName = -1

    return (
        <StyledWrapper ref={ref}>
            <StyledChart onDoubleClick={() => {
                modalForm({
                    content: ChartInfo,
                    title: 'CHART INFO',
                    data: dataSets,
                    icon: <FaChartColumn />,
                    todo: () => { },
                })
            }} viewBox={`0 0 ${svgSize.width} ${svgSize.height}`} ref={svgRef}>

                {distinctPointsX.map(({ value }) => {
                    const x = value / max * 100
                    return (
                        <>
                            <line x1={getChartPoint(x, 0).x} y1={getChartPoint(0, 0).y} x2={getChartPoint(x, 0).x} y2={getChartPoint(0, 100).y} />
                            <text fontSize={chartSize.width / 80} x={getChartPoint(x, 0).x} y={getChartPoint(0, 0).y + 5} textAnchor='middle' alignmentBaseline='hanging'>{getValue(value)}</text>
                        </>
                    )
                })}

                {distinctPointsY.map(({ label }) => {
                    counterLabels += 1
                    return <text fontSize={chartSize.width / 80} key={label} x={padding - 5} y={(1 / dataSets[0].values.length * counterLabels + 0.5 / dataSets[0].values.length)*chartSize.height+padding} textAnchor='end' alignmentBaseline='central'>{label}</text>
                })}

                {dataSets.map(dataSet => {
                    let counterBars = -1
                    counterSet += 1
                    return (
                        <>
                            {dataSet.values.map(({ label, value, color }) => {
                                const x = value / max * 100
                                counterBars += 1
                                const width = chartSize.width / 100 * x
                                const height = (chartSize.height / dataSet.values.length - gap) / dataSets.length
                                const rectX = getChartPoint(0, 0).x 
                                const rectY = (1 / dataSets[0].values.length * counterBars) * chartSize.height + padding + (gap/2) + (counterSet * height)
                                return <StyledRect color={color || dataSet.color} key={label} width={width} height={height} x={rectX} y={rectY} />
                            })}
                        </>
                    )
                })}

            </StyledChart>
            <StyledChartTop height={padding} left={padding}>
                <h1>{title}</h1>
                {dataSets.map(dataSet => {
                    counterSetsName += 1
                    return <StyledDataSetName style={{ color: dataSet.color }} key={dataSet.name} fontSize={chartSize.width / 60} >{dataSet.name}</StyledDataSetName>
                })}
            </StyledChartTop>
        </StyledWrapper>
    )
}
