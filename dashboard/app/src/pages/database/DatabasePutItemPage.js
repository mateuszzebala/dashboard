import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { useNavigate, useParams } from 'react-router'
import { APPS } from '../../apps/apps'
import { FieldInput } from '../../organisms/database/FieldInput'
import styled from 'styled-components'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { FloatingActionButton } from '../../atoms/FloatingActionButton'
import { LINKS } from '../../router/links'
import { LuSave } from 'react-icons/lu'
import { RelationInput } from '../../organisms/database/RelationInput'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-direction: column;
    align-items: center;

    gap: 10px;
    padding: 30px 10px;
`
export const DatabasePutItemPage = () => {
    const { modelName } = useParams()
    const navigate = useNavigate()
    const [fields, setFields] = React.useState([])
    const [relations, setRelations] = React.useState([])
    const [values, setValues] = React.useState({})

    const handleSave = () => {
        const nullable = Object.assign(
            {},
            ...fields.map(({ name, params }) => ({ [name]: params.null }))
        )
        console.log(values)
        const err = Object.keys(values).some(
            (field) => values[field] === null && !nullable[field]
        )
        console.log(err)
        !err &&
            FETCH(ENDPOINTS.database.create(modelName), values).then((data) => {
                navigate(LINKS.database.item(modelName, data.data.pk))
            })
        err && alert('error')
    }

    React.useEffect(() => {
        FETCH(ENDPOINTS.database.model(modelName)).then((data) => {
            setFields(
                Object.keys(data.data.fields).reduce((fieldsArray, key) => {
                    const field = data.data.fields[key]
                    if (field.relation.is || field.params.auto_created)
                        return fieldsArray
                    return [
                        ...fieldsArray,
                        {
                            name: key,
                            ...field,
                        },
                    ]
                }, [])
            )
            setRelations(
                Object.keys(data.data.fields).reduce((fieldsArray, key) => {
                    const field = data.data.fields[key]

                    if (
                        !field.relation.is ||
                        field.params.auto_created ||
                        field.relation.type === 'one_to_many'
                    )
                        return fieldsArray
                    return [
                        ...fieldsArray,
                        {
                            name: key,
                            ...field,
                        },
                    ]
                }, [])
            )
        })
    }, [])

    return (
        <MainTemplate
            app={APPS.database}
            topbarLink={LINKS.database.model(modelName)}
            title={modelName.toUpperCase()}
        >
            <StyledWrapper>
                {fields.map((field) => (
                    <FieldInput
                        key={field.name}
                        field={field}
                        onChange={(val) => {
                            setValues((prev) => ({
                                ...prev,
                                [field.name]: val,
                            }))
                        }}
                        value={values[field.name]}
                    />
                ))}
                {relations.map((relation) => (
                    <RelationInput
                        setValue={(val) => {
                            setValues((prev) => ({
                                ...prev,
                                [relation.name]: val,
                            }))
                        }}
                        value={values[relation.name]}
                        key={relation.name}
                        relation={relation}
                    />
                ))}
            </StyledWrapper>
            <FloatingActionButton
                icon={<LuSave />}
                onClick={handleSave}
                size={1.4}
            />
        </MainTemplate>
    )
}
