import React from 'react'
import styled from 'styled-components'
import { Typography } from '../../../atoms/Typography'
import { Select } from '../../../atoms/Select'
import { Input } from '../../../atoms/Input'

const StyledField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    text-transform: capitalize;
`
const StyledType = styled.span`
    font-weight: 300;
`

export const CharFieldInput = ({ field, onChange }) => {
    const [value, setValue] = React.useState('')

    React.useEffect(() => {
        onChange(value)
    }, [value])

    if (field.params.choices) {
        return (
            <StyledField>
                <Typography variant={'h3'}>
                    {field.name} - <StyledType>{field.type}</StyledType>
                </Typography>
                <Select
                    data={field.params.choices}
                    value={value}
                    setValue={setValue}
                />
            </StyledField>
        )
    } else {
        return (
            <StyledField>
                <Typography variant={'h3'}>
                    {field.name} - <StyledType>{field.type}</StyledType>
                </Typography>
                <Input
                    maxLength={field.params.max_length}
                    value={value}
                    setValue={setValue}
                />
            </StyledField>
        )
    }
}
