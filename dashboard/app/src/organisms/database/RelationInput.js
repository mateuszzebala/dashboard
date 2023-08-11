import React from 'react'
import { SelectItem } from '../database/SelectItem'
import styled from 'styled-components'
import { Typography } from '../../atoms/Typography'

const StyledField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
`

const StyledType = styled.span`
    font-weight: 300;
`

const ManyToManyInput = ({ relation, value, setValue }) => {
    const [tempValue, setTempValue] = React.useState(value || [])
    React.useEffect(() => {
        setValue(tempValue.map((item) => item.pk))
    }, [tempValue])

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {relation.name.toUpperCase()} -{' '}
                <StyledType>Many To Many</StyledType>
            </Typography>
            <SelectItem
                value={tempValue}
                setValue={setTempValue}
                multiple
                modelName={relation.relation.model}
            />
        </StyledField>
    )
}

const ManyToOneInput = ({ relation, value, setValue }) => {
    const [tempValue, setTempValue] = React.useState(value)
    React.useEffect(() => {
        setValue(tempValue || null)
    }, [tempValue])

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {relation.name.toUpperCase()} -{' '}
                <StyledType>Many To One</StyledType>
            </Typography>
            <SelectItem
                value={tempValue}
                setValue={setTempValue}
                modelName={relation.relation.model}
            />
        </StyledField>
    )
}

const OneToOneInput = ({ relation, value, setValue }) => {
    const [tempValue, setTempValue] = React.useState(value)
    React.useEffect(() => {
        setValue(tempValue ? tempValue.pk : null)
    }, [tempValue])

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {relation.name.toUpperCase()} -{' '}
                <StyledType>One To One</StyledType>
            </Typography>
            <SelectItem
                value={tempValue}
                setValue={setTempValue}
                modelName={relation.relation.model}
            />
        </StyledField>
    )
}

const RelationInputs = {
    many_to_many: ManyToManyInput,
    many_to_one: ManyToOneInput,
    one_to_one: OneToOneInput,
}

export const RelationInput = ({ relation, ...props }) => {
    const Input = RelationInputs[relation.relation.type]
    return <Input {...props} relation={relation} />
}
