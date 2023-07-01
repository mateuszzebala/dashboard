import React from 'react'
import styled from 'styled-components'
import { usePrompt } from '../utils/hooks'
import { Prompt } from '../atoms/Prompt'

const StyledWrapper = styled.div``

export const PromptContainer = () => {
    const { prompt } = usePrompt()

    return <StyledWrapper>{prompt && <Prompt {...prompt} />}</StyledWrapper>
}
