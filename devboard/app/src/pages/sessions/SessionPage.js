import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { useNavigate, useParams } from 'react-router'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import styled from 'styled-components'
import { LINKS } from '../../router/links'
import { AreaChart, Button, ColumnChart, Confirm, Field, HeaderRow, LineChart, Prompt, Row, Switch, Table } from '../../atoms'
import { FiAlertCircle, FiCalendar, FiClock, FiEdit, FiLogIn, FiPlus, FiPlusSquare, FiTrash, FiX } from 'react-icons/fi'
import moment from 'moment'
import { useModalForm, useTheme } from '../../utils/hooks'
import { dateForDateTimeInputValue, variableToPythonString } from '../../utils/utils'
import { useMessage } from '../../utils/messages'
import { ChooseVarType } from '../../atoms/modalforms/ChooseVarType'
import { BoolPrompt } from '../../atoms/modalforms/BoolPrompt'
import { ValueProviderModal } from '../../atoms/modalforms/ValueProviderModal'

const StyledPart = styled.button`
    display: flex;
    gap: 20px;
    padding: 20px;
    align-items: center;
    cursor: pointer;
    background: ${({ theme, transparent }) => (transparent ? 'transparent' : theme.quaternary)};
    outline: 0px solid ${({ theme }) => theme.quaternary}88;
    border: 0;
    transition: outline-width 0.1s;
    border-radius: 10px;
    width: 100%;
    &:hover,
    &:focus {
        outline-width: 5px;
    }
    > div {
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
    span {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-size: 20px;
    }
    h2 {
        font-size: 22px;
        font-weight: 500;
    }
`

const StyledSessionDataField = styled.tr`
    font-size: 17px;
    border-radius: 5px;

    .deleteButton{
        width: 50px;
        height: 50px;
        padding: 0 7.5px;
        button{
            width: 35px;
            transition: background-color 0.1s, color 0.1s, outline-width 0.1s;
            height: 35px;
            cursor: pointer;
            font-size: 30px;
            background-color: transparent;
            border: 0;
            color: ${({ theme }) => theme.error};
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            outline: 0px solid ${({ theme }) => theme.error}88;
            &:hover{
                background-color: ${({ theme }) => theme.error};
                color: ${({ theme }) => theme.secondary};
                outline-width: 4px;
            }
        }
    }
    td{
        padding: 10px;
        height: 50px;
        border: 2px solid ${({ theme }) => theme.quaternary};
        &:hover{
            text-decoration: underline;
        }
    }
`

const StyledData = styled.table`
    width: 100%;
    border-collapse: collapse;
`


export const SessionPage = () => {
    const { key } = useParams()
    const [data, setData] = React.useState({})
    const navigate = useNavigate()
    const [reload, setReload] = React.useState(0)
    const [deleteMode, setDeleteMode] = React.useState(false)
    const modalForm = useModalForm()
    const { newMessage } = useMessage()

    const handleChangeExpireDate = () => {
        modalForm({
            content: Prompt,
            title: 'SET EXIPRE DATE',
            icon: <FiCalendar />,
            setButton: 'SET',
            type: 'datetime-local',
            initValue: data.expire_date ? dateForDateTimeInputValue(new Date(data.expire_date)) : '',
            todo: (value) => {
                FETCH(ENDPOINTS.sessions.set_expire(key), { value }).then((data) => {
                    setReload((prev) => prev + 1)
                })
            },
        })
    }

    React.useEffect(() => {
        FETCH(ENDPOINTS.sessions.get(key)).then((data) => {
            setData(data.data)
        })
    }, [key, reload])

    const askForValue = (key, initValue='') => {
        modalForm({
            content: ValueProviderModal,
            title: 'VALUE',
            icon: <FiEdit />,
            initValue,
            initType: Object.keys(data.session_data).includes(key) ? data.session_data_types[key] : 'str',
            todo: (value, type) => {
                FETCH(ENDPOINTS.sessions.data.add(data.session_key), { type, value: value, key }).then((data) => {
                    setReload((prev) => prev + 1)
                })
            }
        })

    }

    const handleDeleteData = (key) => {
        FETCH(ENDPOINTS.sessions.data.delete(data.session_key), {key}).then((data) => {
            setReload((prev) => prev + 1)
        })
    }

    const handleAddData = () => {
        modalForm({
            content: Prompt,
            title: 'ADD DATA',
            icon: <FiPlus />,
            setButton: 'ADD',
            type: 'text',
            initValue: '',
            label: 'KEY',
            todo: (key) => {
                if (Object.keys(data.session_data).includes(key)) {
                    newMessage({ error: true, text: 'Key already exists' })
                } else {
                    askForValue(key, '')
                }
            },
        })
    }

    return (
        <MainTemplate
            app={APPS.sessions}
            title={key}
            submenuChildren={
                <>
                    <Button size={1.4} icon={<FiTrash />} subContent="SESSION" second />
                    <Button
                        size={1.4}
                        icon={<FiLogIn />}
                        subContent="LOGIN"
                        second
                        onClick={() => {
                            FETCH(ENDPOINTS.sessions.signin(key)).then((data) => {
                                window.location.reload()
                            })
                        }}
                    />
                    |
                    <Button onClick={handleChangeExpireDate} size={1.4} icon={<FiCalendar />} subContent="EXPIRES" second tooltip={'SET EXIPRE DATE'} />
                    |
                    <Button onClick={handleAddData} size={1.4} icon={<FiPlus />} subContent="DATA" second tooltip={'ADD DATA FIELD'} />
                    <Button onClick={() => setDeleteMode(prev => !prev)} size={1.4} icon={<FiTrash />} subContent="DATA" second tooltip={'DELETE DATA FIELD'} />
                    {data.your_session && <>| <span>It&apos;s your current session!</span></>}
                </>
            }
        >
            {data.session_key && (
                <StyledPage>
                    {data.user && (
                        <>
                            <StyledPart
                                onClick={() => {
                                    navigate(LINKS.users.user(data.user.id))
                                }}
                            >
                                <StyledProfile src={ENDPOINTS.auth.profile(data.user.username)} />
                                <div>
                                    <b>{data.user.username}</b>
                                    <span>{data.user.email}</span>
                                </div>
                            </StyledPart>
                        </>
                    )}
                    <StyledPart>
                        <StyledExpireTime onClick={handleChangeExpireDate}>
                            <span>
                                <FiCalendar /> {data.active ? 'Expires' : 'Expired'}
                            </span>
                            {data.expire_date && <h2>{moment(data.expire_date).format('dddd, MMMM Do YYYY, hh:mm:ss a')}</h2>}
                        </StyledExpireTime>
                    </StyledPart>
                    <div>
                        {data.session_data && (
                            <StyledData>
                                {Object.keys(data.session_data).map((key) => (
                                    <StyledSessionDataField key={key}>
                                        {deleteMode &&  (
                                            <td className='deleteButton'>
                                                <button onClick={() => handleDeleteData(key)}><FiX/></button>
                                            </td>
                                        )}
                                        <td onClick={()=>{askForValue(key, data.session_data[key])}}>{key}</td>
                                        <td onClick={()=>{askForValue(key, data.session_data[key])}}>{variableToPythonString(data.session_data[key])}</td>
                                    </StyledSessionDataField>
                                ))}
                            </StyledData>
                        )}
                    </div>
                </StyledPage>
            )}
        </MainTemplate>
    )
}
