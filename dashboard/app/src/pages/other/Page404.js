import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { Typography } from '../../atoms/Typography'
import styled from 'styled-components'
import { Link } from '../../atoms/Link'
import { LINKS } from '../../router/links'
import { TbError404 } from 'react-icons/tb'

const StyledWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    font-size: 60px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
        text-shadow: 5px 5px 0 ${({ theme }) => theme.tertiary};
    }
`

export const Page404 = () => {
    return (
        <MainTemplate
            app={{
                name: 'PAGE NOT FOUND',
                icon: TbError404,
            }}
        >
            <StyledWrapper>
                <Typography variant={'h1'}>404</Typography>
                <Link animation={false} to={LINKS.home()}>
                    BACK TO HOME
                </Link>
            </StyledWrapper>
        </MainTemplate>
    )
}
