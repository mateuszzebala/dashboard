import React from 'react'
import styled from 'styled-components'
import { Typography } from '../../../atoms/Typography'
import { FileInput } from '../../../atoms/inputs/FileInput'

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

export const FileFieldInput = ({ field, onChange, value: val }) => {
    const [value, setValue] = React.useState(val || '')

    React.useEffect(() => {
        onChange(value || null)
    }, [value])

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {field.name.toUpperCase()}
                <br />
                <StyledType>{field.type}</StyledType>
            </Typography>
            <FileInput size={1.1} value={value} setValue={setValue} />
        </StyledField>
    )
}
