import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { Button, Prompt } from '../../atoms'
import { FiPlus, FiSearch } from 'react-icons/fi'
import { useModalForm } from '../../utils/hooks'
import { useNavigate } from 'react-router'
import { LINKS } from '../../router/links'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

const StyledEmail = styled.div`
    background-color: ${({theme})=>theme.primary}11;
    color: ${({theme})=>theme.primary};
    padding: 20px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    border-radius: 3px;
    font-size: 20px;
    font-weight: 300;
    transition: transform 0.3s;
    width: 100%;
    span{
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export const EmailPage = () => {
    const modalForm = useModalForm()
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = React.useState('')

    const [emails, setEmails] = React.useState([])

    React.useEffect(()=>{
        FETCH(ENDPOINTS.email.all()).then(data => {
            setEmails(data.data.emails)
        })
    }, [])

    return (
        <MainTemplate app={APPS.email}
            submenuChildren={<>
                <Button 
                    onKey={{
                        key: 'f',
                        ctrlKey: true,
                        prevent: true
                    }} 
                    icon={<FiSearch/>} 
                    second 
                    size={1.3} 
                    subContent='SEARCH'
                    onClick={()=>{
                        modalForm({
                            content: Prompt,
                            initValue: searchValue,
                            title: 'SEARCH EMAIL',
                            icon: <FiSearch/>,
                            setButton: 'SEARCH',
                            todo: (val) => {
                                setSearchValue(val)
                            }
                        })
                    }}
                />
                <Button 
                    icon={<FiPlus/>} 
                    second 
                    size={1.3} 
                    subContent='NEW'
                    to={LINKS.email.add()}
                />
            </>}
        >
            <StyledWrapper>
                {emails.filter(email => email.email.includes(searchValue)).sort((x, y) => (x.star === y.star)? 0 : x.star? -1 : 1).map(email => (
                    <StyledEmail key={email.email}>
                        <span onClick={()=>{
                            FETCH(ENDPOINTS.email.star(), {email: email.email, star: !email.star}).then(() => {
                                FETCH(ENDPOINTS.email.all()).then(data => {
                                    setEmails(data.data.emails)
                                })
                            })
                        }}>{email.star ? <BsStarFill/> : <BsStar/> }</span> <span onClick={()=>{
                            navigate(LINKS.email.inbox(email.email))
                        }}>{email.email} - {email.name}</span>
                    </StyledEmail>
                ))}
            </StyledWrapper>
        </MainTemplate>
    )
}
