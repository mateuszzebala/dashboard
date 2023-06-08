import styled from 'styled-components'
import React from 'react'

const StyledTable = styled.table`
    border-collapse: collapse;
    display: table;
    max-width: 100%;
`

const StyledField = styled.td`
    padding: 8px 20px;
    border: 2px solid ${({ theme }) => theme.table.border};
`

const StyledRow = styled.tr`
    td {
        background-color: ${({ theme }) => theme.table.background};
        color: ${({ theme }) => theme.table.font};
    }
`

const StyledHeaderRow = styled.tr`
    td {
        color: ${({ theme }) => theme.table.background};
        background: ${({ theme }) => theme.table.font};
        text-align: center;
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
