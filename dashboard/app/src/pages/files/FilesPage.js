import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { FolderContent } from '../../organisms/files/FolderContent'
import { Button } from '../../atoms/Button'
import { BsFilePlus, BsFolderPlus } from 'react-icons/bs'
import { Input } from '../../atoms/Input'
import { FloatingActionButton } from '../../atoms/FloatingActionButton'
import styled from 'styled-components'
import { FaArrowLeft, FaCheck, FaSearch } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'
import { BiCopy, BiCut, BiPaste, BiRename } from 'react-icons/bi'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { useSearchParams } from 'react-router-dom'
import { usePrompt } from '../../utils/hooks'

const StyledMenu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 10px;
`

const StyledMenuSide = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

export const FilesPage = () => {
    const { ask } = usePrompt()
    const [searchParams, setSearchParams] = useSearchParams()
    const [path, setPath] = React.useState('')
    const [initData, setInitData] = React.useState({})
    const [selectedItems, setSelectedItems] = React.useState([])
    const [files, setFiles] = React.useState([])
    const [folders, setFolders] = React.useState([])
    const [data, setData] = React.useState({})

    const handleSetPath = () => {
        setSearchParams({
            path,
        })
    }

    React.useEffect(() => {
        path && handleSetPath()
    }, [path])

    React.useEffect(() => {
        if (searchParams.get('path')) {
            setPath(searchParams.get('path'))
        } else {
            setPath(initData.home)
        }
    }, [searchParams])

    React.useEffect(() => {
        FETCH(ENDPOINTS.files.init()).then((data) => {
            setInitData(data.data)
            if (searchParams.get('path')) {
                setPath(searchParams.get('path'))
            } else {
                setPath(data.data.home)
            }
        })
    }, [])

    const [searchValue, setSearchValue] = React.useState('')
    return (
        <MainTemplate
            app={APPS.files}
            title={path}
            submenuChildren={
                <StyledMenu>
                    <StyledMenuSide>
                        <Button
                            tooltip={'FOLDER UP'}
                            icon={<FaArrowLeft />}
                            onClick={() => {
                                setPath(data.parent)
                            }}
                        />
                        <Button
                            tooltip={'SELECT ALL'}
                            icon={<FaCheck />}
                            onClick={() => {
                                setSelectedItems((prev) =>
                                    prev.length > 0
                                        ? []
                                        : [...folders, ...files]
                                )
                            }}
                        />
                        <Button
                            tooltip={'NEW FILE'}
                            icon={<BsFilePlus />}
                            onClick={() => {
                                ask(
                                    <>
                                        <BsFilePlus />
                                        FILE NAME
                                    </>,
                                    () => {},
                                    'text'
                                )
                            }}
                        />
                        <Button
                            tooltip={'NEW FOLDER'}
                            icon={<BsFolderPlus />}
                            onClick={() => {
                                ask(
                                    <>
                                        <BsFolderPlus />
                                        FOLDER NAME
                                    </>,
                                    () => {},
                                    'text'
                                )
                            }}
                        />

                        <Button tooltip={'PASTE'} icon={<BiPaste />} />

                        {selectedItems.length > 0 ? (
                            <>
                                <Button tooltip={'COPY'} icon={<BiCopy />} />
                                <Button tooltip={'CUT'} icon={<BiCut />} />
                                <Button tooltip={'DELETE'} icon={<FiTrash />} />
                            </>
                        ) : (
                            ''
                        )}
                        {selectedItems.length === 1 && (
                            <Button tooltip={'RENAME'} icon={<BiRename />} />
                        )}
                    </StyledMenuSide>
                    <StyledMenuSide>
                        <Input
                            value={searchValue}
                            setValue={setSearchValue}
                            icon={<FaSearch />}
                            label={'SEARCH'}
                        />
                    </StyledMenuSide>
                </StyledMenu>
            }
        >
            {initData && path && (
                <FolderContent
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    path={path}
                    setPath={setPath}
                    files={files}
                    setFiles={setFiles}
                    folders={folders}
                    setFolders={setFolders}
                    data={data}
                    setData={setData}
                />
            )}
            <FloatingActionButton
                icon={<BsFilePlus />}
                size={1.3}
                right={80}
                onClick={() => {
                    ask(
                        <>
                            <BsFilePlus />
                            FILE NAME
                        </>,
                        () => {},
                        'text'
                    )
                }}
            />
            <FloatingActionButton
                size={1.3}
                icon={<BsFolderPlus />}
                onClick={() => {
                    ask(
                        <>
                            <BsFolderPlus />
                            FOLDER NAME
                        </>,
                        () => {},
                        'text'
                    )
                }}
            />
            <FloatingActionButton
                right={140}
                size={1.3}
                icon={<FaArrowLeft />}
                onClick={() => {
                    setPath(data.parent)
                }}
            />
        </MainTemplate>
    )
}
