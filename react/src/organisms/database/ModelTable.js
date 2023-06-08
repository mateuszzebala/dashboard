import { Table, HeaderRow, Row, Field } from '../../atoms/Table'
import React from 'react'
import { Loading } from '../../atoms/Loading'
import { Tooltip } from '../../atoms/Tooltip'
import { fieldToString } from '../../utils/utils'
import styled from 'styled-components'

const StyledField = styled.td`
    border: 2px solid ${({ theme }) => theme.table.border};
    text-align: center;
    padding: 5px 10px;
    width: auto;
    display: table-cell;
    white-space: nowrap;
    max-width: 100px;
    transition: background-color 0.2s;
    tr:has(&):hover td {
        background-color: #00000011;
    }
    overflow: hidden;
    cursor: pointer;
    text-overflow: ellipsis;
`

export const ModelTable = ({ fields, data, modelData, handleRowClick }) => {
    return (
        <Table>
            <thead>
                <HeaderRow>
                    {fields &&
                        fields.map((field) => {
                            return <Field key={field}>{field}</Field>
                        })}
                </HeaderRow>
            </thead>
            <tbody>
                {!data || !modelData || !fields || !data.items ? (
                    <Loading size={2} />
                ) : (
                    data.items.map((item) => (
                        <Row
                            onClick={() => {
                                handleRowClick(item)
                            }}
                            key={item.pk}
                        >
                            {fields &&
                                fields.map((field) => {
                                    const content = fieldToString(
                                        item.fields[field],
                                        modelData.fields[field].type
                                    )
                                    return (
                                        <StyledField key={field}>
                                            <Tooltip text={content}>
                                                {content}
                                            </Tooltip>
                                        </StyledField>
                                    )
                                })}
                        </Row>
                    ))
                )}
            </tbody>
        </Table>
    )
}
