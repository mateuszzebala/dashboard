import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { Button } from '../../atoms/Button'
import { Paginator } from '../../atoms/Paginator'
import styled from 'styled-components'

const StyledMessages = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: scroll;
    width: 100%;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`
const StyledMessage = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    font-size: 20px;
    box-shadow: 0 0 5px -3px ${({ theme }) => theme.primary};
    padding: 15px 20px;
    border-radius: 0 5px 5px 0;
    border-left: 3px solid ${({ theme }) => theme.primary};
    transition: transform 0.3s;
    cursor: pointer;
    &:hover {
        transform: scale(0.98);
    }
`

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
`

export const MessagesPage = () => {
    return (
        <MainTemplate
            app={APPS.messages}
            submenuChildren={
                <>
                    <Button second>ALL</Button>
                    <Button second>READ</Button>
                    <Button second>UNREAD</Button>
                </>
            }
        >
            <StyledWrapper>
                <StyledMessages>
                    <StyledMessage>
                        <span>mat.dsd</span>
                        <span>Lorem ipsum dolor sit amet</span>
                    </StyledMessage>
                    <StyledMessage>
                        <span>mat.dsd</span>
                        <span>Lorem ipsum dolor sit amet</span>
                    </StyledMessage>
                    <StyledMessage>
                        <span>mat.dsd</span>
                        <span>Lorem ipsum dolor sit amet</span>
                    </StyledMessage>
                    <StyledMessage>
                        <span>mat.dsd</span>
                        <span>Lorem ipsum dolor sit amet</span>
                    </StyledMessage>
                    <StyledMessage>
                        <span>mat.dsd</span>
                        <span>Lorem ipsum dolor sit amet</span>
                    </StyledMessage>
                </StyledMessages>
                <Paginator pages={10} value={3} />
            </StyledWrapper>
        </MainTemplate>
    )
}
