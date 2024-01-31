import React from 'react'
import styled from 'styled-components'
import { ENDPOINTS } from '../../api/endpoints'
import { APPS } from '../../apps/apps'
import { MainTemplate } from '../../templates/MainTemplate'
import { useGlobalKey } from '../../utils/hooks'
import { convertKeyToANSI } from '../../utils/utils'
import { Size as TerminalSize, TerminalGrid, TerminalGridComponent } from '../../utils/byApp/terminal'
import { Loading } from '../../atoms'
import clipboard from 'clipboardy'

const StyledWrapper = styled.div`
    max-height: 100%;
    max-width: 100%;
    outline: none;
    overflow: scroll;
`

export const TerminalPage = () => {
    const socket = React.useRef(null)
    const terminalGrid = React.useRef(null)
    const [socketOpen, setSocketOpen] = React.useState(false)
    const [reloadOutput, setReloadOutput] = React.useState(0)
    const wrapperRef = React.useRef()
    const [focus, setFocus] = React.useState(true)

    const handleSendCommand = (value) => {
        socketOpen && socket.current.send(value)
    }

    useGlobalKey(
        (e) => {
            if (e.metaKey && e.key == 'v') {
                ///
            } else {
                const ansi = convertKeyToANSI(e)
                if (ansi !== null) {
                    handleSendCommand(ansi)
                    //e.preventDefault()
                    setReloadOutput((prev) => prev + 1)
                }
            }
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

    const onPaste = (event) => {
        const clipboardData = event.clipboardData || window.clipboardData
        const pastedText = clipboardData.getData('text')
        console.log({ pastedText })
        socket.current.send(pastedText)
    }
    const enableFocus = () => setFocus(true)
    const disableFocus = () => setFocus(false)

    React.useEffect(() => {
        if (wrapperRef.current) {
            wrapperRef.current.addEventListener('focus', enableFocus)
            wrapperRef.current.addEventListener('blur', disableFocus)
        }
        window.addEventListener('paste', onPaste)
        return () => {
            window.removeEventListener('paste', onPaste)
            if (wrapperRef.current) {
                wrapperRef.current.removeEventListener('focus', enableFocus)
                wrapperRef.current.removeEventListener('blur', disableFocus)
            }
        }
    }, [wrapperRef])

    const handleNewMessage = React.useEffect(() => {
        socket.current = new WebSocket(ENDPOINTS.terminal.sh())
        terminalGrid.current = new TerminalGrid(new TerminalSize(40, 40), () => {
            setReloadOutput((prev) => prev + 1)
        })

        socket.current.addEventListener('open', () => {
            console.log('OPENED')
            setSocketOpen(true)
        })
        socket.current.addEventListener('message', (event) => {
            terminalGrid.current.input(event.data)
        })

        return () => {
            socket.current.removeEventListener('message', handleNewMessage)
        }
    }, [])

    return (
        <MainTemplate padding={5} loading={!socketOpen} app={APPS.terminal}>
            <StyledWrapper tabIndex={0} ref={wrapperRef}>
                {socketOpen ? (
                    <TerminalGridComponent
                        sendCommand={(command) => {
                            handleSendCommand(command)
                        }}
                        socketOpen={socketOpen}
                        reload={reloadOutput}
                        setReload={setReloadOutput}
                        charSize={{ width: 12, height: 22 }}
                        terminalGrid={terminalGrid.current}
                    />
                ) : (
                    <Loading size={2} />
                )}
            </StyledWrapper>
        </MainTemplate>
    )
}
