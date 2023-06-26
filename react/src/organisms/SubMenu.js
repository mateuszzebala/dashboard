import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'

const StyledSubMenu = styled.div`
  display: flex;
  gap: 10px;
  padding: ${({exists})=>exists?'10px':0};
  background-color:${({theme})=>theme.topbar.background};
  color:${({theme})=>theme.topbar.font};
  z-index: 2;
  align-items: center;
  justify-content: flex-start;
  overflow-x: scroll;
  &::-webkit-scrollbar{
    height: 0;
    width: 0;
  }
`

export const SubMenu = ({children}) => {
    return (
        <StyledSubMenu exists={toBoolStr(children)}>
            {children}
        </StyledSubMenu>
    )
}
