import React from 'react'

export const MessageContext = React.createContext([])

export const useMessage = () => {
    const [messages, setMessages] = React.useContext(MessageContext)

    function newMessage(message) {
        setMessages((prev) => [...prev, message])
    }

    function removeMessage(id) {
        const newMessages = Object.keys(messages).filter((key) => key != id)
        setMessages(newMessages.map((key) => messages[key]))
    }

    return { messages, newMessage, setMessages, removeMessage }
}
