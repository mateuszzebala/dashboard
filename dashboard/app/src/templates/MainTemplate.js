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
    user-select: none;
`

const StyledRightSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`

const StyledContent = styled.article`
    padding: ${({ padding }) => padding + 'px'};
    height: 100%;
    transition: width 0.3s;
    width: ${({ leftbarclose }) =>
        leftbarclose ? '100vw' : 'calc(100vw - 200px)'};
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
    overflow: auto;
    user-select: auto;
`

const StyledTopMenu = styled.div`
    box-shadow: 0 0 10px -6px ${({ theme }) => theme.primary};
    z-index: 2;
    width: ${({ leftbarclose }) =>
        leftbarclose ? '100vw' : 'calc(100vw - 200px)'};
    transition: width 0.3s;
    user-select: none;
`

export const MainTemplate = ({
    app,
    children,
    title = '',
    submenuChildren = '',
    topbarLink,
    padding = 10,
}) => {
    const [cookies, setCookies, removeCookies] = useCookies()
    const [leftbarClose, setLeftbarClose] = React.useState(cookies.leftbarClose)
    const [hideSubmenu, setHideSubmenu] = React.useState(cookies.hideSubmenu)

    React.useEffect(()=>{
        let windowTitle = `Dashboard - ${app.name}`
        if(title){
            windowTitle += ` - ${title}`
        }
        document.title = windowTitle
    }, [app, title])
  
    React.useEffect(() => {
        if (cookies.leftbarClose === leftbarClose) return
        removeCookies(['leftbarClose'])
        const today = new Date()
        setCookies(['leftbarClose'], toBoolStr(leftbarClose), {
            expires: new Date(today.getFullYear() + 10, 1, 1),
        })
    }, [leftbarClose])

    React.useEffect(() => {
        if (cookies.showSubmenu === hideSubmenu) return
        removeCookies(['hideSubmenu'])
        const today = new Date()
        setCookies(['hideSubmenu'], toBoolStr(hideSubmenu), {
            expires: new Date(today.getFullYear() + 10, 1, 1),
        })
    }, [hideSubmenu])

    return (
        <StyledContainer>
            <LeftBar close={leftbarClose} />
            <StyledRightSide>
                <StyledTopMenu leftbarclose={toBoolStr(leftbarClose)}>
                    <TopBar
                        title={title}
                        app={app}
                        close={leftbarClose}
                        setClose={setLeftbarClose}
                        topbarLink={topbarLink}
                        hideSubmenu={hideSubmenu}
                        setHideSubmenu={setHideSubmenu}
                        submenuExists={toBoolStr(submenuChildren)}
                    />
                    <SubMenu hideSubmenu={hideSubmenu}>
                        {submenuChildren}
                    </SubMenu>
                </StyledTopMenu>
                <StyledContent
                    padding={padding}
                    leftbarclose={toBoolStr(leftbarClose)}
                >
                    {children}
                </StyledContent>
            </StyledRightSide>
        </StyledContainer>
    )
}
