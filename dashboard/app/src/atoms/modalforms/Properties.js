import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'
import { BsFolder } from 'react-icons/bs'
import { getIconByFileType } from '../../organisms/files/ItemTile'
import { FaLock } from 'react-icons/fa'
import { centerEllipsis } from '../../utils/utils'
import copy from 'copy-text-to-clipboard'
import { useMessage } from '../../utils/messages'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
`

const StyledIcon = styled.div`
    font-size: 60px;
`

const StyledFilename = styled.div``

export const Properties = ({item}) => {
    const {newMessage} = useMessage()
    return (
        <StyledWrapper>
            <StyledIcon>
                {item.is_file ? getIconByFileType(item.type) : <BsFolder />}
            </StyledIcon>
            <StyledFilename>{centerEllipsis(item.name, 30)}</StyledFilename>
            {!item.access && (
                <FaLock />
            )}
            <Button size={0.8} onClick={()=>{
                copy(item.path)
                newMessage({
                    text: 'PATH COPIED SUCCESSFULLY'
                })
            }}>COPY PATH</Button>
        </StyledWrapper>
    )
}
