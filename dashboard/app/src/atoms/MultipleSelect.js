import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Checkbox } from './Checkbox'
import { HiXMark } from 'react-icons/hi2'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { toBoolStr } from '../utils/utils'
import { Tooltip } from './Tooltip'

const StyledOption = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
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

const StyledValues = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;
    overflow-x: scroll;
    padding: 0 10px;
    border-left: 2px solid ${({ theme }) => theme.primary};
    &::-webkit-scrollbar {
        height: 0;
    }
`
const StyledValueElem = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.secondary};
    border: 0;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 16px;
    white-space: nowrap;
    max-width: 200px;
    gap: 5px;
    cursor: pointer;
    & > *:first-child {
        display: inline-block;
        max-width: 150px;
        text-overflow: ellipsis;
        overflow: hidden;
    }
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

const ValueComponent = ({
    value = [],
    data,
    setValue,
    dropdown,
    setDropdown,
}) => {
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

            <StyledValues>
                {value.map((val) => (
                    <StyledValueElem
                        key={val}
                        onClick={() => {
                            setValue((prev) => prev.filter((v) => v != val))
                        }}
                    >
                        <Tooltip text={data[val]}>
                            <span>{data[val]}</span>
                        </Tooltip>{' '}
                        <HiXMark />
                    </StyledValueElem>
                ))}
                {value.length < 1 && <span>SELECT</span>}
            </StyledValues>
        </StyledValue>
    )
}

const OptionComponent = ({ data, value, onClick, currectValue }) => {
    const [checked, setChecked] = React.useState(false)

    useEffect(() => {
        setChecked(currectValue.some((val) => val == value))
    }, [currectValue])

    const handleOptionClick = () => {
        onClick(value)
        setChecked((prev) => !prev)
    }

    return (
        <StyledOption onClick={handleOptionClick}>
            <Checkbox size={0.8} value={checked} setValue={setChecked} />
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
    border: 3px solid ${({ theme }) => theme.primary};
    border-radius: 3px;
    position: relative;
`

export const MultipleSelect = ({ data, value = [], setValue }) => {
    const [dropdown, setDropdown] = React.useState(false)
    return (
        <StyledWrapper>
            <ValueComponent
                value={value}
                data={data}
                setValue={setValue}
                dropdown={toBoolStr(dropdown)}
                setDropdown={setDropdown}
            />
            <StyledDropdown dropdown={toBoolStr(dropdown)}>
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
