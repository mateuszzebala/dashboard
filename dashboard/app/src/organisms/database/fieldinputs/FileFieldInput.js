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

export const FileFieldInput = ({ field, onChange }) => {
    const [value, setValue] = React.useState('')

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {field.name} - <StyledType>{field.type}</StyledType>
            </Typography>
            <Input
                type={'file'}
                value={value}
                setValue={() => {}}
                onInput={(e) => {
                    setValue(e.target.value)
                    onChange(e.target.files ? e.target.files[0] : null)
                }}
            />
        </StyledField>
    )
}
