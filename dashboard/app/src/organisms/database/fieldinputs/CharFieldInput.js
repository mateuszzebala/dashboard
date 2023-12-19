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
    let selectedItem = null
    if(field.params.choices && value) selectedItem = field.params.choices.find(i => (i[0] == value || i[1] == value))

    const [val, setVal] = React.useState(field.params.choices ? selectedItem ? selectedItem[0] : value : (value || null))

    React.useEffect(() => {
        if(field.params.choices){
            const selectedOption = field.params.choices.find(element => element[0] === val)
            if (selectedOption){
                val && onChange(selectedOption[1])
            }
            else{
                val && onChange(null)
            }
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
                    {field.name.toUpperCase()}<br/>
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
