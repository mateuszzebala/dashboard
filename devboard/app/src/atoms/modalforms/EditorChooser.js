import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'
import { BsFileSpreadsheet } from 'react-icons/bs'
import { FiCode, FiImage, FiMusic, FiType, FiVideo } from 'react-icons/fi'

const StyledButtons = styled.div`
    display: flex;
    gap: 5px;
    flex-direction: column;
    align-items: stretch;
    padding: 10px;
    button {
        gap: 20px;
    }
`

export const EditorChooser = ({ setOpen, todo = () => {} }) => {
    return (
        <StyledButtons>
            <Button
                width={'100%'}
                onClick={() => {
                    setOpen(false)
                    todo('text')
                }}
                size={1.1}
            >
                <FiCode /> TEXT
            </Button>
            <Button
                width={'100%'}
                onClick={() => {
                    setOpen(false)
                    todo('image')
                }}
                size={1.1}
            >
                <FiImage /> IMAGE
            </Button>
            <Button
                second
                width={'100%'}
                onClick={() => {
                    setOpen(false)
                    todo('video')
                }}
                size={1.1}
            >
                <FiVideo /> VIDEO
            </Button>
            <Button
                second
                width={'100%'}
                onClick={() => {
                    setOpen(false)
                    todo('audio')
                }}
                size={1.1}
            >
                <FiMusic /> AUDIO
            </Button>
            <Button
                second
                width={'100%'}
                onClick={() => {
                    setOpen(false)
                    todo('docs')
                }}
                size={1.1}
            >
                <FiType /> DOCS
            </Button>
            <Button
                second
                width={'100%'}
                onClick={() => {
                    setOpen(false)
                    todo('sheets')
                }}
                size={1.1}
            >
                <BsFileSpreadsheet /> SHEETS
            </Button>
        </StyledButtons>
    )
}
