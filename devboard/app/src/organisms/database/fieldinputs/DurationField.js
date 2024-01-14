import React from 'react'
import styled from 'styled-components'
import { Typography } from '../../../atoms/Typography'
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

export const DurationFieldInput = ({ field, onChange }) => {
    const [value, setValue] = React.useState('')

    React.useEffect(() => {
        if (value) {
            const days = Math.floor(value / (60 * 60 * 24))
            const seconds = value - 60 * 60 * 24 * days
            onChange(
                JSON.stringify({
                    days: parseInt(days),
                    seconds: parseInt(seconds),
                })
            )
        } else onChange(null)
    }, [value])

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {field.name}<br/><StyledType>{field.type}</StyledType>
            </Typography>
            <Input size={1.1} type={'number'} value={value} setValue={setValue} />
        </StyledField>
    )
}
