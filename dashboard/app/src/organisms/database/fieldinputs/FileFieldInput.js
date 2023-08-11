import React from 'react'
import styled from 'styled-components'
import { Typography } from '../../../atoms/Typography'
import { Input } from '../../../atoms/Input'
import { AiOutlineUpload } from 'react-icons/ai'
import { FaUpload } from 'react-icons/fa'
import { FileInput } from '../../../atoms/FileInput'

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

    React.useEffect(() => {
        onChange(value || null)
    }, [value])

    return (
        <StyledField>
            <Typography variant={'h3'}>
                {field.name.toUpperCase()} -{' '}
                <StyledType>{field.type}</StyledType>
            </Typography>
            <FileInput value={value} setValue={setValue} />
        </StyledField>
    )
}
