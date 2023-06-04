import React from 'react'
import styled from 'styled-components'
import { datetimeToString } from '../../../utils/utils'

const StyledLogItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 5px 5px 5px 10px;
    border-left: 3px solid ${({ theme }) => theme.primary};
    cursor: pointer;
`
const StyledRow = styled.div`
    display: flex;
    gap: 10px;
    font-size: 18px;
    flex-wrap: wrap;
`

const StyledBold = styled.span`
    font-weight: bold;
`

const StyledStatusCode = styled.span`
    font-weight: bold;
    color: ${({ statusCode, theme }) => {
        if (statusCode.toString().startsWith('2')) return theme.success
        if (statusCode.toString().startsWith('3')) return theme.warning
        if (statusCode.toString().startsWith('4')) return theme.warning
        if (statusCode.toString().startsWith('5')) return theme.error
    }};
`

export const LogItem = ({
    ip,
    datetime,
    method,
    path,
    statusCode,
    device,
    protocol,
}) => {
    return (
        <StyledLogItem>
            <StyledRow>
                <span>{ip}</span>
                <span>{datetimeToString(datetime)}</span>
            </StyledRow>
            <StyledRow>
                <StyledBold>{method}</StyledBold>
                <span>{path}</span>
                <StyledStatusCode statusCode={statusCode}>
                    {statusCode}
                </StyledStatusCode>
                <span>{device}</span>
                <span>{protocol}</span>
            </StyledRow>
        </StyledLogItem>
    )
}
