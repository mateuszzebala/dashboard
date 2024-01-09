import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { useNavigate, useParams } from 'react-router'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import styled from 'styled-components'
import { LINKS } from '../../router/links'
import { AreaChart, Button, ColumnChart, Field, HeaderRow, LineChart, Prompt, Row, Table } from '../../atoms'
import { FiCalendar, FiClock, FiLogIn, FiTrash } from 'react-icons/fi'
import moment from 'moment'
import { useModalForm, useTheme } from '../../utils/hooks'
import { dateForDateTimeInputValue } from '../../utils/utils'


const StyledPart = styled.button`
    display: flex;
    gap: 20px;
    padding: 20px;
    align-items: center;
    cursor: pointer;
    background: ${({theme, transparent})=>transparent ? 'transparent' : theme.quaternary};
    outline: 0px solid ${({theme})=>theme.quaternary}88;
    border: 0;
    transition: outline-width 0.1s;
    border-radius: 10px;
    width: 100%;
    &:hover, &:focus{
        outline-width: 5px;
    }
    >div{
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
        justify-content: center;
        font-size: 17px;
    }
   
`

const StyledProfile = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;

`

const StyledPage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const StyledExpireTime = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    span{
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-size: 20px;
    }
    h2{
        font-weight: 500;
    }

`

const StyledChart = styled.div`
    height: 600px;
    width: 100%;
    background-color: ${({theme})=>theme.secondary};
    padding: 20px;
    border-radius: 10px;
`

export const SessionPage = () => {
    const {key} = useParams()
    const [data, setData] = React.useState({})
    const navigate = useNavigate()
    const [reload, setReload] = React.useState(0)
    const [theme] = useTheme()
    const modalForm = useModalForm()

    const handleChangeExpireDate = ()=>{
        modalForm({
            content: Prompt,
            title: 'SET EXIPRE DATE',
            icon: <FiCalendar/>,
            setButton: 'SET',
            type: 'datetime-local',
            initValue: data.expire_date ? dateForDateTimeInputValue(new Date(data.expire_date)) : '',
            todo: (value) => {
                FETCH(ENDPOINTS.sessions.set_expire(key), {value}).then(data => {
                    setReload(prev => prev + 1)
                })
            },
        })
    }

    React.useEffect(()=>{
        FETCH(ENDPOINTS.sessions.get(key)).then(data => {
            setData(data.data)
        })
    }, [key, reload])

    return (
        <MainTemplate 
            app={APPS.sessions}
            title={key}
            submenuChildren={<>
                <Button size={1.4} icon={<FiTrash/>} subContent='DELETE' second/>
                <Button size={1.4} icon={<FiLogIn/>} subContent='LOGIN' second onClick={() => {
                    FETCH(ENDPOINTS.sessions.signin(key)).then(data => {
                        window.location.reload()
                    })
                }}/>
                <Button onClick={handleChangeExpireDate} size={1.4} icon={<FiCalendar/>} subContent='EXPIRES' second tooltip={'SET EXIPRE DATE'}/>
            </>}
        >
            {data.session_key && <StyledPage>
                {data.user && <>
                    <StyledPart onClick={()=>{
                        navigate(LINKS.users.user(data.user.id))
                    }}>
                        <StyledProfile src={ENDPOINTS.auth.profile(data.user.username)}/>
                        <div>
                            <b>{data.user.username}</b>
                            <span>{data.user.email}</span>
                        </div>
                    </StyledPart>
                </>}
                <StyledPart>
                    <StyledExpireTime onClick={handleChangeExpireDate}>
                        <span><FiCalendar/> {data.active ? 'Expires' : 'Expired'}</span>
                        {data.expire_date && <h2>{moment(data.expire_date).format('dddd, MMMM Do YYYY, hh:mm:ss a')}</h2>}
                    </StyledExpireTime>
                </StyledPart>
                <div>
                    {data.session_data && <Table>
                        {Object.keys(data.session_data).map(key => <Row key={key}>
                            <Field>{key}</Field>
                            <Field>{data.session_data[key]}</Field>
                        </Row>)}
                    </Table>}
                </div>
              
            </StyledPage>}
                
        </MainTemplate>
    )
}
