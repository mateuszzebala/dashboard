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

export const TimeFieldInput = ({ field, onChange }) => {
    const [value, setValue] = React.useState('')

    React.useEffect(() => {
        if (value) {
            const [hours, minutes, seconds] = value.split(':')
            onChange(
                JSON.stringify({
                    hours: parseInt(hours),
                    minutes: parseInt(minutes),
                    seconds: parseInt(seconds),
                })
            )
        } else onChange(null)
    }, [value])

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {field.name} - <StyledType>{field.type}</StyledType>
            </Typography>
            <Input step={1} type="time" value={value} setValue={setValue} />
        </StyledField>
    )
}
