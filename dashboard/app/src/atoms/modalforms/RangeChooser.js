import React from 'react'
import { Range } from '../Range'
import { Button } from '../Button'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
`

export const RangeChooser = ({ todo = () => {}, start, ...props }) => {
    const [value, setValue] = React.useState(start || 0)

    React.useEffect(() => {
        todo(value)
    }, [value])

    return (
        <StyledWrapper>
            {value}
            <Range value={value} setValue={setValue} {...props} />
        </StyledWrapper>
    )
}
