import React from 'react'
import { Curtain } from '../atoms/Curtain'
import { toBoolStr } from '../utils/utils'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { endpoints } from '../api/endpoints'
import { FETCH } from '../api/api'
import { links } from '../router/links'

const StyledCurtain = styled.div`
    display: ${({ show }) => (show ? 'flex' : 'none')};
`

export const RootTemplate = ({ children }) => {
    const [show, setShow] = React.useState(true)
    const navigate = useNavigate()
    React.useEffect(() => {
        FETCH(endpoints.auth.me()).then((data) => {
            if (!data.data.signin) {
                navigate(links.auth.signin())
            }
            setShow(false)
        })
    }, [])

    return (
        <>
            <StyledCurtain show={toBoolStr(show)}>
                <Curtain loading time={2} />
            </StyledCurtain>
            {children}
        </>
    )
}
