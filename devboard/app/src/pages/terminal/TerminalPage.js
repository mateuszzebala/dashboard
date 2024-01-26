import React from 'react'
import styled from 'styled-components'
import { ENDPOINTS } from '../../api/endpoints'
import { APPS } from '../../apps/apps'
import { MainTemplate } from '../../templates/MainTemplate'
import { useGlobalKey } from '../../utils/hooks'
import { TERMINAL_CODES, convertKeyToANSI, toBoolStr } from '../../utils/utils'
import Convert from 'ansi-to-html'

const convert = new Convert()

const StyledWrapper = styled.pre`
    position: relative;
    height: 95%;
    max-height: 95%;
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
    font-family: ${({ theme }) => theme.monoFontFamily}, monospace;
    overflow: scroll;
    outline: none;
    &::-webkit-scrollbar {
        height: 0;
    }
    .coursor {
        @keyframes blink {
            0% {
                opacity: 1;
            }
            49% {
                opacity: 1;
            }
            50% {
                opacity: 0;
            }
            100% {
                opacity: 0;
            }
        }
        animation: ${({ focus }) => (focus ? 'blink 1s infinite' : 'none')};
    }
`

export const TerminalPage = () => {
    const socket = React.useRef(null)
    const [socketOpen, setSocketOpen] = React.useState(false)
    const output = React.useRef('')
    const [reloadOutput, setReloadOutput] = React.useState(0)
    const wrapperRef = React.useRef()
    const [focus, setFocus] = React.useState(true)

    const handleSendCommand = (value) => {
        socket.current.send(value)
    }

    useGlobalKey(
        (e) => {
            handleSendCommand(convertKeyToANSI(e))
            e.preventDefault()
        },
        'all',
        socketOpen && focus
    )

    React.useEffect(() => {
        if (wrapperRef.current)
            wrapperRef.current.scrollTo({
                top: wrapperRef.current.scrollHeight + 1000,
            })
    }, [reloadOutput])

    const handleNewMessage = (event) => {
        output.current += event.data
        if (output.current.endsWith(TERMINAL_CODES.CLEAR)) {
            output.current = ''
        }
        setReloadOutput((prev) => prev + 1)
    }

    React.useEffect(() => {
        socket.current = new WebSocket(ENDPOINTS.terminal.sh())
        socket.current.addEventListener('open', () => {
            console.log('WEBSOCKET CONNECTED')
            setSocketOpen(true)
        })
        socket.current.addEventListener('message', handleNewMessage)

        return () => {
            socket.current.removeEventListener('message', handleNewMessage)
        }
    }, [])

    return (
        <MainTemplate padding={5} loading={!socketOpen} app={APPS.terminal}>
            <StyledWrapper dangerouslySetInnerHTML={{ __html: convert.toHtml(output.current) + '<span className="coursor">|</span>' }} autoFocus focus={toBoolStr(focus)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} tabIndex={0} ref={wrapperRef}></StyledWrapper>
        </MainTemplate>
    )
}
