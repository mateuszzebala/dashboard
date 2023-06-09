import React from 'react'
import styled from 'styled-components'
import { Modal } from '../../atoms/Modal'

const StyledWrapper = styled.div``

export const SelectItem = ({ modelName }) => {
    return (
        <StyledWrapper>
            <Modal open={true} title={`Select - ${modelName}`}>
                s
            </Modal>
        </StyledWrapper>
    )
}
