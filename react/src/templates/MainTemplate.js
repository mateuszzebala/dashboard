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
    width: ${({ leftbarOpen }) =>
        leftbarOpen ? 'calc(100vw - 200px)' : '100vw'};
    background-color: ${({ theme }) => theme.content.background};
    color: ${({ theme }) => theme.content.font};
    overflow: auto;
`

export const MainTemplate = ({ app, children }) => {
    const [cookies, setCookies, removeCookies] = useCookies(['leftbarOpen'])
    const [leftbarOpen, setLeftbarOpen] = React.useState(cookies.leftbarOpen)

    React.useEffect(() => {
        if (cookies.leftbarOpen === leftbarOpen) return
        removeCookies(['leftbaropen'])
        setCookies(['leftbarOpen'], toBoolStr(leftbarOpen))
    }, [cookies, leftbarOpen])

    return (
        <StyledWrapper>
            <LeftBar open={leftbarOpen} />
            <StyledRightSide>
                <TopBar app={app} setOpen={setLeftbarOpen} />
                <StyledContent leftbarOpen={toBoolStr(leftbarOpen)}>
                    {children}
                </StyledContent>
            </StyledRightSide>
        </StyledWrapper>
    )
}
