import React from 'react'
import styled from 'styled-components'
import { BsArrowDownShort } from 'react-icons/bs'
import { toBoolStr } from '../utils/utils'
import { Tooltip } from './Tooltip'
import { useOnClickOutside } from '../utils/hooks'

const StyledOption = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: ${({ theme }) => theme.select.background};
    color: ${({ theme }) => theme.select.font};
    border: 0;
    font-size: 18px;
    white-space: nowrap;
    cursor: pointer;
    padding: 10px 10px;
    text-align: center;
    transition: background-color 0.2s;
    &:hover {
        background-color: ${({ theme }) => theme.select.font}22;
    }
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
    color: ${({ theme }) => theme.primary};
    border: 0;
    background-color: transparent;
    cursor: pointer;
    transition: transform 0.3s;
    transform: ${({ dropdown }) =>
        dropdown ? 'rotate(180deg)' : 'rotate(0deg)'};
`

const ValueComponent = ({ value = [], dropdown, setDropdown, emptyName }) => {
    return (
        <StyledValue
            onClick={() => {
                setDropdown((prev) => !prev)
            }}
        >
            <StyledDropdownIcon dropdown={toBoolStr(dropdown)}>
                <BsArrowDownShort />
            </StyledDropdownIcon>
            <StyledValue>
                {!value ? <span>{emptyName}</span> : value}
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
    z-index: 0;
    position: absolute;
    top: 100%;
    width: calc(100% + 6px);
    left: -3px;
    border: 3px solid ${({ theme }) => theme.select.border};
    background-color: ${({ theme }) => theme.select.background};
    border-width: 0 3px 3px;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
    z-index: ${({ hide }) => (hide ? 0 : 3)};
`
const StyledWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    width: 300px;
    border: 3px solid ${({ theme }) => theme.select.font};
    border-radius: 3px;
    position: relative;
`

export const Select = ({
    data,
    value = null,
    setValue,
    emptyName = 'SELECT',
}) => {
    const [dropdown, setDropdown] = React.useState(null)
    const [hide, setHide] = React.useState(true)
    const timeoutRef = React.useRef()

    React.useEffect(() => {
        if (dropdown === null) return
        if (dropdown) {
            setHide(false)
            clearTimeout(timeoutRef.current)
        } else {
            timeoutRef.current = setTimeout(() => {
                setHide(true)
            }, 3000)
        }
    }, [dropdown])

    const mainRef = React.useRef()
    useOnClickOutside(mainRef, () => {
        setDropdown(false)
    })
    return (
        <StyledWrapper ref={mainRef}>
            <ValueComponent
                value={value}
                dropdown={toBoolStr(dropdown)}
                setDropdown={setDropdown}
                emptyName={emptyName}
            />
            <StyledDropdown
                dropdown={toBoolStr(dropdown)}
                hide={toBoolStr(hide)}
            >
                {Object.keys(data).map((name) => (
                    <OptionComponent
                        key={name}
                        data={data}
                        value={name}
                        onClick={(val) => {
                            setValue(data[val])
                            setDropdown(false)
                        }}
                    />
                ))}
            </StyledDropdown>
        </StyledWrapper>
    )
}
