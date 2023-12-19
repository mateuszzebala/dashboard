import React from 'react'
import styled from 'styled-components'
import { Typography } from '../../../atoms/Typography'
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

export const JSONFieldInput = ({ field, onChange, value: val }) => {
    const [value, setValue] = React.useState(val ? JSON.stringify(val) : '')

    React.useEffect(() => {
        try {
            onChange(JSON.stringify(JSON.parse(value)))
        } catch {
            onChange(field.params.null ? null : '{}')
        }
    }, [value])

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {field.name.toUpperCase()}<br/>
                <StyledType>{field.type}</StyledType>
            </Typography>
            <Input textarea type="text" value={value} setValue={setValue} />
        </StyledField>
    )
}
