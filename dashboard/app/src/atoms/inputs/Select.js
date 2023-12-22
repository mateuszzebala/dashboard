import React from 'react'
import styled from 'styled-components'
import { useModalForm } from '../../utils/hooks'
import { SelectModal } from '../modalforms/SelectModal'
import { BiSelectMultiple } from 'react-icons/bi'
import { Button } from '../Button'
import { IoIosArrowDown } from 'react-icons/io'
import { toBoolStr } from '../../utils/utils'

const StyledValue = styled.div`
    display: flex;
    gap: ${({size})=>size*10+'px'};
    align-items: center;
    justify-content: flex-start;
    padding: 0 0 0 ${({size})=>size*10+'px'};;
    height: ${({size})=>size*40+'px'};;
    font-size: ${({size})=>size*20+'px'};
`

const StyledDropdownIcon = styled.span`
    font-size: ${({size})=>size*25+'px'};
    padding: 0;
    display: grid;
    place-items: center;
    border: 0;
    padding: 0 ${({size})=>size*5+'px'};
    background-color: transparent;
    color: ${({ theme }) => theme.primary};
    transform: rotate(${({rotate}) => rotate ? '180deg' : '0deg'});
    transition: transform 0.3s;
`

const StyledWrapper = styled.div`
    display: inline-flex;
    flex-direction: row;
    cursor: pointer;
    min-width: ${({size})=>size*300+'px'};
    max-width: ${({size})=>size*300+'px'};
    width: ${({size})=>size*300+'px'};
    background-color: ${({ theme }) => theme.secondary};
    border: 2.5px solid ${({ theme }) => theme.primary};
    border-radius: ${({size})=>size*3+'px'};
    justify-content: space-between;
    height: ${({size})=>size*45+'px'};
    position: relative;
    outline: 0px solid ${({theme})=>theme.quaternary};
    transition: outline-width 0.1s;
    &:hover{
        outline-width: ${({size})=>size*3+'px'};
    }
`

const StyledLabel = styled.label`
    position: absolute;
    top: ${({size})=>size*(-2.5)+'px'};
    left: ${({size})=>size*5+'px'};
    user-select: none;
    padding: 0 ${({size})=>size*10+'px'};
    font-size: ${({size})=>size*10+'px'};
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
`

export const Select = ({
    data,
    value = null,
    setValue,
    emptyName = 'SELECT',
    asButton,
    label,
    canBeNull=true,
    size=1,
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
        return <Button size={size} {...props} onClick={handleOnClick}>{props.children}</Button>
    }

    return (
        <StyledWrapper
            onClick={handleOnClick}
            size={size}
        >
            <StyledLabel size={size} label={toBoolStr(label)}>{label || ''}</StyledLabel>
            <StyledValue size={size}>
                {data[value] === null ? <span>{emptyName}</span> : data[value]}
            </StyledValue>
            <StyledDropdownIcon size={size} rotate={toBoolStr(isOpen)}>
                <IoIosArrowDown />
            </StyledDropdownIcon>
        </StyledWrapper>
    )
}
