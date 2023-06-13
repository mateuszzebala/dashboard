import React from 'react'
import styled from 'styled-components'
import { LeftBar } from '../organisms/LeftBar'
import { TopBar } from '../organisms/TopBar'
import { useCookies } from 'react-cookie'
import { toBoolStr } from '../utils/utils'

const StyledWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    min-height: 100vh;
    max-width: 100vw;
    overflow: hidden;
`

const StyledRightSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`

const StyledContent = styled.div`
    padding: 10px;
    height: 100%;
    transition: width 0.3s;
    width: ${({ leftbarClose }) =>
        !leftbarClose ? '100vw' : 'calc(100vw - 200px)'};
    background-color: ${({ theme }) => theme.content.background};
    color: ${({ theme }) => theme.content.font};
    overflow: auto;
`

export const MainTemplate = ({ app, children }) => {
    const [cookies, setCookies, removeCookies] = useCookies(['leftbarClose'])
    const [leftbarClose, setLeftbarClose] = React.useState(cookies.leftbarClose)

    React.useEffect(() => {
        if (cookies.leftbarClose === leftbarClose) return
        removeCookies(['leftbarClose'])
        const today = new Date()
        setCookies(['leftbarClose'], toBoolStr(leftbarClose), {
            expires: new Date(today.getFullYear() + 10, 1, 1),
        })
    }, [leftbarClose])

    return (
        <StyledWrapper>
            <LeftBar close={leftbarClose} />
            <StyledRightSide>
                <TopBar app={app} setClose={setLeftbarClose} />
                <StyledContent leftbarClose={toBoolStr(leftbarClose)}>
                    {children}
                </StyledContent>
            </StyledRightSide>
        </StyledWrapper>
    )
}
