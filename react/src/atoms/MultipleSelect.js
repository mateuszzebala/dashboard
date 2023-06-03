import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Checkbox } from './Checkbox'

const StyledOption = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 3px;
    background-color: ${({ theme }) => theme.select.background};
    color: ${({ theme }) => theme.select.font};
    border: 3px solid black;
    cursor: pointer;
`

const StyledValue = styled.div``

const ValueComponent = ({ value, data }) => {
    return (
        <StyledValue>
            {value.map((val) => (
                <span key={val}>{data[val]}</span>
            ))}
        </StyledValue>
    )
}

const OptionComponent = ({ data, value, onClick, currectValue }) => {
    const [checked, setChecked] = React.useState(false)

    useEffect(() => {
        setChecked(currectValue.some((val) => val == value))
        console.log(currectValue)
    }, [currectValue])

    const handleOptionClick = () => {
        onClick(value)
        setChecked((prev) => !prev)
    }

    return (
        <StyledOption onClick={handleOptionClick}>
            <Checkbox value={checked} setValue={setChecked} />
            <span>{data[value]}</span>
        </StyledOption>
    )
}
const StyledDropdown = styled.div`
    display: flex;
    flex-direction: column;
`
const StyledWrapper = styled.div``

export const MultipleSelect = ({ data, value = [], setValue }) => {
    return (
        <StyledWrapper>
            <ValueComponent value={value} data={data} />
            <StyledDropdown>
                {Object.keys(data).map((name) => (
                    <OptionComponent
                        key={name}
                        data={data}
                        currectValue={value}
                        value={name}
                        onClick={(val) => {
                            if (value.includes(val)) {
                                setValue(value.filter((v) => v !== val))
                            } else {
                                setValue((prev) => [...prev, val])
                            }
                        }}
                    />
                ))}
            </StyledDropdown>
        </StyledWrapper>
    )
}
