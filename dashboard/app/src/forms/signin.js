import styled from 'styled-components'
import React from 'react'
import { Input } from '../atoms/Input'
import { Button } from '../atoms/Button'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    justify-content: center;
`

export const SignInForm = () => {
    return (
        <StyledWrapper>
            <Input label={'Username'} />
            <Input type={'password'} label={'Password'} />
            <Input type={'password'} label={'Password again'} />
            <Input type={'date'} label={'Date of birth'} />
            <Button>SIGN IN</Button>
        </StyledWrapper>
    )
}
