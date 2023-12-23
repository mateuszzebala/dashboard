import React from 'react'
import { Table, Row, Field, HeaderRow, Theme } from '..'
import styled from 'styled-components'
import { useTheme } from '../../utils/hooks'

const StyledWrapper = styled.div`
    max-height: 80vh;
    overflow: auto;
    padding: 20px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    table{
        min-width: 300px;
    }
`

export const ChartInfo = ({ data, title }) => {
    const [theme] =useTheme()
    return (
        <StyledWrapper>
            {data.map(dataSet => (
                <Table key={dataSet.title}>
                    <Theme value={{...theme, primary: dataSet.color + 'AA'}}>
                        <HeaderRow>
                            <Field colSpan={2}>{dataSet.name ? dataSet.name.toUpperCase() : title.toUpperCase()}</Field>
                        </HeaderRow>
                    </Theme>
                    {dataSet.values.map(({ label, value }) => <>
                        <Row>
                            <Field>{label}</Field>
                            <Field>{value}</Field>
                        </Row>
                    </>)}
                </Table>
            ))}
        </StyledWrapper>
    )
}