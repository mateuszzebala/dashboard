import React from 'react'

export const useOnClickOutside = (ref, handler) => {
    React.useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return
            }
            handler(event)
        }
        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)
        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handler])
}

export const useMediaQuery = (query) => {
    const getMatches = (query) => {
        return window.matchMedia(query).matches
    }

    const [matches, setMatches] = React.useState(getMatches(query))

    function handleChange() {
        setMatches(getMatches(query))
    }

    React.useEffect(() => {
        const matchMedia = window.matchMedia(query)
        handleChange()
        matchMedia.addEventListener('change', handleChange)
        return () => {
            matchMedia.removeEventListener('change', handleChange)
        }
    }, [query])

    return matches
}

export const ConfirmContext = React.createContext([])

export const useConfirm = () => {
    const [confirm, setConfirm] = React.useContext(ConfirmContext)

    const ask = (question, todo) => {
        setConfirm({
            question,
            todo,
            onCancel: ()=>{
                setConfirm(null)
            }
        })
    }

    return {confirm, ask}
}