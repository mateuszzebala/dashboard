import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { FaInbox } from 'react-icons/fa'
import { FiArrowLeft, FiEdit, FiMail, FiMenu, FiPlus, FiSend, FiStar, FiTrash } from 'react-icons/fi'
import { MdSnooze } from 'react-icons/md'
import { AiOutlineWarning } from 'react-icons/ai'
import { LINKS } from '../../router/links'
import { Button } from '../../atoms/Button'
import { Tooltip } from '../../atoms/Tooltip'
import { CreateEmail } from './inboxPages/CreateEmail'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { Loading } from '../../atoms/Loading'
import { toBoolStr } from '../../utils/utils'


const StyledMenu = styled.div`
    display: flex;
    gap: 7px;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: ${({open})=> open ? '250px' : '70px'};
    transition: width 0.3s;
    align-items: stretch;
    height: 100%;
    padding: 10px;
    overflow: scroll;
    ::-webkit-scrollbar{
        width: 0;
    }
    span{
        display: ${({open})=> open ? 'inline-block' : 'none'};
        white-space: nowrap;
    }
`

const StyledWrapper = styled.div`
    height: 100%;
    display: flex;
    width: 100%;
`

const StyledContent = styled.div`
    display: flex;
    width: 100%;
    padding: 5px;
`

const StyledEmailsList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    width: 100%;
    overflow: auto;
`

const StyledIcons = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    opacity: 0;
    transition: opacity 0.1s;
`

const StyledEmail = styled.div`
    padding: 0 15px;
    background: ${({theme})=>theme.primary}22;
    width: 100%;
    font-size: 15px;
    cursor: pointer;
    min-height: 45px;
    display: flex;
    align-items: center;
    border-radius: 0 7px 7px 0;
    border-left: 3px solid ${({theme})=>theme.primary};
    overflow: hidden;
    &:hover .items{
        opacity: 1;
    }
    span{
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-flex;
        white-space: nowrap;
    }
`


const StyledMenuButton = styled.button`
    background-color: ${({theme, active})=> active ? theme.primary : theme.primary + '22'};
    border: 0;
    color: ${({theme, active})=> active ? theme.secondary : theme.primary};
    padding: 15px 10px;
    height: ${({active})=> active ? '70px' : '50px'};
    border-radius: 5px;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    font-weight: ${({active}) => active ? 'bold' : 'normal'};
    gap: 8px;
    align-items: center;
    justify-content: ${({open}) => open ? 'flex-start' : 'center'};
    outline: 0px ${({theme, active}) => active ? theme.primary + '88' : theme.primary + '22'} solid;
    transition: height 0.3s, background-color 0.3s, justify-content 0.3s;
    &:focus, &:hover{
        outline-width: 4px;
    }
    svg{
        font-size: 20px;
    }
`

const StyledLoading = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const PAGES = {
    compose: {name: 'Compose', icon: <FiPlus/>},
    inbox: {name: 'Inbox', icon: <FaInbox/>},
    starred: {name: 'Starred', icon: <FiStar/>},
    snoozed: {name: 'Snoozed', icon: <MdSnooze/>},
    sent: {name: 'Sent', icon: <FiSend/>},
    drafts: {name: 'Drafts', icon: <FiEdit/>},
    spam: {name: 'Spam', icon: <AiOutlineWarning/>},
    allEmails: {name: 'All Emails', icon: <FiMail/>},
    bin: {name: 'Bin', icon: <FiTrash/>},
}

export const EmailInboxPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPage, setCurrentPage] = React.useState('inbox')
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = React.useState(true)
    const [emailInfo, setEmailInfo] = React.useState({})
    const [receivedEmails, setReceivedEmails] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(()=>{
        FETCH(ENDPOINTS.email.info(searchParams.get('mail'))).then(data => {
            setEmailInfo(data.data)
        })
        FETCH(ENDPOINTS.email.inbox(searchParams.get('mail'), {
            length: 5,
            folder: 'inbox',
            page: 0
        })).then(data => {
            setReceivedEmails(data.data.emails)
            setLoading(false)
        })
    }, [searchParams.get('mail')])

    React.useEffect(()=>{
        setSearchParams({
            mail: searchParams.get('mail'),
            page: currentPage, 
        })
    }, [currentPage])

    return (
        <MainTemplate 
            app={APPS.email} 
            title={emailInfo.email}
            submenuChildren={
                <>
                    <Button to={LINKS.email.index()} size={1.3} second icon={<FiArrowLeft/>} subContent='EMAILS'/>
                    <Button onClick={()=>setMenuOpen(prev => !prev)} size={1.3} second icon={<FiMenu/>} subContent='MENU'/>
                </>
            }
        >
            <StyledWrapper>
                <StyledMenu open={toBoolStr(menuOpen)}>
                    {Object.keys(PAGES).map(page => (
                        <Tooltip text={PAGES[page].name} key={page} wrapper={StyledMenuButton} open={toBoolStr(menuOpen)} onClick={()=>{setCurrentPage(page)}} active={currentPage === page}>{PAGES[page].icon} <span>{PAGES[page].name}</span></Tooltip>
                    ))}
                </StyledMenu>
                <StyledContent>
                    {loading && <StyledLoading><Loading size={2} /></StyledLoading>}
                    {!loading && <>
                        {currentPage === 'compose' && <CreateEmail emailInfo={emailInfo}/>}
                        {currentPage !== 'compose' && 
                            <StyledEmailsList menuOpen={toBoolStr(menuOpen)}>
                                {receivedEmails.map(email => (
                                    <StyledEmail key={email}>
                                        <span><b>{email.from}</b> &nbsp; {email.subject}</span>
                                        <StyledIcons className='icons'>
                                            <FiTrash/>
                                        </StyledIcons>
                                    </StyledEmail>
                                ))}
                            </StyledEmailsList>
                        }
                    </>}
                </StyledContent>
            </StyledWrapper>
        </MainTemplate>
    )
}
