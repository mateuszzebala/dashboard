import React from 'react'
import { useCookies } from 'react-cookie'

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

export const ThemeContext = React.createContext([])

export const useTheme = () => {
    const [theme, setTheme] = React.useContext(ThemeContext)
    const [cookies, setCookies] = useCookies(['theme'])

    const updateTheme = (newTheme) => {
        setTheme((prev) => ({ ...prev, ...newTheme }))
    }

    React.useEffect(() => {
        setCookies('theme', theme)
    }, [theme])

    return [theme, updateTheme]
}

export const ModalFormContext = React.createContext([])

export const useModalForm = () => {
    const setModalForm = React.useContext(ModalFormContext)[1]

    const ask = (form) => {
        setModalForm(form)
    }

    return ask
}

export const UserContext = React.createContext({})

export const useUser = () => {
    const [user, setUser] = React.useContext(UserContext)
    return { user, setUser }
}

export const GlobalStateContext = React.createContext({})

export const useGlobalState = () => {
    const [globalState, setGlobalState] = React.useContext(UserContext)
    return { globalState, setGlobalState }
}
