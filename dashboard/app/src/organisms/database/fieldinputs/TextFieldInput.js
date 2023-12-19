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

export const TextFieldInput = ({ field, onChange, value }) => {
    const [val, setVal] = React.useState(value || '')

    React.useEffect(() => {
        onChange(val)
    }, [val])

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {field.name.toUpperCase()}<br/>
                <StyledType>{field.type}</StyledType>
            </Typography>
            <Input textarea value={val} setValue={setVal} />
        </StyledField>
    )
}
