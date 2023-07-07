import React from 'react'
import { Button } from './Button'
import styled from 'styled-components'
import { Range } from './Range'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
`

const StyledButtons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;
    align-items: center;
    justify-content: space-between;
`

const StyledValue = styled.span`
    font-weight: 500;
    font-size: 30px;
`

export const RangeChooser = ({ setOpen, todo = () => {}, ...props }) => {
    const [value, setValue] = React.useState(props.value || 0)

    return (
        <StyledWrapper>
            <StyledValue>{value}</StyledValue>
            <Range {...props} value={value} setValue={setValue} />
            <StyledButtons>
                <Button
                    onClick={() => {
                        setOpen(false)
                    }}
                >
                    CANCEL
                </Button>
                <Button
                    onClick={() => {
                        setOpen(false)
                        todo(value)
                    }}
                >
                    SET
                </Button>
            </StyledButtons>
        </StyledWrapper>
    )
}
