import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { useModalForm } from '../../utils/hooks'
import { Button } from '../../atoms/Button'
import { Input } from '../../atoms/Input'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: flex;
    gap: 20px;
`

const AgePrompt = ({ setValue, setOpen }) => {
    return (
        <StyledWrapper>
            <Input setValue={setValue} label="YOUR AGE" type="number" />
            <Button
                onClick={() => {
                    setOpen(false)
                }}
            >
                OK
            </Button>
        </StyledWrapper>
    )
}

export const RequestsPage = () => {
    const { ask } = useModalForm()
    const [age, setAge] = React.useState(null)
    return (
        <MainTemplate app={APPS.requests}>
            <Button
                onClick={() => {
                    ask({
                        content: AgePrompt,
                        title: 'HOW OLD ARE YOU?',
                        setValue: setAge,
                    })
                }}
            >
                {age !== null ? `YOUR AGE: ${age}` : 'SET YOUR AGE'}
            </Button>
        </MainTemplate>
    )
}
