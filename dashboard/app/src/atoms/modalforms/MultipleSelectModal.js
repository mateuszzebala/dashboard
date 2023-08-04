import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'

const OptionComponent = ({ checked, toggleValue, text }) => {
    return (
        <Button width={'100%'} second={!checked} onClick={toggleValue}>
            {text}
        </Button>
    )
}
const StyledDropdown = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 300px;
    overflow: scroll;
    align-items: stretch;
    width: 200px;
    padding: 5px;
    gap: 5px;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`

export const MultipleSelectModal = ({ data, value, setValue }) => {
    const [val, setVal] = React.useState(value)
    return (
        <StyledDropdown>
            {Object.keys(data).map((name) => (
                <OptionComponent
                    key={name}
                    text={data[name]}
                    toggleValue={() => {
                        if (val.includes(name)) {
                            setVal((prev) =>
                                prev.filter((item) => item !== name)
                            )
                            setValue((prev) =>
                                prev.filter((item) => item !== name)
                            )
                        } else {
                            setVal((prev) => [...prev, name])
                            setValue((prev) => [...prev, name])
                        }
                    }}
                    checked={val.includes(name)}
                />
            ))}
        </StyledDropdown>
    )
}
