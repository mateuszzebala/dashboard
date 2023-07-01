import React from 'react'
import { BsFileEarmarkBinary, BsFolder } from 'react-icons/bs'
import styled from 'styled-components'
import { Tooltip } from '../../atoms/Tooltip'
import { toBoolStr } from '../../utils/utils'
import { FaLock } from 'react-icons/fa'

const StyledWrapper = styled.div`
    aspect-ratio: 1/1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: ${({ theme, selected }) =>
        selected ? theme.primary : theme.secondary};
    color: ${({ theme, selected }) =>
        selected ? theme.secondary : theme.primary};
    box-shadow: 0 0 5px -4px ${({ theme }) => theme.primary};
    border-radius: 5px;
    height: 100px;
    width: 100px;
    font-size: 15px;
    cursor: pointer;
    user-select: none;
    position: relative;
`
const StyledFilename = styled.div`
    white-space: nowrap;
    width: 90%;
    overflow: hidden;
    font-size: 15px;
    text-overflow: ellipsis;
    text-align: center;
`
const StyledIcon = styled.div`
    font-size: 40px;
`

const StyledLockIcon = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
`

export const ItemTile = ({
    filename,
    isFile,
    setLocation,
    selected,
    access,
    reloadPos,
    setPos,
    ...props
}) => {
    const wrapperRef = React.useRef()
    React.useEffect(() => {
        const bcr = wrapperRef.current.getBoundingClientRect()
        setPos(bcr)
    }, [reloadPos])

    return (
        <Tooltip text={filename}>
            <StyledWrapper
                ref={wrapperRef}
                selected={toBoolStr(selected)}
                {...props}
                onClick={() => {
                    setLocation(filename)
                }}
            >
                <StyledIcon>
                    {isFile ? <BsFileEarmarkBinary /> : <BsFolder />}
                </StyledIcon>
                <StyledFilename>{filename}</StyledFilename>
                {!access && (
                    <StyledLockIcon>
                        <FaLock />
                    </StyledLockIcon>
                )}
            </StyledWrapper>
        </Tooltip>
    )
}
