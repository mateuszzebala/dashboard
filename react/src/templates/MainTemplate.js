import React from 'react'
import styled from 'styled-components'
import { LeftBar } from '../organisms/LeftBar'
import { TopBar } from '../organisms/TopBar'

const StyledWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    min-height: 100vh;
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
    background-color: ${({ theme }) => theme.content.background};
    color: ${({ theme }) => theme.content.font};
`

export const MainTemplate = ({ title = '', children }) => {
    const [leftbarOpen, setLeftbarOpen] = React.useState(true)
    return (
        <StyledWrapper>
            <LeftBar open={leftbarOpen} />
            <StyledRightSide>
                <TopBar title={title} setOpen={setLeftbarOpen} />
                <StyledContent>{children}</StyledContent>
            </StyledRightSide>
        </StyledWrapper>
    )
}
