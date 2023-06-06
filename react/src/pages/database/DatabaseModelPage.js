import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { useNavigate, useParams } from 'react-router'
import { FETCH } from '../../api/api'
import { endpoints } from '../../api/endpoints'
import { Table, Field, HeaderRow, Row } from '../../atoms/Table'
import styled from 'styled-components'
import { Tooltip } from '../../atoms/Tooltip'
import { fieldToString } from '../../utils/utils'
import { Loading } from '../../atoms/Loading'
import { links } from '../../router/links'

const StyledWrapper = styled.div`
    max-width: 100%;

    overflow-x: scroll;
    padding: 30px 0;
    display: flex;
    align-items: flex-start;
    &::-webkit-scrollbar {
        height: 0;
    }
    table {
        width: 100%;
    }
`
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

export const DatabaseModelPage = () => {
    const { modelName } = useParams()
    const [page] = React.useState(0)
    const [length] = React.useState(30)
    const [orderBy] = React.useState(null)
    const [asc] = React.useState(true)
    const [modelData, setModelData] = React.useState(false)
    const [data, setData] = React.useState([])
    const [fields, setFields] = React.useState([])
    const navigate = useNavigate()

    const handleRowClick = (item) => {
        navigate(links.database.item(modelName, item.pk))
    }

    React.useEffect(() => {
        FETCH(endpoints.database.model(modelName)).then((res) => {
            const resModelData = res.data
            setModelData(resModelData)
            setFields(
                Object.keys(res.data.fields)
                    .filter((field) => !resModelData.fields[field].relation.is)
                    .filter((field) => !resModelData.fields[field].registered)
            )
        })
        FETCH(
            endpoints.database.items(modelName, {
                page,
                length,
                order_by: orderBy,
                asc,
            })
        ).then((res) => {
            setData(res.data)
        })
    }, [])

    return !modelData ? (
        ''
    ) : (
        <MainTemplate title={'DATABASE'}>
            <StyledWrapper>
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
                        {!data || !modelData ? (
                            <Loading size={3} />
                        ) : (
                            data.items.map((item) => (
                                <Row
                                    onClick={() => {
                                        handleRowClick(item)
                                    }}
                                    key={item.pk}
                                >
                                    {fields.map((field) => {
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
            </StyledWrapper>
        </MainTemplate>
    )
}
