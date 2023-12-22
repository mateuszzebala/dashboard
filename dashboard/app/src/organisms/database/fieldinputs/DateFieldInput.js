import React from 'react'
import styled from 'styled-components'
import { Typography } from '../../../atoms/Typography'
import date from 'date-and-time'
import { Input } from '../../../atoms/inputs/Input'

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

export const DateFieldInput = ({ field, onChange, value: val }) => {
    const [value, setValue] = React.useState('')

    React.useEffect(()=>{
        if(value === null) {
            onChange(null)
            return
        }
        const [year, month, day] = value.split('-')
        const obj = {
            year: parseInt(year) || 0,
            month: parseInt(month) || 0,
            day: parseInt(day) || 0,
        }
        onChange(JSON.stringify(obj))
    }, [value])

    React.useEffect(()=>{
        if(!val) {
            return
        }
        const {year, month, day} = val
        console.log(val)
        onChange(JSON.stringify(val))
        const datetime = new Date(year, month, day, 0, 0, 0)
        setValue(date.format(datetime, 'YYYY-MM-DD'))
    }, [])

    const handleOnChange = (value) => {
        if(!value) {
            setValue(null)
            return
        }
        setValue(value)
    }

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {field.name.toUpperCase()}<br/>
                <StyledType>{field.type}</StyledType>
            </Typography>
            <Input type="date" value={value} setValue={handleOnChange} />
        </StyledField>
    )
}
