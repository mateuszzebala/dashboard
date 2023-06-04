import React from 'react'
import { MainTemplate } from '../templates/MainTemplate'
import { Typography } from '../atoms/Typography'
import styled from 'styled-components'
import { Link } from '../atoms/Link'
import { LINKS } from '../router/links'

const StyledWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    font-size: 60px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
        text-shadow: 5px 5px 0px black;
    }
`

export const Page404 = () => {
    return (
        <MainTemplate title={'PAGE NOT FOUND'}>
            <StyledWrapper>
                <Typography variant={'h1'}>404</Typography>
                <Link animation={false} to={LINKS.HOME}>
                    BACK TO HOME
                </Link>
            </StyledWrapper>
        </MainTemplate>
    )
}
