import React from 'react'
import { Curtain } from '../atoms'
import { useNavigate } from 'react-router'
import { ENDPOINTS } from '../api/endpoints'
import { FETCH, INIT } from '../api/api'
import { LINKS } from '../router/links'
import { useUser } from '../utils/hooks'
import { useSearchParams } from 'react-router-dom'

export const RootTemplate = ({ children }) => {
    const [show, setShow] = React.useState(true)
    const { user, setUser } = useUser()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    React.useEffect(() => {
        setShow(true)
        if (user) {
            if (user.dashboard_access) {
                if (window.location.pathname === LINKS.auth.signin())
                    INIT().then(() => {
                        setShow(false)
                        navigate(searchParams.get('next') || LINKS.home())
                    })
                else {
                    INIT().then(() => {
                        setShow(false)
                    })
                }
            } else {
                if (window.location.pathname === LINKS.auth.signin()) {
                    setShow(false)
                } else {
                    navigate(LINKS.auth.signinNext(window.location.pathname))
                }
            }
        }
    }, [user])

    React.useEffect(() => {
        FETCH(ENDPOINTS.auth.me()).then((data) => {
            setUser(data.data)
        })
    }, [])

    return (
        <>
            {show && <Curtain loading time={2} />}
            {!show && children}
        </>
    )
}
