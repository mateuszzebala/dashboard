import React from 'react'
import { Modal } from '../../atoms/Modal'
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
import { toBoolStr } from '../../utils/utils'
import { TbReload } from 'react-icons/tb'
import { Input } from '../../atoms/Input'

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
    transition: transform 0.2s;
    &:hover {
        transform: translateX(10px);
    }
    background-color: ${({ theme, selected }) =>
        selected ? theme.primary : theme.secondary};
    color: ${({ theme, selected }) =>
        selected ? theme.secondary : theme.primary};
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

const StyledInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 300px;
    border: 3px solid ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.secondary};
    border-radius: 3px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 20px;
    cursor: pointer;
    padding: 10px;
`

export const SelectFile = ({
    value,
    setValue,
    save = false,
    inputValue = '',
}) => {
    const [open, setOpen] = React.useState(false)
    const [path, setPath] = React.useState('')
    const [folders, setFolders] = React.useState([])
    const [files, setFiles] = React.useState([])
    const [filename, setFilename] = React.useState('')
    const [name, setName] = React.useState(inputValue)
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
            <StyledInput
                onClick={() => {
                    setOpen(true)
                }}
            >
                {value ? filename : 'SELECT FILE'}
            </StyledInput>
            <Modal title="SELECT FILE" open={open} setOpen={setOpen}>
                <StyledWrapper>
                    <StyledMenu>
                        <Button
                            onClick={() => {
                                setPath(data.parent)
                            }}
                            icon={<FaArrowLeft />}
                        />
                        <Button
                            target={'_blank'}
                            to={LINKS.files.indexPath(path)}
                            icon={<BsArrowUpRightSquare />}
                        />
                        <Button
                            icon={<TbReload />}
                            onClick={() => {
                                setReload((prev) => prev + 1)
                            }}
                        />
                        {save && (
                            <>
                                <Input
                                    value={name}
                                    setValue={setName}
                                    label={'FILENAME'}
                                />
                                <Button>SAVE</Button>
                            </>
                        )}
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
                                selected={toBoolStr(file.path === value)}
                                onClick={() => {
                                    setValue(file.path)
                                    setFilename(file.name)
                                    setOpen(false)
                                }}
                                key={file.name}
                            >
                                <BsFileEarmarkBinary />
                                <StyledName>{file.name}</StyledName>
                            </StyledItem>
                        ))}
                    </StyledContent>
                </StyledWrapper>{' '}
            </Modal>
        </>
    )
}
