import React from 'react'
import styled from 'styled-components'
import { LeftBar } from '../organisms/LeftBar'
import { TopBar } from '../organisms/TopBar'
import { useCookies } from 'react-cookie'
import { toBoolStr } from '../utils/utils'
import { SubMenu } from '../organisms/SubMenu'

const StyledContainer = styled.main`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    min-height: 100vh;
    max-width: 100vw;
    position: relative;
    overflow: hidden;
`

const StyledRightSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`

const StyledContent = styled.article`
    padding: 10px;
    height: 100%;
    transition: width 0.3s;
    width: ${({ leftbarclose }) =>
        !leftbarclose ? '100vw' : 'calc(100vw - 200px)'};
    background-color: ${({ theme }) => theme.content.background};
    color: ${({ theme }) => theme.content.font};
    overflow: auto;
`

const StyledTopMenu = styled.div`
    box-shadow: 0 0 10px -6px ${({ theme }) => theme.primary};
    z-index: 2;
    width: ${({ leftbarclose }) =>
        !leftbarclose ? '100vw' : 'calc(100vw - 200px)'};
    transition: width 0.3s;
`

export const MainTemplate = ({
    app,
    children,
    title = '',
    submenuChildren,
    topbarLink,
}) => {
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
        <StyledContainer>
            <LeftBar close={leftbarClose} />
            <StyledRightSide>
                <StyledTopMenu leftbarclose={toBoolStr(leftbarClose)}>
                    <TopBar
                        title={title}
                        app={app}
                        setClose={setLeftbarClose}
                        topbarLink={topbarLink}
                    />
                    <SubMenu>{submenuChildren}</SubMenu>
                </StyledTopMenu>
                <StyledContent leftbarclose={toBoolStr(leftbarClose)}>
                    {children}
                </StyledContent>
            </StyledRightSide>
        </StyledContainer>
    )
}
