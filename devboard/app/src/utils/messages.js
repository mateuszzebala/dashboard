import React from 'react'

export const MessageContext = React.createContext([])

let idCounter = 0

export const useMessage = () => {
    const [messages, setMessages] = React.useContext(MessageContext)
    function newMessage(message) {
        idCounter += 1
        message['id'] = idCounter
        setMessages((prev) => [...prev, message])
    }

    function removeMessage(id) {
        setMessages((prev) => Object.values(prev).filter((message) => message.id != id))
    }

    return { messages, newMessage, setMessages, removeMessage }
}
