import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { Button } from '../../atoms/Button'
import { Paginator } from '../../atoms/Paginator'
import styled from 'styled-components'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { centerEllipsis, fieldToString } from '../../utils/utils'
import { useNavigate } from 'react-router'
import { LINKS } from '../../router/links'
import { AiOutlineBell } from 'react-icons/ai'
import moment from 'moment'

const StyledMessages = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: scroll;
    padding: 10px;
    width: 100%;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`
const StyledMessage = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    font-size: 20px;

    padding: 15px 20px;
    flex-direction: column;
    border-radius: 0 5px 5px 0;
    border-left: 3px solid ${({ theme }) => theme.primary};
    cursor: pointer;
    transition: transform 0.3s;
    &:hover {
        transform: translateX(10px);
    }
`

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
`

const StyledTextRow = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 10px;
`

export const MessagesPage = () => {
    const [query, setQuery] = React.useState('')
    const navigate = useNavigate()
    const [messages, setMessages] = React.useState([])
    const [page, setPage] = React.useState([])
    const [pages, setPages] = React.useState([])

    React.useEffect(() => {
        FETCH(
            ENDPOINTS.database.items('Message', {
                length: 30,
                query,
                page,
                orderBy: 'read',
                asc: true
            })
        ).then((data) => {
            setPages(data.data.pages)
            setMessages(data.data.items)
        })
    }, [query, page])

    return (
        <MainTemplate
            app={APPS.messages}
            submenuChildren={
                <>
                    <Button
                        second={query !== ''}
                        onClick={() => {
                            setQuery('')
                        }}
                    >
                        ALL
                    </Button>
                    <Button
                        second={query !== 'read=True'}
                        onClick={() => {
                            setQuery('read=True')
                        }}
                    >
                        READ
                    </Button>
                    <Button
                        second={query !== 'read=False'}
                        onClick={() => {
                            setQuery('read=False')
                        }}
                    >
                        UNREAD
                    </Button>
                </>
            }
        >
            <StyledWrapper>
                <StyledMessages>
                    {messages.map((message) => (
                        <StyledMessage
                            onClick={() => {
                                navigate(
                                    LINKS.messages.message(message.fields.id)
                                )
                            }}
                            key={message.fields.id}
                        >
                            <StyledTextRow>
                                {message.fields.email} -{' '}
                                {moment(
                                    fieldToString(
                                        message.fields.datetime,
                                        'DateTimeField'
                                    )
                                ).fromNow()}
                            </StyledTextRow>
                            <StyledTextRow>
                                {!message.fields.read && <AiOutlineBell />}{' '}
                                {centerEllipsis(message.fields.text, 100)}
                            </StyledTextRow>
                        </StyledMessage>
                    ))}
                </StyledMessages>
                {pages > 1 && (
                    <Paginator
                        second
                        pages={pages}
                        value={page}
                        setValue={setPage}
                    />
                )}
            </StyledWrapper>
        </MainTemplate>
    )
}
