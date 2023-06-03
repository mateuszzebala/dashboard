import React from 'react'
import styled from 'styled-components'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { toBoolStr } from '../utils/utils'
import { Tooltip } from './Tooltip'

const StyledOption = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: ${({ theme }) => theme.select.background};
    color: ${({ theme }) => theme.select.font};
    border: 0;
    font-size: 15px;
    white-space: nowrap;
    cursor: pointer;
    padding: 5px 10px;
`

const StyledValue = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;
    padding: 0 0 0 10px;
    height: 40px;
`

const StyledDropdownIcon = styled.button`
    font-size: 30px;
    padding: 0;
    display: grid;
    place-items: center;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    transition: transform 0.3s;
    transform: ${({ dropdown }) =>
        dropdown ? 'rotate(180deg)' : 'rotate(0deg)'};
`

const ValueComponent = ({ value = [], data, dropdown, setDropdown }) => {
    return (
        <StyledValue>
            <StyledDropdownIcon
                dropdown={toBoolStr(dropdown)}
                onClick={() => {
                    setDropdown((prev) => !prev)
                }}
            >
                <IoIosArrowDropdownCircle />
            </StyledDropdownIcon>
            <StyledValue>
                {!value ? <span>SELECT</span> : data[value]}
            </StyledValue>
        </StyledValue>
    )
}

const OptionComponent = ({ data, value, onClick }) => {
    const handleOptionClick = () => {
        onClick(value)
    }

    return (
        <StyledOption onClick={handleOptionClick}>
            <Tooltip text={data[value]}>
                <span>{data[value]}</span>
            </Tooltip>
        </StyledOption>
    )
}
const StyledDropdown = styled.div`
    display: flex;
    flex-direction: column;
    transition: max-height 0.3s;
    max-height: ${({ dropdown }) => (dropdown ? '300px' : 0)};
    overflow: scroll;
    position: absolute;
    top: 100%;
    width: 100%;
    border: 3px solid ${({ theme }) => theme.select.border};
    border-width: 0 3px 3px;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`
const StyledWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    width: 300px;
    border: 3px solid ${({ theme }) => theme.select.font};
    border-radius: 3px;
    position: relative;
`

export const Select = ({ data, value = null, setValue }) => {
    const [dropdown, setDropdown] = React.useState(false)
    return (
        <StyledWrapper>
            <ValueComponent
                value={value}
                data={data}
                dropdown={toBoolStr(dropdown)}
                setDropdown={setDropdown}
            />
            <StyledDropdown dropdown={toBoolStr(dropdown)}>
                {Object.keys(data).map((name) => (
                    <OptionComponent
                        key={name}
                        data={data}
                        value={name}
                        onClick={(val) => {
                            setValue(val)
                        }}
                    />
                ))}
            </StyledDropdown>
        </StyledWrapper>
    )
}
