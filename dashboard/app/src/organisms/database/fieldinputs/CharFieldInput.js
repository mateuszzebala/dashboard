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
    const [val, setVal] = React.useState(value ? (field.params.choices && value) ? field.params.choices.indexOf(value) : value : null)

    React.useEffect(() => {
        if(field.params.choices){
            val && onChange(field.params.choices[val])
        }
        else{
            val && onChange(val)
        }
    }, [val])
    
    if (field.params.choices) {
        return (
            <StyledField>
                <Typography variant={'h3'}>
                    {field.name.toUpperCase()} -{' '}
                    <StyledType>{field.type}</StyledType>
                </Typography>
                <Select
                    emptyName={`SELECT ${field.name.toUpperCase()}`}
                    data={field.params.choices.reduce((obj, choice) => {
                        const [key, value] = choice
                        obj[key] = value
                        return obj
                    }, {})}
                    value={val}
                    setValue={(newValue)=>{
                        setVal(newValue)
                    }}
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
                    value={val || ''}
                    setValue={setVal}
                />
            </StyledField>
        )
    }
}
