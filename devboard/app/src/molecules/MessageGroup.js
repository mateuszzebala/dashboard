import React from 'react'
import styled from 'styled-components'
import { Message } from '../atoms'
import { useMessage } from '../utils/messages'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    gap: 10px;
    right: 0;
    padding: 10px;
    z-index: 10;

    &::-webkit-scrollbar {
        width: 0;
    }
`

export const MessageGroup = () => {
    const { messages, removeMessage } = useMessage()

    const handleCloseMessage = (id) => {
        removeMessage(id)
    }

    return (
        <StyledWrapper>
            {Object.values(messages).map((message) => {
                return <Message key={message.id} onClose={handleCloseMessage} {...message} />
            })}
        </StyledWrapper>
    )
}
