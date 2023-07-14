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
import { Tooltip } from '../../atoms/Tooltip'
import { toBoolStr } from '../../utils/utils'
import { FaLock } from 'react-icons/fa'
import { ContextMenu } from '../../atoms/ContextMenu'
import { useModalForm } from '../../utils/hooks'
import { useNavigate } from 'react-router'
import { links } from '../../router/links'
import { BiEditAlt } from 'react-icons/bi'
import { EditorChooser } from '../../molecules/EditorChooser'

const StyledWrapper = styled.div`
    aspect-ratio: 1/1;
    display: ${({ hidden }) => (hidden ? 'none' : 'inline-flex')};
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 5px -4px ${({ theme, selected }) => (selected ? theme.accent : theme.primary)};
    border-radius: 3px;
    height: 100px;
    border: 3px solid
        ${({ theme, selected }) => (selected ? theme.primary : theme.secondary)};
    width: 100px;
    font-size: 15px;
    cursor: pointer;
    user-select: none;
    position: relative;
    transition: transform 0.3s;
    &:hover {
        transform: scale(0.9);
    }
`
const StyledFilename = styled.div`
    white-space: nowrap;
    width: 90%;
    overflow: hidden;
    font-size: 15px;
    padding: 5px 0;
    text-overflow: ellipsis;
    text-align: center;
`
const StyledIcon = styled.div`
    font-size: 35px;
`

const StyledLockIcon = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
`

const getIconByFileType = (type) => {
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
    contextMenu,
    setSelectedItems,
    setPos,
    filetype,
    hidden,
    ...props
}) => {
    const wrapperRef = React.useRef()
    const { ask } = useModalForm()
    const navigate = useNavigate()
    React.useEffect(() => {
        const bcr = wrapperRef.current.getBoundingClientRect()
        setPos(bcr)
    }, [reload])

    return (
        <ContextMenu data={contextMenu}>
            <Tooltip text={filename}>
                <StyledWrapper
                    hidden={toBoolStr(hidden)}
                    ref={wrapperRef}
                    selected={toBoolStr(selected)}
                    {...props}
                    onClick={(e) => {
                        !isFile && !e.shiftKey && setLocation(filename)
                        isFile &&
                            setSelectedItems((prev) =>
                                selected
                                    ? [...prev.filter((i) => i !== item)]
                                    : [...prev, item]
                            )
                        e.shiftKey &&
                            setSelectedItems((prev) =>
                                selected
                                    ? [...prev.filter((i) => i !== item)]
                                    : [...prev, item]
                            )
                        e.detail > 1 &&
                            ask({
                                content: EditorChooser,
                                icon: <BiEditAlt />,
                                title: 'Choose Other Editor',
                                todo: (editorType) => {
                                    navigate(
                                        links.editor.edit(item.path, editorType)
                                    )
                                },
                            })
                    }}
                >
                    <StyledIcon>
                        {isFile ? getIconByFileType(filetype) : <BsFolder />}
                    </StyledIcon>
                    <StyledFilename>{filename}</StyledFilename>
                    {!access && (
                        <StyledLockIcon>
                            <FaLock />
                        </StyledLockIcon>
                    )}
                </StyledWrapper>
            </Tooltip>
        </ContextMenu>
    )
}
