import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'
import { FaServer, FaDesktop } from 'react-icons/fa'

const StyledButtons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    width: 100%;
    justify-content: space-around;
    padding: 30px;
`

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const ChooseDevice = ({ setOpen, todo = () => {} }) => {
    return (
        <StyledButtons>
            <StyledColumn>
                <Button
                    onClick={() => {
                        setOpen(false)
                        todo('computer')
                    }}
                    size={2}
                    icon={<FaDesktop />}
                />
                <span>COMPUTER</span>
            </StyledColumn>
            <StyledColumn>
                <Button
                    onClick={() => {
                        setOpen(false)
                        todo('server')
                    }}
                    size={2}
                    icon={<FaServer />}
                />
                <span>SERVER</span>
            </StyledColumn>
        </StyledButtons>
    )
}
