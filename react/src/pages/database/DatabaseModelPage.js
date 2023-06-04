import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { useParams } from 'react-router'
import { FETCH } from '../../api/api'
import { endpoints } from '../../api/endpoints'
import { Table, Field, HeaderRow, Row } from '../../atoms/Table'
import styled from 'styled-components'
import { Loading } from '../../atoms/Loading'
import { Tooltip } from '../../atoms/Tooltip'

const StyledWrapper = styled.div`
    max-width: 100%;

    overflow-x: scroll;
    padding: 30px 0;
    display: flex;
    align-items: flex-start;
    &::-webkit-scrollbar {
        height: 0;
    }
`

export const DatabaseModelPage = () => {
    const { modelName } = useParams()
    const [page] = React.useState(0)
    const [length] = React.useState(30)
    const [orderBy] = React.useState(null)
    const [asc] = React.useState(true)
    const [modelData, setModelData] = React.useState(false)
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        FETCH(endpoints.database.model(modelName)).then((data) => {
            setModelData(data.data)
        })
        FETCH(
            endpoints.database.items(modelName, {
                page,
                length,
                order_by: orderBy,
                asc,
            })
        ).then((data) => {
            setData(data.data)
        })
    }, [])

    return !modelData ? (
        ''
    ) : (
        <MainTemplate title={'DATABASE'}>
            <StyledWrapper>
                <Table>
                    <HeaderRow>
                        {Object.keys(modelData.fields)
                            .filter(
                                (field) => !modelData.fields[field].relation.is
                            )
                            .map((field) => {
                                return <Field key={field}>{field}</Field>
                            })}
                    </HeaderRow>
                    {data ? (
                        data.items.map((item) => (
                            <Row key={item.pk}>
                                {Object.keys(item.fields).map((field) => (
                                    <Field key={item.fields[field]}>
                                        <Tooltip
                                            text={item.fields[field].toString()}
                                        >
                                            {item.fields[field].toString()}
                                        </Tooltip>
                                    </Field>
                                ))}
                            </Row>
                        ))
                    ) : (
                        <Loading size={3} />
                    )}
                </Table>
            </StyledWrapper>
        </MainTemplate>
    )
}
