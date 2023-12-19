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
    text-transform: capitalize;
`
const StyledType = styled.span`
    font-weight: 300;
`

export const TimeFieldInput = ({ field, onChange, value: val }) => {
    const [value, setValue] = React.useState('')

    React.useEffect(()=>{
        if(!val) return
        const {hours, minutes, seconds} = val
        const datetime = new Date(0, 0, 0, hours, minutes, seconds)
        onChange(JSON.stringify(val))
        setValue(date.format(datetime, 'hh:mm:ss'))
    }, [])

    const handleOnChange = (value) => {
        if(!value) {
            onChange(null)
            return
        }
        setValue(value)
        const [hours, minutes, seconds] = value.split(':')
        const obj = {
            hours: parseInt(hours) || 0,
            minutes: parseInt(minutes) || 0,
            seconds: parseInt(seconds) || 0,
        }
        onChange(JSON.stringify(obj))
    }

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {field.name.toUpperCase()}<br/>
                <StyledType>{field.type}</StyledType>
            </Typography>
            <Input step={1} type="time" value={value} setValue={handleOnChange} />
        </StyledField>
    )
}
