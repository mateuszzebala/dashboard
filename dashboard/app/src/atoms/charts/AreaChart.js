import React from 'react'
import styled from 'styled-components'
import useResizeObserver from 'use-resize-observer'
import { useModalForm, useTheme } from '../../utils/hooks'
import { FaChartArea } from 'react-icons/fa'
import { ChartInfo } from './ChartInfo'
import { objectEquals } from '../../utils/utils'

const StyledWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
  border-radius: 10px;
`

const StyledChart = styled.svg`
  width: 100%;
  height: 100%;
  cursor: pointer;

  text {
    font-family: var(--font-family);
    fill: ${({theme})=> theme.primary};
  }

  line {
    stroke: ${({ theme }) => theme.quaternary}88;
    stroke-width: 2px;
  }
`

const StyledPolygon = styled.polygon`
  fill: ${({ color, theme }) => color || theme.primary};
  stroke: ${({ color, theme }) => color || theme.primary};
  stroke-opacity: 50%;
  fill-opacity: 30%;
  transition: fill-opacity 0.3s;
  &:hover{
    fill-opacity: 60%;
  }
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


export const AreaChart = ({ title, dataSets = [], max=100, padding = 60, values=null, getValue=(val)=>val, setValue=(val)=>val}) => {
    const svgRef = React.useRef()
    const [svgSize, setSvgSize] = React.useState({ width: 0, height: 0 })
    const [chartSize, setChartSize] = React.useState({ width: 0, height: 0 })
    const modalForm = useModalForm()

    const { ref } = useResizeObserver({
        onResize: ({ width, height }) => {
            setSvgSize({ width, height })
            setChartSize({ width: width - padding * 2, height: height - padding * 2 })
        },
    })

    const getChartPoint = (xPer, yPer) => ({
        x: Math.round(xPer * 0.01 * chartSize.width + padding),
        y: Math.round((yPer - 100) * (-1) * 0.01 * chartSize.height + padding),
    })

    const distinctPointsX = []
    const distinctPointsY = []

    if (values) {
        values.forEach(value => distinctPointsY.push({ value: value, y: value }))
    } else {
        dataSets.forEach(dataSet => {
            dataSet.values.forEach(point => !distinctPointsY.some(p => point.y == p.y) && distinctPointsY.push(point))
        })
    }

    dataSets.forEach(dataSet => {
        dataSet.values.forEach(point => !distinctPointsX.some(p => point.label == p.label) && distinctPointsX.push(point))
    })

    let counterLabels = -1
    let counterSetsName = -1

    return (
        <StyledWrapper ref={ref}>
            <StyledChart onDoubleClick={() => {
                modalForm({
                    content: ChartInfo,
                    title: title || 'CHART INFO',
                    data: dataSets,
                    icon: <FaChartArea />,
                    todo: () => {
                    },
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
                    const x = 100 / (dataSets[0].values.length - 1) * counterLabels
                    return <>
                        <line x1={getChartPoint(x, 0).x} y1={getChartPoint(x, 0).y} x2={getChartPoint(x, 0).x}  y2={getChartPoint(x, 100).y} />
                        <text fontSize={chartSize.width / 80} x={getChartPoint(x, 0).x} y={svgSize.height - padding + 10} textAnchor='middle' alignmentBaseline='hanging'>{label}</text>
                    </>
                })}

                {dataSets.map(dataSet => {
                    let counterXs = -1
                    return <StyledPolygon key={dataSet.name} color={dataSet.color}
                        points={`${getChartPoint(0, 0).x},${getChartPoint(0, 0).y} ` + dataSet.values.map(({value}) => {
                            counterXs += 1
                            const y = setValue(value) / max * 100
                            const x = getChartPoint(100 / (dataSets[0].values.length - 1) * counterXs, 0).x
                            return `${x},${getChartPoint(0, y).y}`
                        }).join(' ') + ` ${getChartPoint(100, 0).x},${getChartPoint(100, 0).y}`} />
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
