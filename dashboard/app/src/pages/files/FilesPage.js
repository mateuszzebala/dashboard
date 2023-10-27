import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { FolderContent } from '../../organisms/files/FolderContent'
import { Button } from '../../atoms/Button'
import {
    BsFilePlus,
    BsFolderPlus,
    BsFileZip,
    BsFileArrowUp,
    BsGrid,
} from 'react-icons/bs'
import { Input } from '../../atoms/Input'
import { FloatingActionButton } from '../../atoms/FloatingActionButton'
import { HiDownload } from 'react-icons/hi'
import styled from 'styled-components'
import { FaArrowLeft, FaCheck, FaSearch } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'
import { BiCopy, BiCut, BiEditAlt, BiInfoCircle, BiPaste, BiRename } from 'react-icons/bi'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useModalForm } from '../../utils/hooks'
import { TbReload } from 'react-icons/tb'
import { Prompt } from '../../atoms/modalforms/Prompt'
import { Confirm } from '../../atoms/modalforms/Confirm'
import { ChooseDevice } from '../../atoms/modalforms/ChooseDevice'
import { LINKS } from '../../router/links'
import { useMessage } from '../../utils/messages'
import { EditorChooser } from '../../atoms/modalforms/EditorChooser'
import { FilePrompt } from '../../atoms/modalforms/FilePrompt'
import { Properties } from '../../atoms/modalforms/Properties'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { useCookies } from 'react-cookie'


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
    list,
    setList
}) => {
    const modalForm = useModalForm()
    const { newMessage } = useMessage()
    const navigate = useNavigate()
    const [copied, setCopied] = React.useState({type: null, content: null})
    const isSelectedOneFile = () =>
        selectedItems.length === 1 && selectedItems[0].is_file

    const handleNewFolder = () => {
        modalForm({
            content: Prompt,
            title: 'FOLDER NAME',
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
                            second
                            size={1.3}
                            onKey={{
                                key: 'ArrowLeft',
                                ctrlKey: true,
                                prevent: true,
                            }}
                            tooltip={'FOLDER UP'}
                            icon={<FaArrowLeft />}
                            onClick={() => {
                                setPath(data.parent)
                            }}
                        />
                    )}
                    <Button
                        second
                        size={1.3}
                        tooltip={'SELECT ALL'}
                        onKey={{
                            key: 'a',
                            ctrlKey: true,
                            prevent: true,
                        }}
                        icon={<FaCheck />}
                        onClick={() => {
                            setSelectedItems((prev) =>
                                prev.length > 0 ? [] : [...folders, ...files]
                            )
                        }}
                    />
                    <Button
                        second
                        size={1.3}
                        tooltip={'RELOAD'}
                        onKey={{
                            key: 'r',
                            ctrlKey: true,
                            prevent: true,
                        }}
                        icon={<TbReload />}
                        onClick={() => {
                            setReload((prev) => prev + 1)
                        }}
                    />
                    <Button
                        second
                        size={1.3}
                        tooltip={list ? 'LIST' : 'GRID'}
                        icon={list ? <AiOutlineUnorderedList/> : <BsGrid/>}
                        onClick={() => {
                            setList(prev => !prev)
                        }}
                    />
                    <Button
                        second
                        size={1.3}
                        tooltip={'OPEN IN TERMINAL'}
                        icon={<APPS.terminal.icon />}
                        to={LINKS.terminal.indexPath(path)}
                    />
                  
             

                    {copied.type != null && <Button
                        second
                        size={1.3}
                        tooltip={'PASTE'}
                        icon={<BiPaste />}
                        key={{
                            key: 'v',
                            ctrlKey: true,
                            prevent: true,
                        }}
                        onClick={()=>{
                            modalForm({
                                content: Confirm,
                                title: 'PASTE HERE?',
                                icon: <BiPaste />,
                                todo: ()=>{}
                            })
                        }}
                    />}

                    {selectedItems.length > 0 ? (
                        <>
                            <Button
                                second
                                size={1.3}
                                tooltip={'COPY'}
                                icon={<BiCopy />}
                                onClick={()=>{
                                    setCopied({type: 'COPY', content: selectedItems.map(item => item.path)})
                                }}
                            />
                            <Button
                                second
                                size={1.3}
                                tooltip={'CUT'}
                                icon={<BiCut />}
                                onClick={()=>{
                                    setCopied({type: 'CUT', content: selectedItems.map(item => item.path)})
                                }}
                            />
                            <Button
                                second
                                onKey={'Delete'}
                                size={1.3}
                                tooltip={'DELETE'}
                                icon={<FiTrash />}
                                onClick={() => {
                                    modalForm({
                                        content: Confirm,
                                        title:
                                            selectedItems.length > 1
                                                ? `Delete ${selectedItems.length} items?`
                                                : 'Delete 1 item?',
                                        icon: <FiTrash />,
                                        todo: () => {
                                            FETCH(ENDPOINTS.files.remove(), {
                                                paths: selectedItems
                                                    .map((item) => item.path)
                                                    .join(';;;'),
                                            }).then((data) => {
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
                                size={1.3}
                                icon={<BsFileZip />}
                                onClick={() => {
                                    modalForm({
                                        content: ChooseDevice,
                                        title: 'CHOOSE DEVICE',
                                        icon: <BsFileZip />,
                                        todo: (device) => {
                                       
                                        },
                                    })
                                }}
                            />
                        </>
                    ) : (
                        ''
                    )}
                    {selectedItems.length === 1 && (
                        <>
                            <Button
                                second
                                size={1.3}
                                tooltip={'RENAME'}
                                icon={<BiRename />}
                                onKey={{
                                    key: 'F2',
                                    prevent: true,
                                }}
                                onClick={() => {
                                    modalForm({
                                        content: Prompt,
                                        icon: <BiRename />,
                                        title: 'FILE NAME',
                                        todo: (name) => {
                                            console.log(name)
                                        },
                                        initValue: selectedItems[0].name,
                                    })
                                }}
                            />
                            <Button
                                second
                                size={1.3}
                                tooltip={'PROPERTIES'}
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
                                        todo: () => {},
                                    })
                                }}
                            />
                        </>
                    )}
                    {isSelectedOneFile() && (
                        <>
                            <Button
                                second
                                size={1.3}
                                tooltip={'DOWNLOAD'}
                                icon={<HiDownload />}
                                to={ENDPOINTS.files.file(selectedItems[0].path)}
                                target={'_blank'}
                                download
                            />
                            <Button
                                second
                                size={1.3}
                                tooltip={'EDIT'}
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
                    <Input
                        value={searchValue}
                        setValue={setSearchValue}
                        icon={<FaSearch />}
                        label={'SEARCH'}
                    />
                </StyledMenuSide>
            </StyledMenu>
            <FloatingActionButton
                second
                icon={<BsFilePlus />}
                size={1.3}
                right={80}
                onClick={handleNewFile}
            />
            <FloatingActionButton
                size={1.3}
                second
                icon={<BsFolderPlus />}
                onClick={handleNewFolder}
            />
            <FloatingActionButton
                second
                size={1.3}
                right={140}
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
            {data.parent !== path && (
                <FloatingActionButton
                    second
                    right={200}
                    size={1.3}
                    icon={<FaArrowLeft />}
                    onClick={() => {
                        setPath(data.parent)
                    }}
                />
            )}
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
    const [data, setData] = React.useState({})
    const [searchValue, setSearchValue] = React.useState('')
    const [cookies, setCookies] = useCookies()
    const [list, setList] = React.useState(cookies.filesList === 'true' ? true : false)
    const [reload, setReload] = React.useState(0)

    React.useEffect(()=>{
        console.log(list)
        setCookies('filesList', list)
    }, [list])

    React.useEffect(() => {
        data.files &&
            setFiles(
                data.files.filter((file) =>
                    file.name.toLowerCase().includes(searchValue.toLowerCase())
                )
            )
        data.folders &&
            setFolders(
                data.folders.filter((folder) =>
                    folder.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                )
            )
        setSelectedItems([])
    }, [searchValue])

    React.useEffect(() => {
        path &&
            searchParams.get('path') !== path &&
            setSearchParams({
                path,
            })
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
                    list={list}
                    setList={setList}
                />
            }
        >
            {initData && path && (
                <>
                    {data.permission_error && (
                        <StyledError>Permission Error</StyledError>
                    )}
                    <FolderContent
                        list={list}
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
