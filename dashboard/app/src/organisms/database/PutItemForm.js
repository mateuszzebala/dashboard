import React from 'react'
import styled from 'styled-components'
import { FieldInput } from './FieldInput'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { Button } from '../../atoms/Button'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const PutItemForm = ({ modelName }) => {
    const [fields, setFields] = React.useState([])
    const [values, setValues] = React.useState({})

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
            <Button
                onClick={() => {
                    console.log(values)
                }}
            >
                SAVE
            </Button>
        </StyledWrapper>
    )
}
