import React from 'react'
import styled from 'styled-components'
import { Typography } from '../../../atoms/Typography'
import { SwitchWithNull } from '../../../atoms/SwitchWithNull'
import { Switch } from '../../../atoms/inputs/Switch'

const StyledRow = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    min-width: 200px;
    justify-content: flex-start;
`

export const BooleanFieldInput = ({ field, value, onChange }) => {
    const [val, setVal] = React.useState(value || false)

    React.useEffect(() => {
        onChange(val)
    }, [val])

    return (
        <StyledRow>
            <Typography variant={'h3'}>{field.name.toUpperCase()}</Typography>
            {field.params.null ? (
                <>
                    <SwitchWithNull
                        size={1.4}
                        value={val}
                        setValue={setVal}
                    />
                </>
            ) : (
                <Switch size={1.5} value={val} setValue={setVal} />
            )}
        </StyledRow>
    )
}
