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
import { FiEdit, FiTrash } from 'react-icons/fi'
import { FieldInline } from '../../organisms/database/FieldInline'
import { RelationInline } from '../../organisms/database/RelationInline'

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
    const modalForm = useModalForm()
    const navigate = useNavigate()
    const [itemData, setItemData] = React.useState()
    const [fields, setFields] = React.useState()
    const [relations, setRelations] = React.useState()
    const [modelData, setModelData] = React.useState()

    React.useEffect(() => {
        FETCH(ENDPOINTS.database.model(modelName)).then((data) => {
            setModelData(data.data)
            setRelations(
                Object.keys(data.data.fields).filter(
                    (field) =>
                        data.data.fields[field].relation.is &&
                        data.data.fields[field].relation.type !== 'one_to_many'
                )
            )
            setFields(
                Object.keys(data.data.fields).filter(
                    (field) => !data.data.fields[field].relation.is
                )
            )
        })
        FETCH(ENDPOINTS.database.item(modelName, pk)).then((data) => {
            setItemData(data.data)
        })
    }, [modelName, pk])

    return (
        <MainTemplate
            app={{
                ...APPS.database,
                link: LINKS.database.model(modelName),
            }}
            title={`${modelName.toUpperCase()} - ${pk}`}
            submenuChildren={
                <StyledButtons>
                   
                    <Button
                        second
                        onKey={{
                            key: 'Delete',
                        }}
                        size={1.3}
                        icon={<FiTrash />}
                        onClick={() => {
                            modalForm({
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
                    />
                    <Button
                        size={1.3}
                        onKey={{
                            key: 'e',
                            ctrlKey: true,
                            prevent: true,
                        }}
                        second
                        to={LINKS.database.patchItem(modelName, pk)}
                        icon={<FiEdit />}
                    />

                </StyledButtons>
            }
        >
            <StyledWrapper>
                <Table>
                    <HeaderRow>
                        <Field>FIELD NAME</Field>
                        <Field>VALUE</Field>
                        <Field>TYPE</Field>
                    </HeaderRow>
                    {fields &&
                        modelData &&
                        itemData &&
                        fields.map((fieldName) => (
                            <Row key={fieldName}>
                                <Field>{fieldName}</Field>
                                <Field>
                                    <StyledValue>
                                        <FieldInline
                                            type={
                                                modelData.fields[fieldName].type
                                            }
                                            value={itemData.fields[fieldName]}
                                        />
                                    </StyledValue>
                                </Field>
                                <Field>
                                    {modelData.fields[fieldName].type}
                                </Field>
                            </Row>
                        ))}
                    {relations &&
                        modelData &&
                        itemData &&
                        relations.map((fieldName) => (
                            <Row key={fieldName}>
                                <Field>{fieldName}</Field>
                                <Field>
                                    <StyledValue>
                                        <RelationInline
                                            type={
                                                modelData.fields[fieldName]
                                                    .relation.type
                                            }
                                            value={
                                                itemData.relations[fieldName]
                                            }
                                            model={
                                                modelData.fields[fieldName]
                                                    .relation.model
                                            }
                                        />
                                    </StyledValue>
                                </Field>
                                <Field>
                                    {modelData.fields[fieldName].type}
                                </Field>
                            </Row>
                        ))}
                </Table>
            </StyledWrapper>
        </MainTemplate>
    )
}
