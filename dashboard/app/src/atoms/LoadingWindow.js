import React from 'react'
import { LoadingContext, useTheme } from '../utils/hooks'
import { Loading } from './Loading'
import styled from 'styled-components'
import { Theme } from './Theme'
import { useCookies } from 'react-cookie'
import { toBoolStr } from '../utils/utils'

const StyledLoading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 7px;
  gap: 10px;
  position: fixed;
  box-shadow: 0 0 10px -5px ${({theme})=>theme.primary};
  bottom: 20px;
  transition: left 0.3s ease;
  left: ${({leftbarClose}) => leftbarClose ? '20px' : '220px'};
  z-index: 2;
  background-color: ${({theme})=>theme.primary};
  color: ${({theme})=>theme.secondary};
`

export const LoadingWindow = () => {
    const [loading] = React.useContext(LoadingContext)
    const [cookies] = useCookies()
    const [theme] = useTheme()
    if (!loading.show) return ''

    return (
        <StyledLoading leftbarClose={toBoolStr(cookies.leftbarClose)}>
            <Theme value={{...theme, primary: theme.secondary, secondary: theme.primary}}>
                <Loading size={0.8}/>
            </Theme>
            {loading.text && <span>{loading.text}</span>}
        </StyledLoading>
    )
}