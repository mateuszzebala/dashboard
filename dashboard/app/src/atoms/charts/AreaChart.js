import React from 'react'
import styled from 'styled-components'
import useResizeObserver from 'use-resize-observer'
import { useModalForm, useTheme } from '../../utils/hooks'
import { FaChartArea } from 'react-icons/fa'
import { ChartInfo } from './ChartInfo'
import { objectEquals } from '../../utils/utils'

const StyledWrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`

const StyledChart = styled.svg`
    width: 100%;
    height: 100%;
    text{
        font-family: var(--font-family);
    }
    line{
        stroke: ${({ theme }) => theme.quaternary};
        stroke-width: 2px;
    }
`

const StyledPolygon = styled.polygon`
    fill: ${({ color, theme }) => color || theme.primary};
    stroke: ${({ color, theme }) => color || theme.primary};
    stroke-opacity: 50%;
    fill-opacity: 50%;
    stroke-width: 5px;
    stroke-linejoin: round;
`

export const AreaChart = ({ title, dataSets = [], padding = 60 }) => {
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

    dataSets.forEach(dataSet => {
        dataSet.values.forEach(point => !distinctPointsY.some(p => point.y == p.y) && distinctPointsY.push(point))
    })

    dataSets.forEach(dataSet => {
        dataSet.values.forEach(point => !distinctPointsX.some(p => point.label == p.label) && distinctPointsX.push(point))
    })

    let counterLabels = -1

    return (
        <StyledWrapper ref={ref}>
            <StyledChart onDoubleClick={() => {
                modalForm({
                    content: ChartInfo,
                    title: 'CHART INFO',
                    data: dataSets,
                    icon: <FaChartArea />,
                    todo: () => { },
                })
            }} viewBox={`0 0 ${svgSize.width} ${svgSize.height}`} ref={svgRef}>
                <text x={svgSize.width / 2} y={padding / 2} textAnchor={'middle'} alignmentBaseline={'central'} fontSize={20} fontWeight={'bold'}>{title}</text>
                {distinctPointsY.map(({ x, y, label, value }) => (
                    <>
                        <line x1={getChartPoint(0, y).x} y1={getChartPoint(x, y).y} x2={getChartPoint(100, y).x} y2={getChartPoint(x, y).y} />
                        <text x={padding - 10} y={getChartPoint(0, y).y} textAnchor='end' alignmentBaseline='central'>{value}</text>
                    </>
                ))}

                {distinctPointsX.map(({ y, label, value }) => {
                    counterLabels += 1
                    const x = 100 / (dataSets[0].values.length - 1) * counterLabels
                    return <>
                        <line x1={getChartPoint(x, y).x} y1={getChartPoint(x, 0).y} x2={getChartPoint(x, y).x} y2={getChartPoint(x, 100).y} />
                        <text x={getChartPoint(x, 0).x} y={svgSize.height - padding + 10} textAnchor='middle' alignmentBaseline='hanging'>{label}</text>
                    </>
                })}
                
                {dataSets.map(dataSet => {
                    let counterXs = -1
                    return <StyledPolygon key={dataSet.name} color={dataSet.color} points={`${getChartPoint(0, 0).x},${getChartPoint(0, 0).y} ` + dataSet.values.map(point => {
                        counterXs += 1
                        const x = getChartPoint(100 / (dataSets[0].values.length - 1) * counterXs, 0).x
                        return `${x},${getChartPoint(0, point.y).y}`
                    }).join(' ') + ` ${getChartPoint(100, 0).x},${getChartPoint(100, 0).y}`} />
                })}

            </StyledChart>
        </StyledWrapper>
    )
}
