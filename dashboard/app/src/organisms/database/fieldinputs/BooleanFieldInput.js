import React from 'react'
import styled from 'styled-components'
import { Typography } from '../../../atoms/Typography'
import { Switch } from '../../../atoms/Switch'

const StyledRow = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    min-width: 200px;
    justify-content: flex-start;
`

export const BooleanFieldInput = ({ field, onChange }) => {
    const [value, setValue] = React.useState(false)

    React.useEffect(() => {
        onChange(value)
    }, [value])

    return (
        <StyledRow>
            <Typography variant={'h3'}>{field.name}</Typography>
            <Switch size={1.4} value={value} setValue={setValue} />
        </StyledRow>
    )
}
