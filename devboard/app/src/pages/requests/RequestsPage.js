import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { Button, Counter, Paginator, Prompt, Select, Theme } from '../../atoms'
import { FiAlertTriangle, FiCheck, FiKey, FiList, FiSearch, FiTrash, FiUser, FiX } from 'react-icons/fi'
import { useModalForm, useTheme } from '../../utils/hooks'
import { FaSort } from 'react-icons/fa'
import { toBoolStr } from '../../utils/utils'
import {
    TbHttpConnect,
    TbHttpDelete,
    TbHttpGet,
    TbHttpHead,
    TbHttpOptions,
    TbHttpPatch,
    TbHttpPost,
    TbHttpPut,
    TbHttpTrace,
} from 'react-icons/tb'
import { MdHttp } from 'react-icons/md'
import { LuClock10, LuClock2 } from 'react-icons/lu'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { useNavigate } from 'react-router'
import { LINKS } from '../../router/links'
import moment from 'moment'


const StyledRequestLog = styled.div`
    background-color: ${({theme})=>theme.secondary};
    padding: 10px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    align-items: center;
    border-radius: 5px;
    gap: 10px;
    transition: transform 0.3s;
    &:hover{
        transform: ${({deleteMode})=>deleteMode ? 'none' : 'translateX(10px)'};
    }
`

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const StyledLogs= styled.div`
    display: flex;
    width: 100%;
    overflow: scroll;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
`

const StyledDeleteButton = styled.button`
    font-size: 27px;
    color: ${({ theme }) => theme.error};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.1s, color 0.1s, outline-width 0.1s;
    aspect-ratio: 1/1;
    height: 100%;
    border-radius: 4px;
    outline: 0 solid ${({ theme }) => theme.error}88;
    border: 0;
    background-color: transparent;
    &:hover,
    &:focus {
        outline-width: 4px;
        background-color: ${({ theme }) => theme.error};
        color: ${({ theme }) => theme.secondary};
    }
`

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const StyledPage = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`



const nextStatus = {
    all: 'successes',
    successes: 'warnings',
    warnings: 'errors',
    errors: 'all',
}

const nextMethod = {
    all: 'get',
    get: 'post',
    post: 'put',
    put: 'patch',
    patch: 'head',
    head: 'delete',
    delete: 'trace',
    trace: 'connect',
    connect: 'options',
    options: 'all',
}

export const RequestsPage = () => {
    const [theme] = useTheme()
    const [statuses, setStatuses] = React.useState('all')
    const [methods, setMethods] = React.useState('all')
    const [deleteMode, setDeleteMode] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState('')
    const [page, setPage] = React.useState(0)
    const [pages, setPages] = React.useState(0)
    const [asc, setAsc] = React.useState(false)
    const [reload, setReload] = React.useState(0)
    const [sortBy, setSortBy] = React.useState('datetime')
    const [fromDatetime, setFromDatetime] = React.useState(null)
    const [logs, setLogs] = React.useState([])
    const [toDatetime, setToDatetime] = React.useState(null)
    const [length, setLength] = React.useState(30)
    const modalForm = useModalForm()
    const navigate = useNavigate()


    React.useEffect(()=>{
        setPage(0)
    }, [statuses, methods, searchQuery, asc, sortBy, fromDatetime, toDatetime])

    React.useEffect(()=>{
        FETCH(ENDPOINTS.requests.get(), {
            statuses,
            methods,
            query: searchQuery,
            page,
            asc,
            length,
            sortBy,
            fromDatetime: fromDatetime || '',
            toDatetime: toDatetime || '',
        }).then(data => {
            setLogs(data.data.logs)
            setPages(Math.ceil(data.data.counter / length))
        })
    }, [statuses, methods, searchQuery, page, asc, sortBy, fromDatetime, toDatetime, length, reload])

    const colorsByResponse = {
        all: theme.quaternary,
        errors: theme.error,
        warnings: theme.warning,
        successes: theme.success
    }

    const iconsByResponse = {
        all: <FiList/>,
        errors: <FiX/>,
        warnings: <FiAlertTriangle/>,
        successes: <FiCheck/>
    }

    const iconsByMethod = {
        all: <MdHttp/>,
        get: <TbHttpGet/>,
        post: <TbHttpPost/>,
        put: <TbHttpPut/>,
        patch: <TbHttpPatch/>,
        head: <TbHttpHead/>,
        delete: <TbHttpDelete/>,
        trace: <TbHttpTrace/>,
        connect: <TbHttpConnect/>,
        options: <TbHttpOptions/>,
    }

    return (
        <MainTemplate app={APPS.requests} title='LAST REQUESTS' submenuChildren={
            <>
                <Button subContent='DELETE' icon={<FiTrash/>} second={!deleteMode} onClick={()=>{
                    setDeleteMode(prev => !prev)
                }} size={1.4}/>
                <Button subContent='SEARCH' icon={<FiSearch/>} second onClick={()=>{
                    modalForm({
                        content: Prompt,
                        initValue: searchQuery,
                        todo: (val) => setSearchQuery(val),
                        title: 'SEARCH',
                        icon: <FiSearch/>,
                        setButton: 'SEARCH'
                    })
                }} size={1.4}/>
                <Theme value={{...theme, primary: colorsByResponse[statuses], secondary: statuses == 'all' ? theme.primary : theme.secondary}}>
                    <Button onClick={()=>{
                        setStatuses(prev => nextStatus[prev])
                    }} size={1.4} icon={iconsByResponse[statuses]} subContent={statuses.toUpperCase()}/>
                </Theme>
                <Button second size={1.4} subContent={methods == 'all' ? 'ALL METH..' : methods.toUpperCase()} icon={iconsByMethod[methods.toLowerCase()]} onClick={()=>{
                    setMethods(prev => nextMethod[prev])
                }}/>
                <Button second size={1.4} subContent={'FROM'} icon={<LuClock10/>} onClick={()=>{
                    modalForm({
                        content: Prompt,
                        type: 'datetime-local',
                        initValue: fromDatetime,
                        todo: (val) => setFromDatetime(val),
                        title: 'FROM DATETIME',
                        icon: <LuClock10/>,
                        setButton: 'SEARCH'
                    })
                }}/>
                <Button second size={1.4} subContent={'TO'} icon={<LuClock2/>} onClick={()=>{
                    modalForm({
                        content: Prompt,
                        type: 'datetime-local',
                        initValue: toDatetime,
                        todo: (val) => setToDatetime(val),
                        title: 'TO DATETIME',
                        icon: <LuClock2/>,
                        setButton: 'SEARCH'
                    })
                }}/>
                <Button second size={1.4} subContent={'USER'} icon={<FiUser/>} onClick={()=>{
                  
                }}/>
                <Button second size={1.4} subContent={'SESSION'} icon={<FiKey/>} onClick={()=>{
                  
                }}/>
                <Select canBeNull={false} second size={1.4} value={sortBy} setValue={setSortBy} subContent={'SORT BY'} icon={<FaSort/>} asButton data={{
                    datetime: 'DATETIME',
                    path: 'PATH',
                    status_code: 'STATUS CODE',
                    method: 'METHOD',
                }}/>
                <Button
                    subContent={asc ? 'ASC' : 'DESC'}
                    second
                    icon={asc ? <AiOutlineSortAscending/> : <AiOutlineSortDescending/>}
                    onClick={()=>setAsc(prev => !prev)}
                    size={1.4}
                />
                <Counter value={length} setValue={setLength} min={0} max={200} unit='Logs' size={1.4}/>
            </>
        }>
            <StyledPage>
                <StyledLogs>
                    {logs.map(log => (
                        <StyledRequestLog onClick={() => {
                            !deleteMode && navigate(LINKS.requests.request(log.id))
                        }} key={log.id} deleteMode={toBoolStr(deleteMode)}>
                            {deleteMode && (
                                <StyledDeleteButton onClick={()=>{
                                    FETCH(ENDPOINTS.requests.delete(log.id)).then(()=>{
                                        setReload(prev => prev + 1)
                                    })
                                }}>
                                    <FiX/>
                                </StyledDeleteButton>
                            )}
                            <StyledColumn>
                                <StyledRow>
                                    <span>{log.ip_v4}</span>
                                    <span>{moment(log.datetime).fromNow(true)}</span>
                                </StyledRow>
                                <StyledRow>
                                    <b>{log.method}</b> 
                                    <b style={{color: log.status_code > 300 ? log.status_code < 500 ? theme.warning : theme.error : theme.success}}>{log.status_code}</b> 
                                    <span>{log.path}</span>
                                </StyledRow>
                            </StyledColumn>
                        </StyledRequestLog>
                    ))}
                </StyledLogs>
                <StyledFooter>
                    <Paginator pages={pages} value={page} setValue={setPage} second/>
                </StyledFooter>
            </StyledPage>
        </MainTemplate>
    )
}
