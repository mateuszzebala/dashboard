import React from 'react'
import { ItemTile } from './ItemTile'
import styled from 'styled-components'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import useResizeObserver from 'use-resize-observer'
import { Loading } from '../../atoms/Loading'
import {centerEllipsis, toBoolStr} from '../../utils/utils'
import { useLoading, useModalForm } from '../../utils/hooks'
import {Confirm} from '../../atoms/modalforms/Confirm'
import {MdOutlineDriveFileMove} from 'react-icons/md'

const StyledWrapper = styled.div`
    display: ${({list})=>list ? 'flex' : 'grid'};
    flex-direction: column;
    align-items: stretch;
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
    box-sizing: border-box;
`

const StyledLoading = styled.div`
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
`

const StyledDragItems = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${({theme})=>theme.accent}CC;
  border-radius: 4px;
  position: absolute;
  color: ${({theme})=>theme.secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: move;
  justify-content: center;
  gap: 5px;
  left: ${({x})=>x-40}px;
  top: ${({y})=>y-40}px;
  h1{
    font-size: 40px;
    margin: 0;
  }
  span{
    font-weight: bold;
  }
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
    setReload,
    reload,
    list=false,
    setData,
}) => {
    const load = useLoading()
    const modalForm = useModalForm()
    const [loading, setLoading] = React.useState(true)
    const [pos, setPos] = React.useState({})
    const [reloadPos, setReloadPos] = React.useState(0)
    const [dragItemsPos, setDragItemsPos] = React.useState({x: 0, y: 0})
    const [dragging, setDragging] = React.useState(false)
    const [toDropElement, setToDropElement] = React.useState()
    const [selectRect, setSelectRect] = React.useState({
        mouseDown: false,
        show: false,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
    })

    React.useEffect(()=>{
        !dragging && setToDropElement(null)
    }, [dragging])

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
        if(dragging && toDropElement && selectedItems){
            modalForm({
                content: Confirm,
                title: 'MOVE ITEMS',
                text: `Move ${selectedItems.length} item${selectedItems.length > 1 && 's'} to ${centerEllipsis(toDropElement.name, 20)}?`,
                icon: <MdOutlineDriveFileMove/>,
                todo: ()=>{
                    load({show: true, text: 'MOVING ITEMS'})
                    FETCH(ENDPOINTS.files.move(), {moveTo: toDropElement.path, items: selectedItems.map(item => item.path).join(';;;')}).then(data => {
                        setReload(prev => prev + 1)
                        load({show: false})
                    })
                }
            })
        }
        setDragging(false)
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
        setDragItemsPos({x: e.clientX, y: e.clientY})
        e.preventDefault()
        if(dragging){
            const toDropElements = [...folders, ...files].filter((item) => {
                const bcr = pos[item.name]
                return (
                    bcr.x <= dragItemsPos.x && bcr.x + bcr.width > dragItemsPos.x && bcr.y <= dragItemsPos.y && bcr.y + bcr.height >= dragItemsPos.y
                )
            }).filter(item => !selectedItems.includes(item)).filter(item => !item.is_file)
            setToDropElement(toDropElements.length > 0 ? toDropElements[0] : null)
        }
        else if (selectRect.mouseDown) {
            setSelectRect((prev) => ({
                ...prev,
                show: prev.mouseDown,
                x2: e.clientX,
                y2: e.clientY,
            }))
            const rectPosition = {
                top: selectRect.y1 < selectRect.y2 ? selectRect.y1 : selectRect.y2,
                left: selectRect.x1 < selectRect.x2 ? selectRect.x1 : selectRect.x2,
                width: Math.abs(selectRect.x1 - selectRect.x2),
                height: Math.abs(selectRect.y1 - selectRect.y2)
            }
            const newSelectedItems = [...folders, ...files].filter((item) => {
                const bcr = pos[item.name]
                return (
                    bcr.x + bcr.width > rectPosition.left &&
                    bcr.x < rectPosition.left + rectPosition.width &&
                    bcr.y + bcr.height > rectPosition.top &&
                    bcr.y < rectPosition.top + rectPosition.height
                )
            })

            setSelectedItems((prev) =>
                e.shiftKey ? [...new Set([...prev, ...newSelectedItems])] : newSelectedItems
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
    }, [folders, files, list])

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
                list={toBoolStr(list)}
                ref={contentRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                    setSelectRect((prev) => ({
                        ...prev,
                        show: false,
                        mouseDown: false,
                    }))
                    setDragging(false)
                }}
            >
                {folders.map((folder) => (
                    <ItemTile
                        list={list}
                        item={folder}
                        access={folder.access}
                        reload={reloadPos}
                        dragging={dragging}
                        toDrop={folder === toDropElement}
                        setDragging={setDragging}
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
                        list={list}
                        item={file}
                        access={file.access}
                        reload={reloadPos}
                        dragging={dragging}
                        toDrop={file === toDropElement}
                        setDragging={setDragging}
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
                {selectRect.show && !dragging && (
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
                {dragging && <StyledDragItems x={dragItemsPos.x} y={dragItemsPos.y}><h1>{selectedItems.length}</h1> <span>items</span></StyledDragItems>}
            </StyledWrapper>
        </>
    )
}
