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


export const ColumnChart = ({ title, dataSets = [], max=100, padding = 60, gap = 10, values=null, getValue=(val)=>val, setValue=(val)=>val}) => {
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
        values.forEach(value => distinctPointsY.push({value}))
    }
    else{
        dataSets.forEach(dataSet => {
            dataSet.values.forEach(point => !distinctPointsY.some(p => point.y == p.y) && distinctPointsY.push(point))
        })
    }

    dataSets.forEach(dataSet => {
        dataSet.values.forEach(point => !distinctPointsX.some(p => point.label == p.label) && distinctPointsX.push(point))
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

                {distinctPointsY.map(({ value }) => {
                    const y = value / max * 100
                    return (
                        <>
                            <line x1={getChartPoint(0, y).x} y1={getChartPoint(0, y).y} x2={getChartPoint(100, y).x} y2={getChartPoint(0, y).y} />
                            <text fontSize={chartSize.width / 80} x={padding - 10} y={getChartPoint(0, y).y} textAnchor='end' alignmentBaseline='central'>{getValue(value)}</text>
                        </>
                    )
                })}
                {distinctPointsX.map(({ label }) => {
                    counterLabels += 1
                    return <text fontSize={chartSize.width / 80} key={label} x={getChartPoint(100 / dataSets[0].values.length * counterLabels + 50 / dataSets[0].values.length, 0).x} y={svgSize.height - padding + 10} textAnchor='middle' alignmentBaseline='hanging'>{label}</text>
                })}
                {dataSets.map(dataSet => {
                    let counterBars = -1
                    counterSet += 1
                    return (
                        <>
                            {dataSet.values.map(({ label, value, color }) => {
                                const y1 = Math.abs(value) / max * 100
                                const y2 = setValue(value) / max * 100
                                counterBars += 1
                                const width = (chartSize.width / dataSet.values.length - gap) / dataSets.length
                                const height = chartSize.height / 100 * y1
                                const rectX = getChartPoint(100 / dataSets[0].values.length * counterBars, 0).x + (gap/2) + (counterSet * width)
                                const rectY = value < 0 ? getChartPoint(0, y2).y - height : getChartPoint(0, y2).y
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
