import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { Button } from '../../atoms/Button'
import { FiAlertTriangle, FiArrowUpRight, FiCheck, FiKey, FiList, FiSearch, FiTrash, FiUser, FiX } from 'react-icons/fi'
import { useModalForm, useTheme } from '../../utils/hooks'
import { Theme } from '../../atoms/Theme'
import { FaCircle, FaSort } from 'react-icons/fa'
import { toBoolStr } from '../../utils/utils'
import { Prompt } from '../../atoms/modalforms/Prompt'
import { TbHttpConnect, TbHttpDelete, TbHttpGet, TbHttpHead, TbHttpOptions, TbHttpPatch, TbHttpPost, TbHttpPut, TbHttpQue, TbHttpTrace } from 'react-icons/tb'
import { MdHttp } from 'react-icons/md'
import { LuClock10, LuClock2 } from 'react-icons/lu'
import { SelectItemModal } from '../../atoms/modalforms/SelectItemModal'
import { Paginator } from '../../atoms/Paginator'
import { Select } from '../../atoms/Select'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'

const logs = [
    {
        id: 0,
        ip_v4: '127.0.0.1',
        when: '2 seconday ago',
        path: '/dashboard/api/database/User/1/',
        status_code: 200,
        method: 'POST'
    },
    {
        id: 1,
        ip_v4: '127.0.0.1',
        when: '4 seconday ago',
        path: '/dashboard/api/database/models/',
        status_code: 500,
        method: 'POST'
    },
    {
        id: 2,
        ip_v4: '127.0.0.1',
        when: '4 seconday ago',
        path: '/dashboard/api/database/./',
        status_code: 404,
        method: 'PUT'
    },
    {
        id: 3,
        ip_v4: '127.0.0.1',
        when: '6 seconday ago',
        path: '/dashboard/api/auth/csrf/',
        status_code: 401,
        method: 'GET'
    },
    {
        id: 0,
        ip_v4: '127.0.0.1',
        when: '2 seconday ago',
        path: '/dashboard/api/database/User/1/',
        status_code: 200,
        method: 'POST'
    },
    {
        id: 1,
        ip_v4: '127.0.0.1',
        when: '4 seconday ago',
        path: '/dashboard/api/database/models/',
        status_code: 500,
        method: 'POST'
    },
    {
        id: 2,
        ip_v4: '127.0.0.1',
        when: '4 seconday ago',
        path: '/dashboard/api/database/./',
        status_code: 404,
        method: 'PUT'
    },
    {
        id: 3,
        ip_v4: '127.0.0.1',
        when: '6 seconday ago',
        path: '/dashboard/api/auth/csrf/',
        status_code: 401,
        method: 'GET'
    },
    {
        id: 0,
        ip_v4: '127.0.0.1',
        when: '2 seconday ago',
        path: '/dashboard/api/database/User/1/',
        status_code: 200,
        method: 'POST'
    },
    {
        id: 1,
        ip_v4: '127.0.0.1',
        when: '4 seconday ago',
        path: '/dashboard/api/database/models/',
        status_code: 500,
        method: 'POST'
    },
    {
        id: 2,
        ip_v4: '127.0.0.1',
        when: '4 seconday ago',
        path: '/dashboard/api/database/./',
        status_code: 404,
        method: 'PUT'
    },
    {
        id: 3,
        ip_v4: '127.0.0.1',
        when: '6 seconday ago',
        path: '/dashboard/api/auth/csrf/',
        status_code: 401,
        method: 'GET'
    },
    {
        id: 0,
        ip_v4: '127.0.0.1',
        when: '2 seconday ago',
        path: '/dashboard/api/database/User/1/',
        status_code: 200,
        method: 'POST'
    },
    {
        id: 1,
        ip_v4: '127.0.0.1',
        when: '4 seconday ago',
        path: '/dashboard/api/database/models/',
        status_code: 500,
        method: 'POST'
    },
    {
        id: 2,
        ip_v4: '127.0.0.1',
        when: '4 seconday ago',
        path: '/dashboard/api/database/./',
        status_code: 404,
        method: 'PUT'
    },
    {
        id: 3,
        ip_v4: '127.0.0.1',
        when: '6 seconday ago',
        path: '/dashboard/api/auth/csrf/',
        status_code: 401,
        method: 'GET'
    },
    {
        id: 0,
        ip_v4: '127.0.0.1',
        when: '2 seconday ago',
        path: '/dashboard/api/database/User/1/',
        status_code: 200,
        method: 'POST'
    },
    {
        id: 1,
        ip_v4: '127.0.0.1',
        when: '4 seconday ago',
        path: '/dashboard/api/database/models/',
        status_code: 500,
        method: 'POST'
    },
    {
        id: 2,
        ip_v4: '127.0.0.1',
        when: '4 seconday ago',
        path: '/dashboard/api/database/./',
        status_code: 404,
        method: 'PUT'
    },
    {
        id: 3,
        ip_v4: '127.0.0.1',
        when: '6 seconday ago',
        path: '/dashboard/api/auth/csrf/',
        status_code: 401,
        method: 'GET'
    },
]

const StyledRequestLog = styled.div`
    background-color: ${({theme})=>theme.secondary};
    padding: 10px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    align-items: center;
    border-radius: 5px;
    gap: 5px;
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
    background-color: transparent;
    border: 0;
    outline: none;
    padding: 5px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
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
    const [asc, setAsc] = React.useState(true)
    const [sortBy, setSortBy] = React.useState('datetime')
    const [fromDatetime, setFromDatetime] = React.useState(null)
    const [user, setUser] = React.useState({})
    const [toDatetime, setToDatetime] = React.useState(null)
    const modalForm = useModalForm()

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
                    statusCode: 'STATUS CODE',
                    method: 'METHOD',
                }}/>
                <Button
                    subContent={asc ? 'ASC' : 'DESC'}
                    second
                    icon={asc ? <AiOutlineSortAscending/> : <AiOutlineSortDescending/>}
                    onClick={()=>setAsc(prev => !prev)}
                    size={1.4}
                />
            </>
        }>
            <StyledPage>
                <StyledLogs>
                    {logs.map(log => (
                        <StyledRequestLog key={log.id} deleteMode={toBoolStr(deleteMode)}>
                            {deleteMode && (
                                <StyledDeleteButton>
                                    <FiTrash/>
                                </StyledDeleteButton>
                            )}
                            <StyledColumn>
                                <StyledRow>
                                    <span>{log.ip_v4}</span>
                                    <span>{log.when}</span>
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
                    <Paginator pages={10} value={page} setValue={setPage} second/>
                </StyledFooter>
            </StyledPage>
        </MainTemplate>
    )
}
