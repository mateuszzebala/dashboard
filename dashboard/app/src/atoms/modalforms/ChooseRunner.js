import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'
import { FaPython, FaNodeJs, FaJava, FaLinux } from 'react-icons/fa'
import { TbBrandCpp } from 'react-icons/tb'
import { SiDotnet, SiWindows11 } from 'react-icons/si'
import { Input } from '../Input'

const StyledButtons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 30px;
`

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const StyledBottom = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`

export const ChooseRunner = ({ filename, setOpen, todo = () => {} }) => {
    const [command, setCommand] = React.useState('')
    return (
        <StyledWrapper>
            <StyledButtons>
                <StyledColumn>
                    <Button
                        onClick={() => {
                            setCommand(`python ${filename}`)
                        }}
                        size={2}
                        icon={<FaPython />}
                    />
                    <span>PYTHON</span>
                </StyledColumn>
                <StyledColumn>
                    <Button
                        onClick={() => {
                            setCommand(`node ${filename}`)
                        }}
                        size={2}
                        icon={<FaNodeJs />}
                    />
                    <span>NODE</span>
                </StyledColumn>
                <StyledColumn>
                    <Button
                        onClick={() => {
                            setCommand(`gcc ${filename}`)
                        }}
                        size={2}
                        icon={<TbBrandCpp />}
                    />
                    <span>GCC</span>
                </StyledColumn>
                <StyledColumn>
                    <Button
                        onClick={() => {
                            setCommand('dotnet run')
                        }}
                        size={2}
                        icon={<SiDotnet />}
                    />
                    <span>DOTNET</span>
                </StyledColumn>
                <StyledColumn>
                    <Button
                        onClick={() => {
                            setCommand(`java ${filename}`)
                        }}
                        size={2}
                        icon={<FaJava />}
                    />
                    <span>JAVA</span>
                </StyledColumn>
                <StyledColumn>
                    <Button
                        onClick={() => {
                            setCommand(`./${filename}`)
                        }}
                        size={2}
                        icon={<FaLinux />}
                    />
                    <span>SHELL</span>
                </StyledColumn>
                <StyledColumn>
                    <Button
                        onClick={() => {
                            setCommand(`${filename}`)
                        }}
                        size={2}
                        icon={<SiWindows11 />}
                    />
                    <span>CMD</span>
                </StyledColumn>
            </StyledButtons>
            <StyledBottom>
                <Input
                    value={command}
                    setValue={setCommand}
                    label={'COMMAND'}
                />
                <Button
                    size={1.2}
                    onClick={() => {
                        todo(command)
                        setOpen(false)
                    }}
                >
                    OK
                </Button>
            </StyledBottom>
        </StyledWrapper>
    )
}
