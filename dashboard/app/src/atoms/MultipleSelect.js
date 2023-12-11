import React from 'react'
import styled from 'styled-components'
import { useModalForm } from '../utils/hooks'
import { MultipleSelectModal } from './modalforms/MultipleSelectModal'
import { BiSelectMultiple } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'
import { IoIosArrowDown } from 'react-icons/io'
import { toBoolStr } from '../utils/utils'

const StyledValue = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: flex-start;
    height: 40px;
    overflow-x: scroll;
    font-size: 20px;
    padding: 0 10px;
    &::-webkit-scrollbar {
        height: 0;
    }
`

const StyledDropdownIcon = styled.button`
    font-size: 25px;
    padding: 0;
    display: grid;
    place-items: center;
    border: 0;
    padding: 0 5px;
    background-color: transparent;
    color: ${({ theme }) => theme.primary};
    transform: rotate(${({rotate}) => rotate ? '180deg' : '0deg'});
    transition: transform 0.3s;
`

const StyledWrapper = styled.div`
    display: inline-flex;
    cursor: pointer;
    flex-direction: row;
    width: 300px;
    border: 2.5px solid ${({ theme }) => theme.primary};
    border-radius: 3px;
    justify-content: space-between;
    position: relative;
    outline: 0px solid ${({theme})=>theme.quaternary};
    transition: outline-width 0.1s;
    &:hover{
        outline-width: 3px;
    }
`

export const MultipleSelect = ({ data, value = [], setValue }) => {
    const modalForm = useModalForm()
    const [isOpen, setIsOpen] = React.useState(false)

    const handleClick = (e) => {
        setIsOpen(true)
        modalForm({
            content: MultipleSelectModal,
            title: 'SELECT',
            icon: <BiSelectMultiple />,
            data,
            value,
            setValue,
            onExit: ()=>setIsOpen(false)
        })
    }

    return (
        <StyledWrapper onClick={handleClick}>
            <StyledValue>
                {value.map(val => data[val]).join(', ')}
                {value.length === 0 && <span>SELECT</span>}
            </StyledValue>
            <StyledDropdownIcon rotate={toBoolStr(isOpen)}>
                <IoIosArrowDown />
            </StyledDropdownIcon>
        </StyledWrapper>
    )
}
