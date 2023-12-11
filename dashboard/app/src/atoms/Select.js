import React from 'react'
import styled from 'styled-components'
import { useModalForm } from '../utils/hooks'
import { SelectModal } from './modalforms/SelectModal'
import { BiSelectMultiple } from 'react-icons/bi'
import { Button } from './Button'
import { IoIosArrowDown } from 'react-icons/io'
import { toBoolStr } from '../utils/utils'

const StyledValue = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;
    padding: 0 0 0 10px;
    height: 40px;
    font-size: 20px;
`

const StyledDropdownIcon = styled.span`
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
    flex-direction: row;
    cursor: pointer;
    width: 300px;
    background-color: ${({ theme }) => theme.secondary};
    border: 2.5px solid ${({ theme }) => theme.primary};
    border-radius: 3px;
    justify-content: space-between;
    height: 45px;
    position: relative;
    outline: 0px solid ${({theme})=>theme.quaternary};
    transition: outline-width 0.1s;
    &:hover{
        outline-width: 3px;
    }
`

export const Select = ({
    data,
    value = null,
    setValue,
    emptyName = 'SELECT',
    asButton,
    canBeNull=true,

    ...props
}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    
    React.useEffect(()=>{
        !canBeNull && value === null && setValue(Object.keys(data)[0])
    }, [value])

    const modalForm = useModalForm()
    const handleOnClick = () => {
        setIsOpen(true)
        modalForm({
            content: SelectModal,
            icon: props.icon ? props.icon : <BiSelectMultiple />,
            data: data,
            canBeNull,
            title: emptyName,
            value,
            onExit: () => {
                setIsOpen(false)
            },
            todo: (val) => {
                setValue(val)
                setIsOpen(false)
            },
        })
    }

    if(asButton){
        return <Button {...props} onClick={handleOnClick}>{props.children}</Button>
    }

    return (
        <StyledWrapper
            onClick={handleOnClick}
        >
            <StyledValue>
                {data[value] == null ? <span>{emptyName}</span> : data[value]}
            </StyledValue>
            <StyledDropdownIcon rotate={toBoolStr(isOpen)}>
                <IoIosArrowDown />
            </StyledDropdownIcon>
        </StyledWrapper>
    )
}
