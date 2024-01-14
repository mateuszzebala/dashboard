import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { useNavigate, useParams } from 'react-router'
import { APPS } from '../../apps/apps'
import { FieldInput } from '../../organisms/database/FieldInput'
import styled from 'styled-components'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { FloatingActionButton, Theme } from '../../atoms'
import { LINKS } from '../../router/links'
import { RelationInput } from '../../organisms/database/RelationInput'
import { FiSave } from 'react-icons/fi'
import { useTheme } from '../../utils/hooks'

const StyledError = styled.span`
    color: ${({theme})=>theme.error};
    font-weight: bold;
`

const StyledField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;
    width: 100%;
    background-color: ${({theme})=>theme.primary}11;
    border-radius: 5px;
`
const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 20px;
    padding: 30px 10px;
`

export const DatabasePatchItemPage = () => {
    const { modelName, pk } = useParams()
    const navigate = useNavigate()
    const [fields, setFields] = React.useState([])
    const [relations, setRelations] = React.useState([])
    const [values, setValues] = React.useState({})
    const [initValues, setInitValues] = React.useState({})
    const [nullableErrors, setNullableErrors] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)
    const [saving, setSaving] = React.useState(false)
    const [saved, setSaved] = React.useState(true)
    const [theme] = useTheme()

    const handleSave = () => {
        setSaving(true)
        const nullable = Object.assign(
            {},
            ...fields.map(({ name, params }) => ({ [name]: params.null })),
            ...relations.map(({ name, params }) => ({ [name]: params.null })),
        )
        const nullableErrorFields = Object.keys(values).filter(
            (field) => values[field] === null && !nullable[field]
        )
        setNullableErrors(nullableErrorFields)
        console.log(nullableErrorFields)
        nullableErrorFields.length === 0 &&
            FETCH(ENDPOINTS.database.edit(modelName, pk), values).then((data) => {
                navigate(LINKS.database.item(modelName, data.data.pk))
                setSaving(false)

            })
        nullableErrorFields.length > 0 && setSaving(false)

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
                }, []).filter(field => field.params.editable)
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
                }, []).filter(field => field.params.editable)
            )
            FETCH(ENDPOINTS.database.item(modelName, pk)).then(data => {
                setValues({...data.data.fields, ...data.data.relations})
                setInitValues({...data.data.fields, ...data.data.relations})
                setLoaded(true)
            })
        })
    }, [modelName, pk])

    return (
        <MainTemplate
            app={APPS.database}
            topbarLink={LINKS.database.model(modelName)}
            title={modelName.toUpperCase()}
            submenuChildren={<>
                <Theme value={{...theme, primary: saved ? theme.success : theme.error}}>
                    <FloatingActionButton
                        icon={<FiSave />}
                        onClick={handleSave}
                        size={1.4}
                        loading={saving}
                    />
                </Theme>
            </>}
        >
            <StyledWrapper>
                {loaded && relations.map((relation) => (
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
                            thisModel={relation.relation.model}
                            fieldName={relation.name}
                            type={relation.relation.type}
                            parentPK={pk}
                        />
                        {nullableErrors.includes(relation.name) && <StyledError>This field can not be null!</StyledError>}
                    </StyledField>
                ))}
                {loaded && fields.map((field) => (
                    <StyledField key={field.name}>
                        <FieldInput
                            key={field.name}
                            field={field}
                            value={initValues[field.name]}
                            nullError={nullableErrors.includes(field.name)}
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
       
        </MainTemplate>
    )
}
