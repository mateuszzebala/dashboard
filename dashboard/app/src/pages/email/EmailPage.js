import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { Button } from '../../atoms/Button'
import { FiPlus, FiSearch } from 'react-icons/fi'
import { useModalForm } from '../../utils/hooks'
import { Prompt } from '../../atoms/modalforms/Prompt'
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
    border-radius: 0 3px 3px 0;
    font-size: 20px;
    border-left: 3px solid ${({theme})=>theme.primary};
    font-weight: 300;
    transition: transform 0.3s;
    width: 100%;
    span{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &:hover{
        transform: scale(0.98);
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
                    <StyledEmail onClick={()=>{
                        navigate(LINKS.email.inbox(email.email))
                    }} key={email.email}>
                        <span onClick={()=>{
                            alert(email.email)
                        }}>{email.star ? <BsStarFill/> : <BsStar/> }</span> {email.email} - {email.name}
                    </StyledEmail>
                ))}
            </StyledWrapper>
        </MainTemplate>
    )
}
