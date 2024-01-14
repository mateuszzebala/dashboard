import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { Button, Confirm, Loading, Paginator, Prompt } from '../../atoms'
import { FiCheck, FiCheckCircle, FiKey, FiLock, FiSearch, FiToggleLeft, FiToggleRight, FiTrash, FiUser, FiX, FiXCircle } from 'react-icons/fi'
import styled from 'styled-components'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import moment from 'moment'
import { toBoolStr } from '../../utils/utils'
import { useNavigate } from 'react-router'
import { LINKS } from '../../router/links'
import { useModalForm } from '../../utils/hooks'

const StyledSessionsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 8px;
`

const StyledSession = styled.div`
    cursor: pointer;
    display: inline-flex;
    flex-direction: row;
    padding: 15px;
    gap: 10px;
    width: 100%;
    border-radius: 5px;
    transition: transform 0.3s;
    background-color: ${({ theme, yourSession }) => yourSession ? theme.quaternary : theme.secondary};
    &:hover {
        transform: translateX(${({ deleteMode }) => (deleteMode ? '0px' : '10px')});
    }
    > div {
        display: flex;
        gap: 10px;
        flex-direction: column;
        align-items: flex-start;
    }
    .deleteButton {
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
    }
    > div > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }
`

const StyledActive = styled.div`
    width: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    border-radius: 10%;
    height: 26px;
    background-color: ${({ active, theme }) => (active ? theme.success : theme.error)};
`

const StyledPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`

export const SessionsPage = () => {
    const [active, setActive] = React.useState(true)
    const [deleteMode, setDeleteMode] = React.useState(false)
    const [sessions, setSessions] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [pages, setPages] = React.useState(0)
    const [length, setLength] = React.useState(30)
    const [reload, setReload] = React.useState(0)
    const navigate = useNavigate()
    const modalForm = useModalForm()

    React.useEffect(() => {
        setSessions([])
        FETCH(ENDPOINTS.sessions.filter({ active, page, length })).then((data) => {
            setSessions(data.data.sessions)
            setPages(data.data.pages)
        })
    }, [active, reload, page, length])

    return (
        <MainTemplate
            app={APPS.sessions}
            submenuChildren={
                <>
                    <Button icon={<FiUser />} second size={1.4} subContent="USER" />
                    <Button icon={<FiTrash />} second={!deleteMode} size={1.4} subContent="DELETE" onClick={() => setDeleteMode((prev) => !prev)} />
                    <Button icon={!active ? <FiToggleLeft /> : <FiToggleRight />} second={active} size={1.4} subContent={!active ? 'INACTIVE' : 'ACTIVE'} onClick={() => setActive((prev) => !prev)} />
                </>
            }
        >
            <StyledPage>
                <StyledSessionsWrapper>
                    {sessions.map((session, index) => (
                        <StyledSession
                            yourSession={toBoolStr(session.your_session)}
                            deleteMode={toBoolStr(deleteMode)}
                            onClick={
                                !deleteMode
                                    ? () => {
                                          navigate(LINKS.sessions.session(session.session_key))
                                      }
                                    : () => {}
                            }
                            key={index}
                        >
                            {deleteMode && (
                                <button
                                    onClick={() => {
                                        modalForm({
                                            content: Confirm,
                                            title: 'DELETE SESSION',
                                            icon: <FiTrash />,
                                            text: 'Are you sure you want to delete this session?',
                                            todo: () => {
                                                FETCH(ENDPOINTS.sessions.delete(session.session_key)).then((data) => {
                                                    setReload((prev) => prev + 1)
                                                })
                                            },
                                        })
                                    }}
                                    className="deleteButton"
                                >
                                    <FiX />
                                </button>
                            )}
                            <div>
                                <div>
                                    <StyledActive active={toBoolStr(session.active)}>
                                        <FiKey />
                                    </StyledActive>
                                    {session.user.devboard_access && <FiLock/>}
                                    {session.user && <b>{session.user.username}</b>}
                                    <span>
                                        {session.active ? 'expires ' : 'expired '} {moment(new Date(session.expire_date)).fromNow()}
                                    </span>
                                </div>
                                <div>{session.session_key}</div>
                            </div>
                        </StyledSession>
                    ))}
                </StyledSessionsWrapper>
                {pages > 1 && <Paginator value={page} setValue={setPage} pages={pages} second />}
            </StyledPage>
        </MainTemplate>
    )
}
