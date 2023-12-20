import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'
import {
    BsFileEarmarkImage,
    BsFileExcel,
    BsFileMusic,
    BsFileSpreadsheet,
    BsFileWord,
} from 'react-icons/bs'
import { FaRegFileVideo } from 'react-icons/fa'
import { BiEditAlt } from 'react-icons/bi'
import { FiCode, FiEdit, FiImage, FiMusic, FiType, FiVideo } from 'react-icons/fi'

const StyledButtons = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(30px, 90px));
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
                    icon={<FiCode />}
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
                    icon={<FiImage />}
                />
                <span>IMAGE</span>
            </StyledColumn>
            <StyledColumn>
                <Button
                    second
                    onClick={() => {
                        setOpen(false)
                        todo('video')
                    }}
                    size={2}
                    icon={<FiVideo />}
                />
                <span>VIDEO v2</span>
            </StyledColumn>
            <StyledColumn>
                <Button
                    second
                    onClick={() => {
                        setOpen(false)
                        todo('audio')
                    }}
                    size={2}
                    icon={<FiMusic />}
                />
                <span>AUDIO v2</span>
            </StyledColumn>
            <StyledColumn>
                <Button
                    second
                    onClick={() => {
                        setOpen(false)
                        todo('docs')
                    }}
                    size={2}
                    icon={<FiType />}
                />
                <span>DOCS v2</span>
            </StyledColumn>
            <StyledColumn>
                <Button
                    second
                    onClick={() => {
                        setOpen(false)
                        todo('sheets')
                    }}
                    size={2}
                    icon={<BsFileSpreadsheet/>}
                />
                <span>SHEETS v2</span>
            </StyledColumn>
        </StyledButtons>
    )
}
