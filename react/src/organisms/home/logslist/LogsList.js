import React from 'react'
import styled from 'styled-components'
import { LogItem } from './LogItem'

const StyledWrapper = styled.div`
    box-shadow: 0 0 8px -5px black;
    padding: 10px;
    height: 100%;
    border-radius: 10px;
`

const StyledList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
    max-height: 100%;
    min-height: 100%;
    overflow: scroll;
    &::-webkit-scrollbar {
        width: 00;
    }
`

const tempLog = {
    ip: '54.128.79.20',
    datetime: { year: 2023, month: 5, day: 4, hour: 3, minute: 2, second: 2 },
    method: 'GET',
    path: '/account/',
    statusCode: 200,
    device: 'CHROME/5.0',
    protocol: 'HTTP/1.1',
}

export const LogsList = () => {
    const [logs, setLogs] = React.useState([
        tempLog,
        tempLog,
        tempLog,
        tempLog,
        tempLog,
        tempLog,
        tempLog,
        tempLog,
        tempLog,
        tempLog,
    ])

    const handleReload = () => {
        setLogs([])
    }

    return (
        <StyledWrapper>
            <StyledList onClick={handleReload}>
                {Object.keys(logs).map((index) => (
                    <LogItem key={index} {...logs[index]} />
                ))}
            </StyledList>
        </StyledWrapper>
    )
}
