import React from 'react'
import { SelectItem } from '../database/SelectItem'
import styled from 'styled-components'
import { Typography } from '../../atoms/Typography'
import { toBoolStr } from '../../utils/utils'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { useParams } from 'react-router'

const StyledField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

const StyledType = styled.span`
    font-weight: 300;
`

const StyledWrapper = styled.div`
    padding: 10px;


`

const ManyToManyInput = ({ value, setValue, fieldName, modelName }) => {
    const [tempValue, setTempValue] = React.useState(value || [])

    React.useEffect(() => {
        setValue(tempValue.map((item) => item.pk ? item.pk : item))
    }, [tempValue])

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {fieldName.toUpperCase()} -{' '}
                <StyledType>Many To Many</StyledType>
            </Typography>
            <SelectItem
                value={tempValue}
                setValue={setTempValue}
                multiple
                modelName={modelName}
                fieldName={fieldName}
            />
        </StyledField>
    )
}

const ManyToOneInput = ({ value, setValue, fieldName, modelName }) => {
    const [tempValue, setTempValue] = React.useState(value)

    React.useEffect(()=>{
        if(value != undefined){
            FETCH(ENDPOINTS.database.relation_value(modelName, fieldName, value)).then(data => {
                setTempValue(data.data.value)
            })
        }
    }, [])

    React.useEffect(() => {
        setValue(tempValue ? tempValue.pk : null)
    }, [tempValue])

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {fieldName.toUpperCase()} -{' '}
                <StyledType>Many To One</StyledType>
            </Typography>
            <SelectItem
                value={tempValue}
                setValue={setTempValue}
                modelName={modelName}
                fieldName={fieldName}
            />
        </StyledField>
    )
}

const OneToOneInput = ({ value, setValue, fieldName, modelName }) => {
    const [tempValue, setTempValue] = React.useState(value)

    React.useEffect(()=>{
        if(value != undefined){
            FETCH(ENDPOINTS.database.relation_value(modelName, fieldName, value)).then(data => {
                setTempValue(data.data.value)
            })
        }
    }, [])

    React.useEffect(() => {
        
        setValue(tempValue ? tempValue.pk : null)
    }, [tempValue])

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {fieldName.toUpperCase()} -{' '}
                <StyledType>One To One</StyledType>
            </Typography>
            <SelectItem
                value={tempValue}
                setValue={setTempValue}
                modelName={modelName}
                fieldName={fieldName}
            />
        </StyledField>
    )
}

const RelationInputs = {
    many_to_many: ManyToManyInput,
    many_to_one: ManyToOneInput,
    one_to_one: OneToOneInput,
}

export const RelationInput = ({ type, fieldName, modelName, ...props }) => {
    const Input = RelationInputs[type]
    return (
        <StyledWrapper>
            <Input {...props} fieldName={fieldName} modelName={modelName}/>
        </StyledWrapper>
    )
}
