import React from 'react'
import styled from 'styled-components'
import { useModalForm } from '../utils/hooks'
import { SelectModal } from './modalforms/SelectModal'
import { BiSelectMultiple } from 'react-icons/bi'

const StyledValue = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;
    padding: 0 0 0 10px;
    height: 40px;
    border-left: 2px solid ${({ theme }) => theme.primary};
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
    background-color: ${({ theme }) => theme.secondary};
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
    const modalForm = useModalForm()

    return (
        <StyledWrapper
            onClick={() => {
                modalForm({
                    content: SelectModal,
                    title: emptyName,
                    icon: <BiSelectMultiple />,
                    data: data,
                    value,
                    todo: (val) => {
                        setValue(val)
                    },
                })
            }}
        >
            <StyledDropdownIcon>
                <BiSelectMultiple />
            </StyledDropdownIcon>
            <StyledValue>
                {!value ? <span>{emptyName}</span> : data[value]}
            </StyledValue>
        </StyledWrapper>
    )
}
