import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { Button } from '../../atoms/Button'
import { useNavigate, useParams } from 'react-router'
import { ENDPOINTS } from '../../api/endpoints'
import { FETCH } from '../../api/api'
import { fieldToString } from '../../utils/utils'
import { Tooltip } from '../../atoms/Tooltip'
import { Field, HeaderRow, Row, Table } from '../../atoms/Table'
import { LINKS } from '../../router/links'
import { useModalForm } from '../../utils/hooks'
import { Confirm } from '../../atoms/modalforms/Confirm'
import { FiTrash } from 'react-icons/fi'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
`

const StyledValue = styled.span`
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
`

const StyledButtons = styled.div`
    display: flex;
    gap: 10px;
`

export const DatabaseItemPage = () => {
    const { modelName, pk } = useParams()
    const { ask } = useModalForm()
    const navigate = useNavigate()
    const [itemData, setItemData] = React.useState()
    const [modelData, setModelData] = React.useState()

    React.useEffect(() => {
        FETCH(ENDPOINTS.database.model(modelName)).then((data) => {
            setModelData(data.data)
        })
        FETCH(ENDPOINTS.database.item(modelName, pk)).then((data) => {
            setItemData(data.data)
        })
    }, [])

    return (
        <MainTemplate
            app={APPS.database}
            title={`${modelName} - ${pk}`}
            submenuChildren={
                <StyledButtons>
                    <Button
                        size={1}
                        second
                        to={LINKS.database.patchItem(modelName, pk)}
                    >
                        EDIT
                    </Button>

                    <Button
                        second
                        size={1}
                        onClick={() => {
                            ask({
                                content: Confirm,
                                icon: <FiTrash />,
                                title: 'DELETE ITEM?',
                                todo: () => {
                                    FETCH(
                                        ENDPOINTS.database.item(modelName, pk),
                                        { method: 'DELETE' }
                                    ).then(() => {
                                        navigate(
                                            LINKS.database.model(modelName)
                                        )
                                    })
                                },
                            })
                        }}
                    >
                        DELETE
                    </Button>
                </StyledButtons>
            }
        >
            <StyledWrapper>
                <Table>
                    <HeaderRow>
                        <Field>FIELD</Field>
                        <Field>VALUE</Field>
                    </HeaderRow>
                    {modelData &&
                        itemData &&
                        Object.keys(modelData.fields).map((fieldName) => (
                            <Row key={fieldName}>
                                <Field>{fieldName}</Field>
                                <Field>
                                    <Tooltip
                                        text={fieldToString(
                                            itemData.fields[fieldName],
                                            modelData.fields[fieldName].type
                                        )}
                                    >
                                        <StyledValue>
                                            {fieldToString(
                                                itemData.fields[fieldName],
                                                modelData.fields[fieldName].type
                                            )}
                                        </StyledValue>
                                    </Tooltip>
                                </Field>
                            </Row>
                        ))}
                </Table>
            </StyledWrapper>
        </MainTemplate>
    )
}
