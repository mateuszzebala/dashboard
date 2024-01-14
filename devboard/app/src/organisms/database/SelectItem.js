import React from 'react'
import styled from 'styled-components'
import { useModalForm } from '../../utils/hooks'
import { SelectItemModal } from '../../atoms/modalforms/SelectItemModal'
import { BiSearch } from 'react-icons/bi'
import { FiSearch } from 'react-icons/fi'

const StyledInput = styled.div`
    display: inline-flex;
    padding: ${({ size }) => 10 * size + 'px'}  ${({ size }) => 15 * size + 'px'} ;
    border: ${({ size }) => 2 * size + 'px'} solid ${({ theme }) => theme.primary};
    border-radius: ${({ size }) => 3 * size + 'px'} ;
    width: ${({ size }) => 300 * size + 'px'} ;
    background-color: ${({ theme }) => theme.secondary};
    gap: ${({ size }) => 20 * size + 'px'} ;
    font-size: ${({ size }) => 18 * size + 'px'} ;
    align-items: center;
    cursor: pointer;
    justify-content: flex-start;
`

const StyledValue = styled.div`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

const StyledIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const SelectItem = ({ modelName, fieldName, multiple, value, setValue, size = 1, thisModel, ...props }) => {
    const modalForm = useModalForm()
    return (
        <StyledInput
            size={size}
            onClick={() => {
                modalForm({
                    content: SelectItemModal,
                    title: 'SELECT',
                    icon: <BiSearch />,
                    modelName,
                    fieldName,
                    value,
                    multiple,
                    setValue,
                    ...props,
                })
            }}
        >
            <StyledIcon>
                <FiSearch />
            </StyledIcon>
            <StyledValue>
                {multiple && `${value.length} ITEMS`}
                {!multiple && (value ? `${thisModel} - ${value.str}` : 'SELECT')}
            </StyledValue>
        </StyledInput>
    )
}
