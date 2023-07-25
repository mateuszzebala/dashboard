import React from 'react'
import { Curtain } from '../atoms/Curtain'
import { toBoolStr } from '../utils/utils'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { ENDPOINTS } from '../api/endpoints'
import { FETCH } from '../api/api'
import { LINKS } from '../router/links'

const StyledCurtain = styled.div`
    display: ${({ show }) => (show ? 'flex' : 'none')};
`

export const RootTemplate = ({ children }) => {
    const [show, setShow] = React.useState(true)
    const navigate = useNavigate()
    React.useEffect(() => {
        FETCH(ENDPOINTS.auth.me()).then((data) => {
            if (window.location.pathname !== LINKS.auth.signin()) {
                if (!data.data.signin) {
                    navigate(LINKS.auth.signinNext(window.location.pathname))
                }
            }
            setShow(false)
        })
    }, [])

    return (
        <>
            <StyledCurtain show={toBoolStr(show)}>
                <Curtain loading time={2} />
            </StyledCurtain>
            {!show && children}
        </>
    )
}
