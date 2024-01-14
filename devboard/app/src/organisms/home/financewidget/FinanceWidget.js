import React from 'react'
import styled from 'styled-components'
import { AiOutlineLineChart } from 'react-icons/ai'

const StyledWidget = styled.div`
  width: 100%;
  height: 25%;
  box-shadow: 0 0 8px -5px ${({ theme }) => theme.primary};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: ${({theme})=>theme.success};
  font-size: 50px;
  padding: 10px 20px;
  svg{
    font-size: 70px;
  }
  span{
    font-weight: bold;
  }
`

export const FinanceWidget = () => {
    return (
        <StyledWidget>
            <AiOutlineLineChart /> <span>+203$</span>
        </StyledWidget>
    )
}