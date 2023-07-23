import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'
import {
    BsFileEarmarkImage,
    BsFileExcel,
    BsFileMusic,
    BsFileWord,
} from 'react-icons/bs'
import { FaRegFileVideo } from 'react-icons/fa'
import { BiEditAlt } from 'react-icons/bi'

const StyledButtons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 30px;
`

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const EditorChooser = ({ setOpen, todo = () => {} }) => {
    return (
        <StyledButtons>
            <StyledColumn>
                <Button
                    onClick={() => {
                        setOpen(false)
                        todo('text')
                    }}
                    size={2}
                    icon={<BiEditAlt />}
                />
                <span>TEXT</span>
            </StyledColumn>
            <StyledColumn>
                <Button
                    onClick={() => {
                        setOpen(false)
                        todo('image')
                    }}
                    size={2}
                    icon={<BsFileEarmarkImage />}
                />
                <span>IMAGE</span>
            </StyledColumn>
            <StyledColumn>
                <Button
                    onClick={() => {
                        setOpen(false)
                        todo('video')
                    }}
                    size={2}
                    icon={<FaRegFileVideo />}
                />
                <span>VIDEO</span>
            </StyledColumn>
            <StyledColumn>
                <Button
                    onClick={() => {
                        setOpen(false)
                        todo('audio')
                    }}
                    size={2}
                    icon={<BsFileMusic />}
                />
                <span>AUDIO</span>
            </StyledColumn>
            <StyledColumn>
                <Button
                    onClick={() => {
                        setOpen(false)
                        todo('docs')
                    }}
                    size={2}
                    icon={<BsFileWord />}
                />
                <span>DOCS</span>
            </StyledColumn>
            <StyledColumn>
                <Button
                    onClick={() => {
                        setOpen(false)
                        todo('sheets')
                    }}
                    size={2}
                    icon={<BsFileExcel />}
                />
                <span>SHEETS</span>
            </StyledColumn>
        </StyledButtons>
    )
}
