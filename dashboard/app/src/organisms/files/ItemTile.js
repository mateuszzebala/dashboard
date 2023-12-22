import React from 'react'
import {
    BsFileBinary,
    BsFileCode,
    BsFileEarmarkImage,
    BsFileExcel,
    BsFileMusic,
    BsFilePlay,
    BsFileText,
    BsFileWord,
    BsFileZip,
    BsFolder,
} from 'react-icons/bs'
import styled from 'styled-components'
import { Tooltip } from '../../atoms'
import { toBoolStr } from '../../utils/utils'
import { FaLock } from 'react-icons/fa'

import { useModalForm } from '../../utils/hooks'
import { useNavigate } from 'react-router'
import { LINKS } from '../../router/links'
import { BiEditAlt } from 'react-icons/bi'
import { EditorChooser } from '../../atoms'

const StyledWrapper = styled.div`
    aspect-ratio: 1/1;
    display: ${({ hidden }) => (hidden ? 'none' : 'inline-flex')};
    justify-content: ${({ list }) => list ? 'flex-start' : 'center'};
    align-items: center;
    flex-direction: ${({ list }) => list ? 'row' : 'column'};
    gap: 10px;
    padding: 10px;
    opacity: ${({ dragging, selected, isFile }) => (dragging && (selected || isFile)) ? '40%' : 1};
    background-color: ${({ theme }) => theme.quaternary};
    color: ${({ theme }) => theme.primary};
    border-radius: 3px;
    height: ${({ list }) => list ? '50px' : '100px'};
    border: ${({ selected, isFile, dragging }) => dragging ? (!isFile && !selected) ? '3px' : '3px' : '3px'} solid ${({ theme, selected, toDrop, dragging }) => toDrop ? theme.accent : ((selected && dragging) ? theme.primary : selected ? theme.primary : 'transparent')};
    width: ${({ list }) => list ? '100%' : '100px'};
    font-size: 15px;
    cursor: pointer;
    user-select: none;
    position: relative;
    transition: transform 0.3s, background-color 0.3s, border-color 0.1s, border-width 0.2s;   
`

const StyledHoverWrapper = styled.div`
    display: inline-block;
    width: 100%;
    &:focus{
        outline: none;
    }
    &:hover > *, &:focus > *{
        transform: ${({ list }) => list ? 'none' : 'scale(0.9)'};
        background-color: ${({ list, theme }) => list ? theme.primary + '22' : theme.quaternary};
    }
`

const StyledFilename = styled.div`
    white-space: nowrap;
    width: 90%;
    overflow: hidden;
    font-size: 15px;
    padding: 5px 0;
    text-overflow: ellipsis;
    text-align: ${({ list }) => list ? 'left' : 'center'};
`
const StyledIcon = styled.div`
    font-size: ${({ list }) => list ? '20px' : '35px'};
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledLockIcon = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
`

export const getIconByFileType = (type) => {
    if (type === 'audio') return <BsFileMusic />
    if (type === 'video') return <BsFilePlay />
    if (type === 'image') return <BsFileEarmarkImage />
    if (type === 'code') return <BsFileCode />
    if (type === 'program') return <BsFileBinary />
    if (type === 'docs') return <BsFileWord />
    if (type === 'sheets') return <BsFileExcel />
    if (type === 'database') return <BsFileBinary />
    if (type === 'archive') return <BsFileZip />

    return <BsFileText />
}

export const ItemTile = ({
    filename,
    isFile,
    setLocation,
    selected,
    reload,
    access,
    item,
    setSelectedItems,
    setPos,
    toDrop,
    filetype,
    hidden,
    list,
    dragging,
    setDragging,
    ...props
}) => {
    const wrapperRef = React.useRef()
    const modalForm = useModalForm()
    const navigate = useNavigate()

    React.useEffect(() => {
        const bcr = wrapperRef.current.getBoundingClientRect()
        setPos(bcr)
    }, [reload])

    return (
        <Tooltip text={filename}>
            <StyledHoverWrapper list={toBoolStr(list)} tabIndex={0}>
                <StyledWrapper
                    hidden={toBoolStr(hidden)}
                    ref={wrapperRef}
                    dragging={toBoolStr(dragging)}
                    selected={toBoolStr(selected)}
                    list={toBoolStr(list)}
                    toDrop={toBoolStr(toDrop)}
                    isFile={toBoolStr(isFile)}

                    onMouseDown={(e) => {
                        if (selected && !e.shiftKey) setDragging(true)
                        else if (!selected && !e.shiftKey) setSelectedItems([item])
                    }}
                    onClick={(e) => {
                        !isFile &&
                            !e.shiftKey &&
                            e.detail === 1 &&
                            setLocation(filename)
                        if (e.detail === 1 && (isFile || e.shiftKey)) {
                            setSelectedItems((prev) =>
                                selected
                                    ? [...prev.filter((i) => i !== item)]
                                    : [...prev, item]
                            )
                        }

                        e.detail > 1 &&
                            modalForm({
                                content: EditorChooser,
                                icon: <BiEditAlt />,
                                title: 'CHOOSE EDITOR TYPE',
                                todo: (editorType) => {
                                    navigate(
                                        LINKS.editor.edit(item.path, editorType)
                                    )
                                },
                            })
                    }}
                    {...props}
                >
                    <StyledIcon list={toBoolStr(list)}>
                        {isFile ? getIconByFileType(filetype) : <BsFolder />}
                    </StyledIcon>
                    <StyledFilename list={toBoolStr(list)}>{filename}</StyledFilename>
                    {!access && (
                        <StyledLockIcon>
                            <FaLock />
                        </StyledLockIcon>
                    )}
                </StyledWrapper>
            </StyledHoverWrapper>
        </Tooltip>
    )
}
