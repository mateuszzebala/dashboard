import React from 'react'
import { Button } from '../../atoms/Button'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import styled from 'styled-components'
import {
    BsArrowUpRightSquare,
    BsFileEarmarkBinary,
    BsFolder,
} from 'react-icons/bs'
import { FaArrowLeft } from 'react-icons/fa'
import { LINKS } from '../../router/links'
import { TbReload } from 'react-icons/tb'

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
    border-left: 3px solid ${({ theme }) => theme.primary};
    cursor: pointer;
    align-items: center;
    gap: 20px;
    border-radius: 0 5px 5px 0;
    max-width: 600px;
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
`

const StyledName = styled.span`
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 80%;
    overflow: hidden;
`

const StyledMenu = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: min(600px, 95vw);
    height: min(600px, 95vh);
`

export const SelectFile = ({ todo, startPath }) => {
    const [path, setPath] = React.useState(startPath || '')
    const [folders, setFolders] = React.useState([])
    const [files, setFiles] = React.useState([])
    const [data, setData] = React.useState([])
    const [reload, setReload] = React.useState(0)

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
                        icon={<BsArrowUpRightSquare />}
                    />
                    <Button
                        second
                        size={1.3}
                        icon={<TbReload />}
                        onClick={() => {
                            setReload((prev) => prev + 1)
                        }}
                    />
                </StyledMenu>
                <StyledContent>
                    {folders.map((folder) => (
                        <StyledItem
                            onClick={() => {
                                setPath(folder.path)
                            }}
                            key={folder.name}
                        >
                            <BsFolder />
                            <StyledName>{folder.name}</StyledName>
                        </StyledItem>
                    ))}
                    {files.map((file) => (
                        <StyledItem
                            onClick={() => {
                                todo(file.path)
                            }}
                            key={file.name}
                        >
                            <BsFileEarmarkBinary />
                            <StyledName>{file.name}</StyledName>
                        </StyledItem>
                    ))}
                </StyledContent>
            </StyledWrapper>
        </>
    )
}
