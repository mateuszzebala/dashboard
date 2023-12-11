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
import { CreateEmail } from './CreateEmail'


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
    const [currectPage, setCurrentPage] = React.useState('inbox')
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = React.useState(true)

    React.useEffect(()=>{
        setSearchParams({
            mail: searchParams.get('mail'),
            page: currectPage, 
        })
    }, [currectPage])

    return (
        <MainTemplate 
            app={APPS.email} 
            title={searchParams.get('mail')}
            submenuChildren={
                <>
                    <Button to={LINKS.email.index()} size={1.3} second icon={<FiArrowLeft/>} subContent='EMAILS'/>
                    <Button onClick={()=>setMenuOpen(prev => !prev)} size={1.3} second icon={<FiMenu/>} subContent='MENU'/>
                </>
            }
        >
            <StyledWrapper>
                <StyledMenu open={menuOpen}>
                    {Object.keys(PAGES).map(page => (
                        <Tooltip text={PAGES[page].name} key={page} wrapper={StyledMenuButton} open={menuOpen} onClick={()=>{setCurrentPage(page)}} active={currectPage === page}>{PAGES[page].icon} <span>{PAGES[page].name}</span></Tooltip>
                    ))}
                </StyledMenu>
                <StyledContent>
                    {currectPage === 'compose' && <CreateEmail />}
                    {currectPage !== 'compose' && 
                        <>

                        </>
                    }
                </StyledContent>
            </StyledWrapper>
        </MainTemplate>
    )
}
