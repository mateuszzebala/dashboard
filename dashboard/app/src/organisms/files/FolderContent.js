import React from 'react'
import { ItemTile } from './ItemTile'
import styled from 'styled-components'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import useResizeObserver from 'use-resize-observer'
import { Loading } from '../../atoms/Loading'
import { toBoolStr } from '../../utils/utils'

const StyledWrapper = styled.div`
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(auto-fit, 100px);
    grid-template-rows: repeat(auto-fit, 100px);
    overflow: scroll;
    min-height: ${({ content }) => (content ? '100%' : '0')};
    max-height: 100%;
`

const StyledSelectRect = styled.div`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    position: absolute;
    top: ${({ top }) => top}px;
    left: ${({ left }) => left}px;
    background-color: ${({ theme }) => theme.primary}55;
    border-radius: 3px;
    border: 3px solid ${({ theme }) => theme.primary};
    box-sizing: border-box;
`

const StyledLoading = styled.div`
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
`

export const FolderContent = ({
    path,
    setPath,
    selectedItems,
    setSelectedItems,
    files,
    setFiles,
    folders,
    setFolders,
    reload,

    setData,
}) => {
    const [loading, setLoading] = React.useState(true)
    const [pos, setPos] = React.useState({})
    const [reloadPos, setReloadPos] = React.useState(0)

    const [selectRect, setSelectRect] = React.useState({
        mouseDown: false,
        show: false,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
    })

    const { ref: contentRef } = useResizeObserver({
        onResize: () => {
            setReloadPos((prev) => prev + 1)
        },
    })

    const handleMouseDown = (e) => {
        e.button === 0 &&
            setSelectRect({
                x1: e.clientX,
                y1: e.clientY,
                x2: e.clientX,
                y2: e.clientY,
                mouseDown: true,
                show: false,
            })
    }

    const handleMouseUp = (e) => {
        e.preventDefault()
        setSelectRect({
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            mouseDown: false,
            show: false,
        })
    }

    const handleMouseMove = (e) => {
        if (selectRect.mouseDown) {
            setSelectRect((prev) => ({
                ...prev,
                show: prev.mouseDown,
                x2: e.clientX,
                y2: e.clientY,
            }))
            const top =
                selectRect.y1 < selectRect.y2 ? selectRect.y1 : selectRect.y2
            const left =
                selectRect.x1 < selectRect.x2 ? selectRect.x1 : selectRect.x2
            const width = Math.abs(selectRect.x1 - selectRect.x2)
            const height = Math.abs(selectRect.y1 - selectRect.y2)
            const newSelectedItems = [...folders, ...files].filter((item) => {
                const bcr = pos[item.name]
                return (
                    bcr.x + bcr.width > left &&
                    bcr.x < left + width &&
                    bcr.y + bcr.height > top &&
                    bcr.y < top + height
                )
            })

            setSelectedItems((prev) =>
                e.shiftKey ? [...prev, ...newSelectedItems] : newSelectedItems
            )
        }
    }

    React.useEffect(() => {
        setLoading(true)
        FETCH(ENDPOINTS.files.content(), {
            path,
        }).then((data) => {
            setData(data.data)
            setFiles(data.data.files)
            setFolders(data.data.folders)
            setLoading(false)
        })
    }, [path, reload])

    React.useEffect(() => {
        setSelectedItems([])
    }, [path])

    React.useEffect(() => {
        setReloadPos((prev) => prev + 1)
    }, [folders, files])

    return (
        <>
            {loading && (
                <StyledLoading>
                    <Loading size={2} />
                </StyledLoading>
            )}
            <StyledWrapper
                onScroll={() => {
                    setReloadPos((prev) => prev + 1)
                }}
                content={toBoolStr([...folders, ...files].length > 0)}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                ref={contentRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                    setSelectRect((prev) => ({
                        ...prev,
                        show: false,
                        mouseDown: false,
                    }))
                }}
            >
                {folders.map((folder) => (
                    <ItemTile
                        item={folder}
                        access={folder.access}
                        reload={reloadPos}
                        setPos={(val) => {
                            setPos((prev) => ({ ...prev, [folder.name]: val }))
                        }}
                        setSelectedItems={setSelectedItems}
                        selected={selectedItems.includes(folder)}
                        setLocation={() => setPath(folder.path)}
                        key={folder.name}
                        filename={folder.name}
                        isFile={false}
                    />
                ))}
                {files.map((file) => (
                    <ItemTile
                        item={file}
                        access={file.access}
                        reload={reloadPos}
                        setPos={(val) => {
                            setPos((prev) => ({ ...prev, [file.name]: val }))
                        }}
                        setSelectedItems={setSelectedItems}
                        selected={selectedItems.includes(file)}
                        setLocation={() => setPath(file.path)}
                        key={file.name}
                        filename={file.name}
                        path={file.path}
                        isFile={true}
                        filetype={file.type}
                    />
                ))}
                {selectRect.show && (
                    <StyledSelectRect
                        onMouseUp={() => {
                            setSelectRect((prev) => ({
                                ...prev,
                                show: false,
                                mouseDown: false,
                            }))
                        }}
                        top={
                            selectRect.y1 < selectRect.y2
                                ? selectRect.y1
                                : selectRect.y2
                        }
                        left={
                            selectRect.x1 < selectRect.x2
                                ? selectRect.x1
                                : selectRect.x2
                        }
                        width={Math.abs(selectRect.x1 - selectRect.x2)}
                        height={Math.abs(selectRect.y1 - selectRect.y2)}
                    />
                )}
            </StyledWrapper>
        </>
    )
}
