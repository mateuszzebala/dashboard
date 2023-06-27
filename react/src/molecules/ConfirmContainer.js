import React from 'react'
import styled from 'styled-components'
import { Confirm } from '../atoms/Confirm'
import { useConfirm } from '../utils/hooks'

const StyledWrapper = styled.div``

export const ConfirmContainer = () => {
    const { confirm } = useConfirm()
    return <StyledWrapper>{confirm && <Confirm {...confirm} />}</StyledWrapper>
}
