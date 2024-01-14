import React from 'react'

export const MessageContext = React.createContext([])

export const useMessage = () => {
    const [messages, setMessages] = React.useContext(MessageContext)
    const counterRef = React.useRef(0)

    function newMessage(message) {
        counterRef.current += 1
        message['id'] = counterRef.current
        setMessages((prev) => [...prev, message])
    }

    function removeMessage(id) {
        setMessages(prev => Object.values(prev).filter((message) => message.id != id))
    }

    return { messages, newMessage, setMessages, removeMessage }
}
