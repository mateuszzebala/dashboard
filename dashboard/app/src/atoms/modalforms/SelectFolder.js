import React from 'react'
import { Button } from '../../atoms/Button'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { BsFolder, BsFolder2Open } from 'react-icons/bs'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { LINKS } from '../../router/links'
import { TbReload } from 'react-icons/tb'
import { Input } from '../Input'
import {StyledContent, StyledItem, StyledMenu, StyledName, StyledWrapper, StyledPath, StyledMenuButtons} from './SelectFile'
import { centerEllipsis } from '../../utils/utils'
import { FiArrowLeft, FiFolder, FiRefreshCw, FiSearch } from 'react-icons/fi'
import { Prompt } from './Prompt'
import { useModalForm } from '../../utils/hooks'

export const SelectFolder = ({ todo, startPath, setOpen }) => {
    const [path, setPath] = React.useState(startPath || '')
    const [folders, setFolders] = React.useState([])
    const [data, setData] = React.useState([])
    const [reload, setReload] = React.useState(0)
    const [search, setSearch] = React.useState('')
    const [value, setValue] = React.useState(null)
    const modalForm = useModalForm()
    
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
                            target={'_blank'}
                            to={LINKS.files.indexPath(path)}
                            icon={<FiFolder />}
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
                        <StyledPath>{centerEllipsis(path, 50)}</StyledPath>
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
                    </StyledMenuButtons>
                    
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
