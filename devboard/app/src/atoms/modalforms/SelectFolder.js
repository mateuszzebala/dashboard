import React from 'react'
import { Button } from '../../atoms'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { BsFolder } from 'react-icons/bs'
import { FaArrowRight } from 'react-icons/fa'
import {StyledContent, StyledItem, StyledMenu, StyledName, StyledWrapper, StyledPath, StyledMenuButtons} from './SelectFile'
import { centerEllipsis } from '../../utils/utils'
import { FiArrowRight, FiArrowUp, FiFolder, FiRefreshCw, FiSearch } from 'react-icons/fi'
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
                            size={1.4}
                            onClick={() => {
                                setPath(data.parent)
                            }}
                            icon={<FiArrowUp />}
                        />
                        <Button
                            second
                            size={1.4}
                            icon={<FiRefreshCw />}
                            onClick={() => {
                                setReload((prev) => prev + 1)
                            }}
                        />
                        <Button
                            second
                            size={1.4}
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
                        
                        {value !== null && <Button
                            value={search}
                            setValue={setSearch}
                            size={1.4}
                            icon={<FiArrowRight/>}
                            onClick={()=>{
                                todo(value)
                                setOpen(false)
                            }}
                        />}
                    </StyledMenuButtons>
                </StyledMenu>
                <StyledContent>
                    <StyledItem selected={path == value} onClick={()=>{
                        setValue(path)
                    }}><StyledName>{centerEllipsis(path, 50)}</StyledName></StyledItem>
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
                                <FiFolder />
                                <StyledName>{folder.name}</StyledName>
                            </StyledItem>
                        ))}
                 
                </StyledContent>
            </StyledWrapper>
        </>
    )
}
