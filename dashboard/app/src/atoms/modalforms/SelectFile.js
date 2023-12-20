import React from 'react'
import { Button } from '../../atoms/Button'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import styled from 'styled-components'
import { BsFile, BsFolder, BsFolder2Open } from 'react-icons/bs'
import { FaArrowLeft } from 'react-icons/fa'
import { LINKS } from '../../router/links'
import { TbReload } from 'react-icons/tb'
import { Input } from '../Input'
import { centerEllipsis } from '../../utils/utils'
import { FiArrowLeft, FiFile, FiFolder, FiRefreshCcw, FiRefreshCw, FiSearch } from 'react-icons/fi'
import { useModalForm } from '../../utils/hooks'
import { Prompt } from './Prompt'

export const StyledPath = styled.span`
    font-size: 20px;
`

export const StyledContent = styled.div`
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
    padding: 5px 5px;
    overflow-y: scroll;
    align-items: center;
    overflow-x: hidden;
    height: 100%;
`
export const StyledItem = styled.div`
    display: flex;
    padding: 15px 15px;
    cursor: pointer;
    align-items: center;
    gap: 20px;
    width: 100%;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 300;
    max-width: 600px;
    background-color: ${({ theme, selected }) => selected ? theme.primary : theme.quaternary};
    color: ${({ theme, selected }) => selected ? theme.secondary : theme.primary};
    outline: ${({ selected }) => selected ? 4 : 0}px solid ${({ theme, selected }) => selected ? theme.primary + '88' : theme.quaternary + '88'};
    transition: transform 0.3s ease, color 0.2s, background-color 0.2s, outline-width 0.2s;
    &:hover{
        outline-width: 4px;
    }
`

export const StyledName = styled.span`
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 80%;
    overflow: hidden;
`

export const StyledMenu = styled.div`
    display: flex;
    overflow: scroll;
    gap: 10px;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    &::-webkit-scrollbar {
        height: 0;
        width: 0;
    }
`

export const StyledMenuButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: min(600px, 95vw);
    height: min(600px, 95vh);
`

export const SelectFile = ({ todo, startPath, setOpen }) => {
    const [path, setPath] = React.useState(startPath || '')
    const [folders, setFolders] = React.useState([])
    const [files, setFiles] = React.useState([])
    const [data, setData] = React.useState([])
    const [reload, setReload] = React.useState(0)
    const [search, setSearch] = React.useState('')
    
    const modalForm = useModalForm()


    React.useEffect(() => {
        path &&
            FETCH(ENDPOINTS.files.content(), {
                path: path,
            }).then((data) => {
                setData(data.data)
                setFiles(data.data.files)
                setFolders(data.data.folders)
            })
    }, [path, reload])

    React.useEffect(() => {
        FETCH(ENDPOINTS.files.init()).then((data) => {
            setPath(data.data.home)
        })
    }, [])

    return (
        <>
            <StyledWrapper>
                <StyledMenu>
                    <StyledMenuButtons>
                        <Button
                            second
                            size={1.3}
                            onClick={() => {
                                setPath(data.parent)
                            }}
                            icon={<FiArrowLeft />}
                        />
                        <Button
                            second
                            size={1.3}
                            icon={<FiRefreshCw />}
                            onClick={() => {
                                setReload((prev) => prev + 1)
                            }}
                        />
                        <Button
                            second
                            size={1.3}
                            icon={<FiSearch />}
                            onKey={{
                                key: 'f',
                                ctrlKey: true,
                                prevent: true,
                            }}
                            onClick={() => {
                                modalForm({
                                    content: Prompt,
                                    title: 'SEARCH',
                                    icon: <FiSearch/>,
                                    initValue: search,
                                    todo: (val) => {
                                        setSearch(val)
                                    } 
                                })
                            }}
                        />
                    </StyledMenuButtons>
                    <StyledPath>{centerEllipsis(path, 50)}</StyledPath>
                </StyledMenu>
                
                <StyledContent>
                    {folders
                        .filter((folder) =>
                            folder.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .map((folder) => (
                            <StyledItem
                                onClick={() => {
                                    setPath(folder.path)
                                    setSearch('')
                                }}
                                key={folder.name}
                            >
                                <FiFolder />
                                <StyledName>{folder.name}</StyledName>
                            </StyledItem>
                        ))}
                    {files
                        .filter((file) =>
                            file.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .map((file) => (
                            <StyledItem
                                onClick={() => {
                                    todo(file.path)
                                    setOpen(false)
                                }}
                                key={file.name}
                            >
                                <FiFile />
                                <StyledName>{file.name}</StyledName>
                            </StyledItem>
                        ))}
                </StyledContent>
            </StyledWrapper>
        </>
    )
}
