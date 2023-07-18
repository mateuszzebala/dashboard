import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'

import { BsFileImage } from 'react-icons/bs'
import { AiOutlineClockCircle, AiOutlineHeart } from 'react-icons/ai'

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    justify-content: space-around;
`

const StyledFiles = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    min-width: 500px;
    overflow-y: auto;

    padding: 10px;
    height: 100%;
    &::-webkit-scrollbar {
        width: 0;
    }
`

const StyledFile = styled.div`
    color: ${({ theme }) => theme.primary};
    padding: 20px 15px;
    box-shadow: 0 0 5px -3px ${({ theme }) => theme.primary};
    font-size: 20px;
    width: 100%;
    align-items: center;
    gap: 10px;
    display: flex;
    cursor: pointer;
    border-radius: 0 5px 5px 0;
    border-left: 4px solid ${({ theme }) => theme.primary};
    transition: transform 0.3s;
    &:hover {
        transform: scale(0.95);
    }
`
const StyledTitle = styled.h1`
    display: inline-flex;
    align-items: center;
    gap: 10px;
`

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
`

export const EditorPage = () => {
    return (
        <MainTemplate app={APPS.editor}>
            <StyledWrapper>
                <StyledColumn>
                    <StyledTitle>
                        <AiOutlineHeart />
                        LIKED
                    </StyledTitle>
                    <StyledFiles>
                        <StyledFile>
                            <BsFileImage /> main.py
                        </StyledFile>
                        <StyledFile>
                            <BsFileImage /> main.py
                        </StyledFile>
                        <StyledFile>
                            <BsFileImage /> main.py
                        </StyledFile>
                    </StyledFiles>
                </StyledColumn>
                <StyledColumn>
                    <StyledTitle>
                        <AiOutlineClockCircle />
                        LAST
                    </StyledTitle>
                    <StyledFiles>
                        <StyledFile>
                            <BsFileImage /> screenshot.png
                        </StyledFile>
                    </StyledFiles>
                </StyledColumn>
            </StyledWrapper>
        </MainTemplate>
    )
}
