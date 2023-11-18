import React from 'react'
import { Button } from '../../atoms/Button'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { BsFolder, BsFolder2Open } from 'react-icons/bs'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { LINKS } from '../../router/links'
import { TbReload } from 'react-icons/tb'
import { Input } from '../Input'
import {StyledContent, StyledItem, StyledMenu, StyledName, StyledWrapper, StyledPath} from './SelectFile'
import { centerEllipsis } from '../../utils/utils'

export const SelectFolder = ({ todo, startPath, setOpen }) => {
    const [path, setPath] = React.useState(startPath || '')
    const [folders, setFolders] = React.useState([])
    const [data, setData] = React.useState([])
    const [reload, setReload] = React.useState(0)
    const [search, setSearch] = React.useState('')
    const [value, setValue] = React.useState(null)
    
    React.useEffect(() => {
        path &&
            FETCH(ENDPOINTS.files.content(), {
                path: path,
            }).then((data) => {
                setData(data.data)
                setFolders(data.data.folders)
            })
    }, [path, reload])

    React.useEffect(() => {
        !startPath && FETCH(ENDPOINTS.files.init()).then((data) => {
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
                    {value !== null && <Button
                        value={search}
                        setValue={setSearch}
                        size={1.3}
                        icon={<FaArrowRight/>}
                        onClick={()=>{
                            todo(value)
                            setOpen(false)
                        }}
                    />}
                </StyledMenu>
                <StyledPath>{centerEllipsis(path, 50)}</StyledPath>
                <StyledContent>
                    {folders
                        .filter((folder) =>
                            folder.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .map((folder) => (
                            <StyledItem
                                selected={folder.path == value}
                                onDoubleClick={() => {
                                    setPath(folder.path)
                                    setSearch('')
                                }}
                                onClick={()=>{
                                    setValue(prev => prev == folder.path ? null : folder.path)
                                }}
                                key={folder.name}
                            >
                                <BsFolder />
                                <StyledName>{folder.name}</StyledName>
                            </StyledItem>
                        ))}
                    <Button second={path != value} onClick={()=>{
                        setValue(path)
                    }}>THIS FOLDER</Button>
                </StyledContent>
            </StyledWrapper>
        </>
    )
}
