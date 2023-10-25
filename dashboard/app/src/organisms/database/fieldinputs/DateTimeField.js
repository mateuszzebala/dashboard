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

export const DateTimeFieldInput = ({ field, onChange, value: val }) => {
    const [value, setValue] = React.useState(val || '')

    React.useEffect(() => {
        if(value.year){
            const { year, month, day, hour, minute, second } = value
            const datetime = new Date(year, month, day, hour, minute, second)
            setValue(datetime.toISOString().split('.')[0] || '')
            onChange(JSON.stringify({year, month, day, hour, minute, second}))
        }
        else if (value) {
            const [date, time] = value.split('T')
            const [hours, minutes, seconds] = time.split(':')
            const [year, month, day] = date.split('-')
            onChange(
                JSON.stringify({
                    hours: parseInt(hours),
                    minutes: parseInt(minutes),
                    seconds: parseInt(seconds),
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
            <Input
                step={1}
                type="datetime-local"
                value={value.year ? '' : value}
                setValue={setValue}
            />
        </StyledField>
    )
}
