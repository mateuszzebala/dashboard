import styled from 'styled-components'
import React from 'react'

const StyledTable = styled.table`
    border-collapse: collapse;
    display: table;
    max-width: 100%;
    width: 100%;
    font-size: 17px;
`

const StyledField = styled.td`
    padding: 15px 20px;
    border: 1px solid ${({ theme }) => theme.primary};
`

const StyledRow = styled.tr`
    td {
        background-color: ${({ theme }) => theme.secondary};
        color: ${({ theme }) => theme.primary};
    }
`

const StyledHeaderRow = styled.tr`
    td {
        color: ${({ theme }) => theme.secondary};
        background: ${({ theme }) => theme.primary};
        text-align: center;
        padding: 20px;
    }
`

export const Table = ({ children, ...props }) => {
    return <StyledTable {...props}>{children}</StyledTable>
}

export const Row = ({ children, ...props }) => {
    return <StyledRow {...props}>{children}</StyledRow>
}

export const HeaderRow = ({ children, ...props }) => {
    return <StyledHeaderRow {...props}>{children}</StyledHeaderRow>
}

export const Field = ({ children, ...props }) => {
    return <StyledField {...props}>{children}</StyledField>
}
