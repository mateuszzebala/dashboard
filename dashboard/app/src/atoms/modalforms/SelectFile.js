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

const StyledContent = styled.div`
    display: inline-flex;
    flex-direction: column;

    gap: 10px;
    padding: 10px 10px;
    overflow-y: scroll;

    overflow-x: hidden;
    height: 100%;
`
const StyledItem = styled.div`
    display: flex;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    align-items: center;
    gap: 20px;
    border-radius: 0 5px 5px 0;
    max-width: 600px;
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
    transition: transform 0.3s ease;
    &:hover {
        transform: translateX(10px);
    }
`

const StyledName = styled.span`
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 80%;
    overflow: hidden;
`

const StyledMenu = styled.div`
    display: flex;
    overflow: scroll;
    gap: 10px;
    padding: 10px;
    align-items: center;
    &::-webkit-scrollbar {
        height: 0;
        width: 0;
    }
`

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
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
                    <Button
                        second
                        size={1.3}
                        onClick={() => {
                            setPath(data.parent)
                        }}
                        icon={<FaArrowLeft />}
                    />
                    <Button
                        second
                        size={1.3}
                        target={'_blank'}
                        to={LINKS.files.indexPath(path)}
                        icon={<BsFolder2Open />}
                    />
                    <Button
                        second
                        size={1.3}
                        icon={<TbReload />}
                        onClick={() => {
                            setReload((prev) => prev + 1)
                        }}
                    />
                    <Input
                        label="SEARCH"
                        onKey={{
                            key: 'f',
                            ctrlKey: true,
                            prevent: true,
                        }}
                        value={search}
                        setValue={setSearch}
                    />
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
                                <BsFolder />
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
                                <BsFile />
                                <StyledName>{file.name}</StyledName>
                            </StyledItem>
                        ))}
                </StyledContent>
            </StyledWrapper>
        </>
    )
}
