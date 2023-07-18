import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { useNavigate, useParams } from 'react-router'
import { APPS } from '../../apps/apps'
import { FieldInput } from '../../organisms/database/FieldInput'
import styled from 'styled-components'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { Button } from '../../atoms/Button'
import { links } from '../../router/links'

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
    const [values, setValues] = React.useState({})

    const handleSave = () => {
        FETCH(ENDPOINTS.database.create(modelName), values).then((data) => {
            navigate(links.database.item(modelName, data.data.pk))
        })
    }

    React.useEffect(() => {
        FETCH(ENDPOINTS.database.model(modelName)).then((data) => {
            const allFields = data.data.fields
            const newFields = []
            Object.keys(allFields).forEach((fieldName) => {
                const fieldData = allFields[fieldName]

                !fieldData.relation.is &&
                    !fieldData.params.auto_created &&
                    newFields.push({
                        name: fieldName,
                        type: fieldData.type,
                        params: fieldData.params,
                    })
            })
            setFields(newFields)
        })
    }, [])

    return (
        <MainTemplate
            app={APPS.database}
            topbarLink={links.database.model(modelName)}
            title={`NEW ${modelName.toUpperCase()}`}
            submenuChildren={
                <>
                    <Button second onClick={handleSave} size={0.9}>
                        SAVE
                    </Button>
                </>
            }
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
            </StyledWrapper>
        </MainTemplate>
    )
}
