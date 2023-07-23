import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { useParams } from 'react-router'
import { APPS } from '../../apps/apps'
import { FieldInput } from '../../organisms/database/FieldInput'
import styled from 'styled-components'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { FloatingActionButton } from '../../atoms/FloatingActionButton'
import { links } from '../../router/links'
import { FaRegSave } from 'react-icons/fa'

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
    // const navigate = useNavigate()
    const [fields, setFields] = React.useState([])
    const [values, setValues] = React.useState({})

    const handleSave = () => {
        const nullable = Object.assign(
            {},
            ...fields.map(({ name, params }) => ({ [name]: params.null }))
        )
        console.log(nullable)
        const err = Object.keys(values).some(
            (field) => values[field] === null && !nullable[field]
        )
        console.log(err)
        // FETCH(ENDPOINTS.database.create(modelName), values).then((data) => {
        //     navigate(links.database.item(modelName, data.data.pk))
        // })
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
            <FloatingActionButton onClick={handleSave} size={1}>
                <FaRegSave /> SAVE
            </FloatingActionButton>
        </MainTemplate>
    )
}
