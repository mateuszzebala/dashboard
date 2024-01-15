import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { FiChevronDown, FiChevronUp, FiMinus, FiPlus } from 'react-icons/fi'
import styled from 'styled-components'
import { useModalForm } from '../../utils/hooks'
import { Prompt } from '../modalforms/Prompt'

const StyledWrapper = styled.button`
    display: inline-flex;
    height: ${({ size }) => size * 43 + 'px'};
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    font-size: ${({ size }) => size * 20 + 'px'};
    background-color: ${({ theme }) => theme.quaternary};
    color: ${({ theme }) => theme.primary};
    border-radius: ${({ size }) => size * 5 + 'px'};
    outline: 0 solid ${({ theme }) => theme.quaternary}88;
    border: 0;
    transition: outline-width 0.1s;
    cursor: pointer;
    &:hover, &:focus{
        outline-width: ${({ size }) => size * 3 + 'px'};
    }
`

const StyledButton = styled.button`
    display: flex;
    flex-direction: column;
    font-size: ${({ size }) => size * 15 + 'px'};
    align-items: center;
    border-radius: ${({ size }) => size * 5 + 'px'};
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
    height: ${({ size }) => size * 18 + 'px'};
    outline: 0;
    transition: outline-width 0.1s;
    background-color: transparent;
    border: 0;
    width: ${({ size }) => size * 23 + 'px'};
    justify-content: center;

`

const StyledRow = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 300;
    align-items: center;  
    padding: 0 10px;
    font-size: ${({ scaleSize }) => scaleSize * 15 + 'px'};
    span:first-child{

    }
    span:last-child{
        font-size: ${({ scaleSize }) => scaleSize * 8 + 'px'};
    }
`

const StyledButtons = styled.div`

`

export const Counter = ({
    value,
    setValue,
    unit = '',
    size = 1,
    min = 0,
    max = 100,
}) => {
    const modalForm = useModalForm()
    return (
        <StyledWrapper size={size}>
          
            <StyledButtons>
                <StyledButton
                    size={size}
                    onClick={() => {
                        setValue((prev) => (prev + 1 <= max ? prev + 1 : prev))
                    }}
                >
                    <FiChevronUp />
                </StyledButton>
                <StyledButton
                    onClick={() => {
                        setValue((prev) => (prev - 1 >= min ? prev - 1 : prev))
                    }}
                    size={size}
                >
                    <FiChevronDown />
                </StyledButton>
            </StyledButtons>

             
            <StyledRow onClick={()=>{
                modalForm({
                    content: Prompt,
                    title: unit ? unit : 'VALUE',
                    icon: <FiChevronUp/>,
                    type: 'number',
                    initValue: value,
                    todo: (val) => setValue(val ? parseInt(val) : value)
                })
            }} scaleSize={size}>
                <span>{value}</span>
                <span>{unit}</span>
            </StyledRow>
        </StyledWrapper>
    )
}
