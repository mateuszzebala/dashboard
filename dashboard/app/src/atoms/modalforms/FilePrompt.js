import React from 'react'
import { Button } from '../Button'
import styled from 'styled-components'
import { Typography } from '../Typography'
import { centerEllipsis } from '../../utils/utils'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
`

const StyledHiddenInput = styled.input`
    display: none;
`

const StyledButtons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
`

const StyledDropArea = styled.div`
    box-shadow: 0 0 8px -3px ${({ theme }) => theme.primary};
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 180px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
    border: dashed 3px ${({ theme }) => theme.primary};
    text-overflow: ellipsis;
    padding: 5px;
    white-space: nowrap;
    overflow: hidden;
    border-radius: 20px;
    &:hover {
        background-color: ${({ theme }) => theme.primary}22;
    }
    h5 {
        font-size: 20px;
        font-weight: normal;
    }
`

export const FilePrompt = ({ setOpen, todo = () => {}, initValue }) => {
    const [value, setValue] = React.useState(initValue || '')
    const inputRef = React.useRef()

    return (
        <StyledWrapper>
            <StyledHiddenInput
                type="file"
                onChange={(e) => {
                    setValue(e.target.files[0])
                }}
                ref={inputRef}
            />
            <StyledDropArea
                onDrop={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    const { files } = e.dataTransfer
                    if (files.length) {
                        setValue(files[0])
                    }
                }}
                onDragOver={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                }}
                onClick={() => {
                    inputRef.current.click()
                }}
            >
                {value ? (
                    <Typography variant={'h5'}>
                        {centerEllipsis(value.name, 20)}
                    </Typography>
                ) : (
                    <>
                        <Typography variant={'h5'}>UPLOAD</Typography>
                        <Typography variant={'span'}>OR DROP</Typography>
                    </>
                )}
            </StyledDropArea>
            <StyledButtons>
                <Button
                    second
                    size={1}
                    onClick={() => {
                        setOpen(false)
                        todo(value)
                    }}
                >
                    UPLOAD
                </Button>
            </StyledButtons>
        </StyledWrapper>
    )
}
