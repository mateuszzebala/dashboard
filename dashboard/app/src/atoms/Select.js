import React from 'react'
import styled from 'styled-components'
import { BsArrowDownShort } from 'react-icons/bs'
import { toBoolStr } from '../utils/utils'

import { useModalForm, useOnClickOutside } from '../utils/hooks'
import { SelectModal } from './modalforms/SelectModal'
import { BiSelectMultiple } from 'react-icons/bi'

const StyledValue = styled.div`
    display: flex;
    gap: 10px;
    font-size: 20px;
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

const StyledWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    width: 300px;
    border: 3px solid ${({ theme }) => theme.primary};
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
    const modalForm = useModalForm()
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
        <StyledWrapper
            ref={mainRef}
            onClick={() => {
                modalForm({
                    content: SelectModal,
                    title: 'SELECT',
                    icon: <BiSelectMultiple />,
                    data: data,
                    todo: (val) => {
                        setValue(val)
                    },
                })
            }}
        >
            <ValueComponent
                value={value}
                dropdown={toBoolStr(dropdown)}
                setDropdown={setDropdown}
                emptyName={emptyName}
            />
        </StyledWrapper>
    )
}
