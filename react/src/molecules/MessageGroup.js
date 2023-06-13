import React from 'react'
import styled from 'styled-components'
import { Message } from '../atoms/Message'
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
            {Object.keys(messages).map((messageKey) => (
                <Message
                    key={messageKey}
                    id={messageKey}
                    text={messages[messageKey].text}
                    error={messages[messageKey].error}
                    warning={messages[messageKey].warning}
                    success={messages[messageKey].success}
                    onClose={handleCloseMessage}
                />
            ))}
        </StyledWrapper>
    )
}
