import React from 'react'
import { useCookies } from 'react-cookie'
import { FETCH } from '../api/api'
import { ENDPOINTS } from '../api/endpoints'

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

export const usemediaQuery = (query) => {
    const getMatches = (query) => {
        return window.matchmedia(query).matches
    }

    const [matches, setMatches] = React.useState(getMatches(query))

    function handleChange() {
        setMatches(getMatches(query))
    }

    React.useEffect(() => {
        const matchmedia = window.matchmedia(query)
        handleChange()
        matchmedia.addEventListener('change', handleChange)
        return () => {
            matchmedia.removeEventListener('change', handleChange)
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

    return (form) => {
        setModalForm((prev) => [...prev, form])
    }
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

export const useGlobalKey = (callback, key = '', enable = true) => {
    const todo = (e) => {
        if (key.prevent) {
            e.preventDefault()
            e.stopPropagation()
        }
        callback(e)
    }

    const handleKeyDown = (e) => {
        if (!key) return
        if (key == 'all') {
            todo(e)
        } else if (typeof key === 'string') {
            e.key === key && todo(e)
        } else {
            if (key.key !== e.key) return
            if (key.shiftKey && e.shiftKey) {
                if (key.ctrlKey) {
                    e.ctrlKey && todo(e)
                } else {
                    todo(e)
                }
            } else if (key.ctrlKey && e.ctrlKey) {
                todo(e)
            } else if (!key.ctrlKey && !key.shiftKey) {
                todo(e)
            }
        }
    }

    React.useEffect(() => {
        !!enable && document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [key, todo])
}

export const LoadingContext = React.createContext([])

export const useLoading = () => {
    const setLoading = React.useContext(LoadingContext)[1]
    return (obj) => {
        if (obj.show) {
            setLoading(obj)
        } else {
            setLoading({ show: false })
        }
    }
}

export const SettingsContext = React.createContext({})

export const useSettings = () => {
    const [settings, setSettings] = React.useContext(SettingsContext)

    const saveSettings = (newSettings = () => settings) => {
        FETCH(ENDPOINTS.settings.set(), { settings: JSON.stringify(newSettings(settings)) }).then((data) => {
            setSettings(data.data)
        })
    }

    return [settings, setSettings, saveSettings]
}
