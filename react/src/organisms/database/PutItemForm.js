import React from 'react'
import styled from 'styled-components'
import { FieldInput } from './FieldInput'
import { FETCH } from '../../api/api'
import { endpoints } from '../../api/endpoints'
import { Button } from '../../atoms/Button'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
`

export const PutItemForm = ({ modelName }) => {
    const [fields, setFields] = React.useState([])

    React.useEffect(() => {
        FETCH(endpoints.database.model(modelName)).then((data) => {
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
                <FieldInput key={field.name} field={field} />
            ))}
            <Button>SAVE</Button>
        </StyledWrapper>
    )
}
