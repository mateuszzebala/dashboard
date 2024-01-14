import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { FiArrowLeft, FiBell, FiDownload, FiPlus, FiTrash } from 'react-icons/fi'
import { LINKS } from '../../router/links'
import { Button } from '../../atoms/Button'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { Loading } from '../../atoms/loading/Loading'
import { Counter } from '../../atoms/inputs/Counter'
import { Paginator } from '../../atoms/Paginator'


const StyledWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 5px;
`

const StyledFromMail = styled.b`
    padding: 0 10px;
    font-weight: 500;
`

const StyledSubject = styled.span`
    font-weight: 100;
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
    min-height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 7px;
    overflow: hidden;
    :hover .icons{ opacity: 1; }
    span{
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-flex;
        white-space: nowrap;
    }
`

const StyledActionIcon = styled.button`
    font-size: 20px;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    color: ${({theme})=>theme.primary};
`


const StyledLoading = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;

`

const StyledSubMenu = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    > div{
        display: flex;
        align-items: center;
        gap: 5px;
    }
`

export const EmailInboxPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [emailInfo, setEmailInfo] = React.useState({})
    const [receivedEmails, setReceivedEmails] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [length, setLength] = React.useState(30)
    const [page, setPage] = React.useState(0)
    const [pages, setPages] = React.useState(30)
    const navigate = useNavigate()

    React.useEffect(()=>{
        FETCH(ENDPOINTS.email.info(searchParams.get('mail'))).then(data => {
            setEmailInfo(data.data)
        })
    }, [searchParams.get('mail')])

    React.useEffect(()=>{
        setLoading(true)
        const currentPageNumber = page
        const currentLength = length
        FETCH(ENDPOINTS.email.inbox(searchParams.get('mail'), {
            length,
            folder: 'inbox',
            page,
        })).then(data => {
            setPages(Math.ceil(data.data.email_counter / length))
            setReceivedEmails(data.data.emails)
            console.log(currentLength, length)
            currentLength === length && currentPageNumber === page && setLoading(false)
        })
    }, [emailInfo, length, page])

    return (
        <MainTemplate 
            app={APPS.email} 
            title={emailInfo.email}
            submenuChildren={
                <StyledSubMenu>
                    <div>
                        <Button to={LINKS.email.index()} size={1.3} second icon={<FiArrowLeft/>} subContent='EMAILS'/>
                        <Button size={1.3} second icon={<FiPlus/>} subContent='COMPOSE' to={LINKS.email.compose(searchParams.get('mail'))}/>
                    </div>
                    <div>
                        <Paginator value={page} setValue={setPage} pages={pages} second/>  
                        <Counter value={length} setValue={setLength} min={0} max={1000} unit='Emails' size={1.3}/>
                    </div>    
                </StyledSubMenu>
            }
        >
            <StyledWrapper>
                {loading && <StyledLoading><Loading size={2} /></StyledLoading>}
                {!loading && (
                    <StyledEmailsList>
                        {receivedEmails.map(email => (
                            <StyledEmail key={email}>
                                <span onClick={()=>{
                                    navigate(LINKS.email.read(email.id))
                                }}>
                                    <StyledFromMail>{email.fromName || email.fromEmail}</StyledFromMail>
                                    <StyledSubject>{email.subject}</StyledSubject>
                                </span>
                                <StyledIcons className='icons'>
                                    <StyledActionIcon>
                                        <FiDownload/>
                                    </StyledActionIcon>
                                    <StyledActionIcon>
                                        <FiBell/>
                                    </StyledActionIcon>
                                    <StyledActionIcon>
                                        <FiTrash/>
                                    </StyledActionIcon>
                                </StyledIcons>
                            </StyledEmail>
                        ))}
                    </StyledEmailsList>
                )}
            </StyledWrapper>
        </MainTemplate>
    )
}
