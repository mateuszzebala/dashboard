import React from 'react'
import styled from 'styled-components'
import { Typography } from '../../../atoms/Typography'
import date from 'date-and-time'
import { Input } from '../../../atoms/Input'

const StyledField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-items: center;
    text-transform: capitalize;
`
const StyledType = styled.span`
    font-weight: 300;
`

export const DateTimeFieldInput = ({ field, onChange, value: val }) => {
    const [value, setValue] = React.useState('')

    React.useEffect(()=>{
        if(!val) return
        const {hours, minutes, seconds, year, month, day} = val
        onChange(JSON.stringify(val))
        const datetime = new Date(year, month, day, hours, minutes, seconds)
        setValue(date.format(datetime, 'YYYY-MM-DDThh:mm:ss'))
    }, [])

    const handleOnChange = (value) => {
        if(!value) {
            onChange(null)
            return
        }
        setValue(value)
        const [date, time] = value.split('T')
        const [year, month, day] = date.split('-')
        const [hours, minutes, seconds] = time.split(':')
        const obj = {
            hours: parseInt(hours),
            minutes: parseInt(minutes),
            seconds: parseInt(seconds),
            year: parseInt(year),
            month: parseInt(month),
            day: parseInt(day),
        }
        onChange(JSON.stringify(obj))
    }


    return (
        <StyledField>
            <Typography variant={'h3'}>
                {field.name.toUpperCase()} -{' '}
                <StyledType>{field.type}</StyledType>
            </Typography>
            <Input
                step={1}
                type="datetime-local"
                value={value}
                setValue={handleOnChange}
            />
        </StyledField>
    )
}
