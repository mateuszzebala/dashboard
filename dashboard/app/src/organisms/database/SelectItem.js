import React from 'react'
import styled from 'styled-components'
import { useModalForm } from '../../utils/hooks'
import { SelectItemModal } from '../../atoms/modalforms/SelectItemModal'
import { BiSearch } from 'react-icons/bi'

const StyledInput = styled.div`
    display: inline-flex;
    padding: 10px 15px;
    border: 3px solid ${({ theme }) => theme.primary};
    border-radius: 3px;
    width: 300px;
    gap: 20px;
    font-size: 18px;
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

export const SelectItem = ({ modelName, multiple, value, setValue }) => {
    const modalForm = useModalForm()
    return (
        <StyledInput
            onClick={() => {
                modalForm({
                    content: SelectItemModal,
                    title: `SELECT ${modelName.toUpperCase()}`,
                    icon: <BiSearch />,
                    modelName,
                    value,
                    multiple,
                    setValue,
                })
            }}
        >
            <StyledIcon>
                <BiSearch />
            </StyledIcon>
            <StyledValue>
                {multiple && `${value.length} ITEMS`}
                {!multiple &&
                    (value
                        ? `${modelName} - ${value.str}`
                        : `SELECT ${modelName.toUpperCase()}`)}
            </StyledValue>
        </StyledInput>
    )
}
