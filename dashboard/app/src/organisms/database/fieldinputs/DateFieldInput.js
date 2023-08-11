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

export const DateFieldInput = ({ field, onChange }) => {
    const [value, setValue] = React.useState('')

    React.useEffect(() => {
        if (value) {
            const [year, month, day] = value.split('-')
            onChange(
                JSON.stringify({
                    year: parseInt(year),
                    month: parseInt(month),
                    day: parseInt(day),
                })
            )
        } else onChange(null)
    }, [value])

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {field.name.toUpperCase()} -{' '}
                <StyledType>{field.type}</StyledType>
            </Typography>
            <Input type="date" value={value} setValue={setValue} />
        </StyledField>
    )
}
