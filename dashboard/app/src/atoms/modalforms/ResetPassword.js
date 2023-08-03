import React from 'react'

import { Input } from '../Input'
import styled from 'styled-components'
import { Button } from '../Button'
import { CodeInput } from '../CodeInput'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px;
`

const StyledButton = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 20px;
`
const StyledText = styled.span`
    font-size: 20px;
    text-align: center;
`

export const ResetPassword = () => {
    const [email, setEmail] = React.useState('')
    const [code, setCode] = React.useState({})
    const [step, setStep] = React.useState(0)

    const nextStep = () => setStep((prev) => prev + 1)

    return (
        <StyledWrapper>
            {step === 0 && (
                <>
                    <Input label={'E-MAIL'} value={email} setValue={setEmail} />
                    <StyledButton>
                        <Button onClick={nextStep}>SEND CODE</Button>
                    </StyledButton>
                </>
            )}
            {step === 1 && (
                <>
                    <StyledText>
                        WE HAVE SENT <br />A CODE TO YOUR MAILBOX
                    </StyledText>
                    <CodeInput length={5} value={code} setValue={setCode} />
                    <Button onClick={nextStep}>VERIFY</Button>
                </>
            )}
            {step === 2 && <></>}
        </StyledWrapper>
    )
}
