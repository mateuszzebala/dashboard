import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { FolderContent } from '../../organisms/files/FolderContent'
import {
    Button,
    ChooseDevice,
    Confirm,
    EditorChooser,
    FilePrompt,
    FloatingActionButton,
    Prompt,
    Properties,
    SelectFolder,
} from '../../atoms'
import { BsFileArrowUp, BsFilePlus, BsFileZip, BsFolder, BsFolderPlus } from 'react-icons/bs'
import { HiDownload, HiOutlineLockClosed } from 'react-icons/hi'
import styled from 'styled-components'
import { FiArrowUp, FiCheck, FiCopy, FiGrid, FiList, FiRotateCw, FiSearch, FiTrash } from 'react-icons/fi'
import { BiCut, BiEditAlt, BiInfoCircle, BiPaste, BiRename } from 'react-icons/bi'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLoading, useModalForm, useSettings } from '../../utils/hooks'
import { LINKS } from '../../router/links'
import { useMessage } from '../../utils/messages'
import { downloadURL } from '../../utils/utils'

const StyledMenu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 10px;
`

const StyledError = styled.div`
    color: ${({ theme }) => theme.error};
    font-weight: bold;
    width: 100%;
    font-size: 30px;
    text-align: center;
    padding: 20px;
`

const StyledMenuSide = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

const FolderMenu = ({
    selectedItems,
    data,
    path,
    setPath,
    setSelectedItems,
    folders,
    files,
    setReload,
    searchValue,
    setSearchValue,
}) => {
    const modalForm = useModalForm()
    const { newMessage } = useMessage()
    const navigate = useNavigate()
    const [copied, setCopied] = React.useState({ type: null, content: null })
    const isSelectedOneFile = () => selectedItems.length === 1 && selectedItems[0].is_file
    const [searchParams] = useSearchParams()
    const load = useLoading()
    const [settings, setSettings, saveSettings] = useSettings()


    const handleNewFolder = () => {
        modalForm({
            content: Prompt,
            title: 'FOLDER NAME',
            setButton: 'CREATE',
            icon: <BsFolderPlus />,
            todo: (name) => {
                FETCH(ENDPOINTS.files.mkdir(), {
                    path,
                    name,
                }).then(() => {
                    setReload((prev) => prev + 1)
                })
            },
        })
    }

    const handleNewFile = () => {
        modalForm({
            content: Prompt,
            title: 'FILE NAME',
            setButton: 'CREATE',
            icon: <BsFilePlus />,
            todo: (name) => {
                FETCH(ENDPOINTS.files.touch(), {
                    path,
                    name,
                }).then(() => {
                    setReload((prev) => prev + 1)
                })
            },
        })
    }

    return (
        <>
            <StyledMenu>
                <StyledMenuSide>
                    {data.parent !== path && (
                        <Button
                            subContent='UP'
                            second
                            size={1.4}
                            onKey={{
                                key: 'ArrowLeft',
                                ctrlKey: true,
                                prevent: true,
                            }}
                            tooltip={'FOLDER UP'}
                            icon={<FiArrowUp />}
                            onClick={() => {
                                setPath(data.parent)
                            }}
                        />
                    )}
                    <Button
                        second
                        size={1.4}
                        subContent='SELECT'
                        tooltip={'SELECT ALL'}
                        icon={<FiCheck />}
                        onClick={() => {
                            setSelectedItems((prev) =>
                                prev.length > 0 ? [] : [...folders, ...files]
                            )
                        }}
                    />
                    <Button
                        second
                        size={1.4}
                        subContent='RELOAD'
                        tooltip={'RELOAD'}
                        onKey={{
                            key: 'r',
                            ctrlKey: true,
                            prevent: true,
                        }}
                        icon={<FiRotateCw />}
                        onClick={() => {
                            setReload((prev) => prev + 1)
                        }}
                    />
                    <Button
                        second
                        size={1.4}
                        subContent={settings['files.list'] ? 'LIST' : 'GRID'}
                        tooltip={settings['files.list'] ? 'LIST' : 'GRID'}
                        icon={settings['files.list'] ? <FiList /> : <FiGrid />}
                        onClick={() => {
                            saveSettings(prev => ({...prev, 'files.list': !prev['files.list']}))
                        }}
                    />
                    <Button
                        second
                        size={1.4}
                        subContent='TERMINAL'
                        tooltip={'OPEN IN TERMINAL'}
                        icon={<APPS.terminal.icon />}
                        to={LINKS.terminal.indexPath(path)}
                    />
                    {copied.type != null && <Button
                        second
                        size={1.4}
                        tooltip={'PASTE'}
                        subContent='PASTE'
                        icon={<BiPaste />}
                        onKey={{
                            key: 'v',
                            ctrlKey: true,
                            prevent: true,
                        }}
                        onClick={() => {
                            modalForm({
                                content: Confirm,
                                title: 'PASTE',
                                text: 'PASTE ITEMS HERE?',
                                icon: <BiPaste />,
                                todo: () => {
                                    load({ show: true, text: 'PASTING' })
                                    FETCH(ENDPOINTS.files.move(), { moveTo: path, items: copied.content.join(';;;'), copy: copied.type === 'COPY' }).then(data => {
                                        setReload(prev => prev + 1)
                                        load({ show: false })
                                    })
                                }
                            })
                        }}
                    />}

                    {selectedItems.length > 0 && (
                        <>
                            <Button
                                second
                                size={1.4}
                                tooltip={'COPY'}
                                subContent='COPY'
                                onKey={{
                                    key: 'c',
                                    prevent: true,
                                    ctrlKey: true
                                }}
                                icon={<FiCopy />}
                                onClick={() => {
                                    setCopied({
                                        type: 'COPY',
                                        content: selectedItems.map(item => item.path)
                                    })
                                }}
                            />
                            <Button
                                second
                                size={1.4}
                                tooltip={'CUT'}
                                onKey={{
                                    key: 'x',
                                    prevent: true,
                                    ctrlKey: true
                                }}
                                subContent='CUT'
                                icon={<BiCut />}
                                onClick={() => {
                                    setCopied({
                                        type: 'CUT',
                                        content: selectedItems.map(item => item.path)
                                    })
                                }}
                            />
                            <Button
                                second
                                onKey={'Delete'}
                                size={1.4}
                                subContent='DELETE'
                                tooltip={'DELETE'}
                                icon={<FiTrash />}
                                onClick={() => {
                                    modalForm({
                                        content: Confirm,
                                        title: 'DELETE',
                                        text: selectedItems.length > 1
                                            ? `Delete ${selectedItems.length} items?`
                                            : 'Delete 1 item?',
                                        icon: <FiTrash />,
                                        todo: () => {
                                            load({ show: true, text: 'DELETING' })
                                            FETCH(ENDPOINTS.files.remove(), {
                                                paths: selectedItems
                                                    .map((item) => item.path)
                                                    .join(';;;'),
                                            }).then((data) => {
                                                load({ show: false })
                                                setReload((prev) => prev + 1)
                                                data.data.errors &&
                                                    newMessage({
                                                        text: 'Permission Error',
                                                        error: true,
                                                    })
                                            })
                                        },
                                    })
                                }}
                            />
                            <Button
                                second
                                tooltip={'MAKE ZIP'}
                                subContent='ZIP'
                                size={1.4}
                                icon={<BsFileZip />}
                                onClick={() => {
                                    modalForm({
                                        content: ChooseDevice,
                                        title: 'SAVE LOCATION',
                                        icon: <BsFileZip />,
                                        todo: (device) => {
                                            if (device === 'server') {
                                                modalForm({
                                                    content: SelectFolder,
                                                    icon: <BsFolder />,
                                                    title: 'SELECT FOLDER TO SAVE',
                                                    startPath: searchParams.get('path'),
                                                    todo: (path) => {
                                                        modalForm({
                                                            content: Prompt,
                                                            title: 'FILENAME',
                                                            icon: <BsFileZip />,
                                                            setButton: device === 'server' ? 'SAVE' : 'DOWNLOAD',
                                                            todo: (filename) => {
                                                                load({ show: true, text: 'ZIPPING' })
                                                                FETCH(ENDPOINTS.files.zip(), { filename, toSave: path, items: selectedItems.map(item => item.path).join(';;;') }).then(data => {
                                                                    if (device === 'computer') {
                                                                        downloadURL(ENDPOINTS.files.file(data.data.path), filename)
                                                                    }
                                                                    load({ show: false })
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                            else {
                                                modalForm({
                                                    content: Prompt,
                                                    title: 'FILENAME',
                                                    icon: <BsFileZip />,
                                                    setButton: device === 'server' ? 'SAVE' : 'DOWNLOAD',
                                                    todo: (filename) => {
                                                        FETCH(ENDPOINTS.files.zip(), { filename, toSave: null, items: selectedItems.map(item => item.path).join(';;;') }).then(data => {
                                                            if (device === 'computer') {
                                                                const link = document.createElement('a')
                                                                link.href = ENDPOINTS.files.file(data.data.path)
                                                                link.setAttribute('download', filename)
                                                                document.body.appendChild(link)
                                                                link.click()
                                                                link.remove()
                                                            }
                                                        })
                                                    }
                                                })
                                            }

                                        },
                                    })
                                }}
                            />
                            {selectedItems[0].name.endsWith('.zip') && <Button
                                icon={<BsFileZip />}
                                subContent='UNZIP'
                                second
                                size={1.4}
                                tooltip={'UNZIP'}
                            />}
                        </>
                    )}

                    {selectedItems.length === 1 && (
                        <>

                            <Button
                                second
                                size={1.4}
                                tooltip={'RENAME'}
                                subContent='RENAME'
                                icon={<BiRename />}
                                onKey={{
                                    key: 'F2',
                                    prevent: true,
                                }}
                                onClick={() => {
                                    modalForm({
                                        content: Prompt,
                                        icon: <BiRename />,
                                        title: 'RENAME',
                                        setButton: 'RENAME',
                                        todo: (name) => {
                                            console.log(name)
                                        },
                                        initValue: selectedItems[0].name,
                                    })
                                }}
                            />
                            <Button
                                second
                                size={1.4}
                                tooltip={'PROPERTIES'}
                                subContent='PROPER...'
                                icon={<BiInfoCircle />}
                                onKey={{
                                    key: 'i',
                                    ctrlKey: true,
                                    prevent: true,
                                }}
                                onClick={() => {
                                    modalForm({
                                        content: Properties,
                                        icon: <BiInfoCircle />,
                                        title: 'PROPERTIES',
                                        item: selectedItems[0],
                                        todo: () => { },
                                    })
                                }}
                            />
                        </>
                    )}
                    {isSelectedOneFile() && (
                        <>
                            <Button
                                second
                                tooltip={'ENCRYPT'}
                                size={1.4}
                                icon={<HiOutlineLockClosed />}
                                subContent='ENCRYPT'
                                onClick={() => {
                                    modalForm({
                                        content: Prompt,
                                        title: 'PASSWORD',
                                        icon: <HiOutlineLockClosed />,
                                        setButton: 'ENCRYPT',
                                        type: 'password',
                                        todo: () => {

                                        },

                                    })
                                }}
                            />
                            <Button
                                second
                                size={1.4}
                                tooltip={'DOWNLOAD'}
                                subContent='DOWNL...'
                                icon={<HiDownload />}
                                onClick={() => {
                                    downloadURL(ENDPOINTS.files.file(selectedItems[0].path), selectedItems[0].name)
                                }}
                                download
                            />
                            <Button
                                second
                                size={1.4}
                                tooltip={'EDIT'}
                                subContent='EDIT'
                                icon={<BiEditAlt />}
                                onKey={{
                                    key: 'e',
                                    ctrlKey: true,
                                    prevent: true,
                                }}
                                onClick={() => {
                                    modalForm({
                                        content: EditorChooser,
                                        icon: <BiEditAlt />,
                                        title: 'CHOOSE EDITOR TYPE',
                                        todo: (editorType) => {
                                            navigate(
                                                LINKS.editor.edit(
                                                    selectedItems[0].path,
                                                    editorType
                                                )
                                            )
                                        },
                                    })
                                }}
                            />
                        </>
                    )}
                </StyledMenuSide>
                <StyledMenuSide>
                    <Button
                        second
                        tooltip={'SEARCH'}
                        subContent='SEARCH'
                        size={1.4}
                        onKey={{
                            key: 'f',
                            ctrlKey: true,
                            prevent: true
                        }}
                        icon={<FiSearch />}
                        onClick={() => {
                            modalForm({
                                content: Prompt,
                                title: 'SEARCH',
                                icon: <FiSearch />,
                                setButton: 'SEARCH',
                                type: 'text',
                                initValue: searchValue,
                                todo: (query) => {
                                    setSearchValue(query)
                                },

                            })
                        }}
                    />

                </StyledMenuSide>
            </StyledMenu>
            {data.parent !== path && (
                <FloatingActionButton
                    second
                    subContent={'UP'}
                    tooltip={'UP'}
                    right={230}
                    size={1.4}
                    icon={<FiArrowUp />}
                    onClick={() => {
                        setPath(data.parent)
                    }}
                />
            )}
            <FloatingActionButton
                second
                size={1.4}
                subContent={'UPLOAD'}
                right={160}
                tooltip={'UPLOAD FILE'}
                icon={<BsFileArrowUp />}
                onClick={() => {
                    modalForm({
                        content: FilePrompt,
                        title: 'UPLOAD FILE',
                        icon: <BsFileArrowUp />,
                        todo: (val) => {
                            FETCH(ENDPOINTS.files.upload(path), {
                                file: val,
                            }).then(() => {
                                setReload((prev) => prev + 1)
                            })
                        },
                    })
                }}
            />
            <FloatingActionButton
                second
                icon={<BsFilePlus />}
                subContent={'+FILE'}
                tooltip={'NEW FILE'}
                size={1.4}
                right={90}
                onClick={handleNewFile}
            />
            <FloatingActionButton
                size={1.4}
                second
                tooltip={'NEW FOLDER'}
                subContent={'+FOLDER'}
                icon={<BsFolderPlus />}
                onClick={handleNewFolder}
            />


        </>
    )
}

export const FilesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [path, setPath] = React.useState('')
    const [initData, setInitData] = React.useState({})
    const [selectedItems, setSelectedItems] = React.useState([])
    const [files, setFiles] = React.useState([])
    const [folders, setFolders] = React.useState([])
    const [data, setData] = React.useState({
        permission_error: false,
    })
    const [searchValue, setSearchValue] = React.useState('')
    const [reload, setReload] = React.useState(0)
    const [settings] = useSettings()


    React.useEffect(() => {
        data.files && setFiles(data.files.filter((file) => file.name.toLowerCase().includes(searchValue.toLowerCase())))
        data.folders && setFolders(data.folders.filter((folder) => folder.name.toLowerCase().includes(searchValue.toLowerCase())))
        setSelectedItems([])
    }, [searchValue])

    React.useEffect(() => {
        path && searchParams.get('path') !== path && setSearchParams({ path })
        setSelectedItems([])
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

    return (
        <MainTemplate
            app={APPS.files}
            title={path}
            submenuChildren={
                <FolderMenu
                    selectedItems={selectedItems}
                    data={data}
                    path={path}
                    setPath={setPath}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    folders={folders}
                    files={files}
                    setReload={setReload}
                    setSelectedItems={setSelectedItems}
                />
            }
        >
            {initData && path && (
                <>
                    {data && data.permission_error && (
                        <StyledError>Permission Error</StyledError>
                    )}
                    <FolderContent
                        list={settings['files.list']}
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
                        reload={reload}
                        setReload={setReload}
                    />
                </>
            )}
        </MainTemplate>
    )
}
