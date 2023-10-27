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

export const CharFieldInput = ({ field, onChange, value }) => {
    const [val, setVal] = React.useState(value || '')

    React.useEffect(() => {
        val && onChange(val)
        !val && onChange(null)
    }, [val])

    if (field.params.choices) {
        return (
            <StyledField>
                <Typography variant={'h3'}>
                    {field.name.toUpperCase()} -{' '}
                    <StyledType>{field.type}</StyledType>
                </Typography>
                <Select
                    data={field.params.choices}
                    value={val}
                    setValue={setVal}
                />
            </StyledField>
        )
    } else {
        return (
            <StyledField>
                <Typography variant={'h3'}>
                    {field.name.toUpperCase()} -{' '}
                    <StyledType>{field.type}</StyledType>
                </Typography>
                <Input
                    maxLength={field.params.max_length}
                    value={value || ''}
                    setValue={setVal}
                />
            </StyledField>
        )
    }
}
