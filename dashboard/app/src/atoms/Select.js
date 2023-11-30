import React from 'react'
import styled from 'styled-components'
import { useModalForm } from '../utils/hooks'
import { SelectModal } from './modalforms/SelectModal'
import { BiSelectMultiple } from 'react-icons/bi'
import { Button } from './Button'

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
    padding: 0 5px;
    background-color: transparent;
    cursor: pointer;
    transition: transform 0.3s;
    color: ${({ theme }) => theme.primary};
    transition: background-color 0.3s, color 0.3s;
    &:hover {
        background-color: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.secondary};
    }
`

const StyledWrapper = styled.div`
    display: inline-flex;
    flex-direction: row;
    width: 300px;
    background-color: ${({ theme }) => theme.secondary};
    border: 2px solid ${({ theme }) => theme.primary};
    border-radius: 3px;
    position: relative;
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

    React.useEffect(()=>{
        !canBeNull && value === null && setValue(Object.keys(data)[0])
    }, [value])

    const modalForm = useModalForm()
    const handleOnClick = () => {
        modalForm({
            content: SelectModal,
            title: emptyName,
            icon: props.icon ? props.icon : <BiSelectMultiple />,
            data: data,
            canBeNull,
            value,
            todo: (val) => {
                setValue(val)
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
            <StyledDropdownIcon>
                <BiSelectMultiple />
            </StyledDropdownIcon>
            <StyledValue>
                {value == null ? <span>{emptyName}</span> : data[value]}
            </StyledValue>
        </StyledWrapper>
    )
}
