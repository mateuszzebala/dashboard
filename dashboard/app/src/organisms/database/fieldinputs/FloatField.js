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

export const FloatFieldInput = ({ field, onChange }) => {
    const [value, setValue] = React.useState('')

    React.useEffect(() => {
        onChange(value)
    }, [value])

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {field.name} - <StyledType>{field.type}</StyledType>
            </Typography>
            <Input
                step={0.00001}
                type={'number'}
                value={value}
                setValue={setValue}
            />
        </StyledField>
    )
}
