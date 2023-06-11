import React from 'react'
import { Curtain } from '../atoms/Curtain'
import { toBoolStr } from '../utils/utils'
import styled from 'styled-components'

const StyledCurtain = styled.div`
    display: ${({ show }) => (show ? 'flex' : 'none')};
`

export const RootTemplate = ({ children, loadingTime = 2 }) => {
    const [show, setShow] = React.useState(true)

    React.useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, loadingTime * 1000)
    }, [])

    return (
        <>
            <StyledCurtain show={toBoolStr(show)}>
                {' '}
                <Curtain loading time={loadingTime} />
            </StyledCurtain>
            {children}
        </>
    )
}
