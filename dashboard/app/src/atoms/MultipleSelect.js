import React from 'react'
import styled from 'styled-components'
import { useModalForm } from '../utils/hooks'
import { MultipleSelectModal } from './modalforms/MultipleSelectModal'
import { BiSelectMultiple } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'

const StyledValues = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;
    height: 40px;
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

export const MultipleSelect = ({ data, value = [], setValue }) => {
    const modalForm = useModalForm()
    return (
        <StyledWrapper>
            <StyledDropdownIcon
                onClick={() => {
                    modalForm({
                        content: MultipleSelectModal,
                        title: 'SELECT',
                        icon: <BiSelectMultiple />,
                        data,
                        value,
                        setValue,
                    })
                }}
            >
                <BiSelectMultiple />
            </StyledDropdownIcon>

            <StyledValues>
                {value.map((val) => (
                    <StyledValueElem
                        key={val}
                        onClick={() => {
                            setValue((prev) => prev.filter((v) => v != val))
                        }}
                    >
                        <span>{data[val]}</span>
                        <IoClose />
                    </StyledValueElem>
                ))}
                {value.length === 0 && <span>SELECT</span>}
            </StyledValues>
        </StyledWrapper>
    )
}
