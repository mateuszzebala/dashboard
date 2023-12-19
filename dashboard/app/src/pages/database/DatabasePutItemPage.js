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
import { FiSave } from 'react-icons/fi'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 20px;
    padding: 30px 10px;
`

const StyledField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    width: 100%;
    background-color: ${({theme})=>theme.primary}11;
    border-radius: 5px;
`

const StyledError = styled.span`
    color: ${({theme})=>theme.error};
    font-weight: bold;
`

export const DatabasePutItemPage = () => {
    const { modelName } = useParams()
    const navigate = useNavigate()
    const [fields, setFields] = React.useState([])
    const [relations, setRelations] = React.useState([])
    const [values, setValues] = React.useState({})
    const [nullableErrors, setNullableErrors] = React.useState([])

    const handleSave = () => {
        const nullable = Object.assign(
            {},
            ...fields.map(({ name, params }) => {
                return ({ [name]: params.null })
            })
        )

        const nullableErrorFields = Object.keys(values).filter(
            (field) => values[field] == null && !nullable[field]
        )

        setNullableErrors(nullableErrorFields)
        nullableErrorFields.length === 0 &&
            FETCH(ENDPOINTS.database.create(modelName), values).then((data) => {
                navigate(LINKS.database.item(modelName, data.data.pk))
            })

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
                {relations.map((relation) => (
                    <StyledField key={relation.name}>
                        <RelationInput
                            setValue={(val) => {
                                setValues((prev) => ({
                                    ...prev,
                                    [relation.name]: val,
                                }))
                            }}
                            value={values[relation.name]}
                            key={relation.name}
                            modelName={modelName}
                            fieldName={relation.name}
                            type={relation.relation.type}
                        />
                        {nullableErrors.includes(relation.name) && <StyledError>This field can not be null!</StyledError>}
                    </StyledField>
                ))}
                {fields.map((field) =>  (
                    <StyledField key={field.name}>
                        <FieldInput
                            key={field.name}
                            field={field}
                            nullError={nullableErrors.includes(field.name)}
                            value={values[field.name]}
                            onChange={(val) => {
                                setValues((prev) => ({
                                    ...prev,
                                    [field.name]: val,
                                }))
                            }}
                        />
                        {nullableErrors.includes(field.name) && <StyledError>This field can not be null!</StyledError>}
                    </StyledField>
                ))}
            
            </StyledWrapper>
            <FloatingActionButton
                icon={<FiSave />}
                onClick={handleSave}
                size={1.4}
            />
        </MainTemplate>
    )
}
