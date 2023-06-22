import React from 'react'
import styled from 'styled-components'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { AiOutlineClear } from 'react-icons/ai'
import { FloatingActionButton } from '../../atoms/FloatingActionButton'
import { BiBookmark } from 'react-icons/bi'
import { convertTerminalTextToHTML } from '../../utils/utils'
import { useSearchParams } from 'react-router-dom'
import { FaStop } from 'react-icons/fa'

const StyledWrapper = styled.div`
    position: relative;
    height: 100%;
    background-color: ${({ theme }) => theme.light};
    color: ${({ theme }) => theme.primary};
`
const StyledTerminal = styled.div``

const StyledPrompt = styled.div`
    color: ${({ theme }) => theme.primary};
    font-size: 18px;
`
const StyledInput = styled.input`
    background-color: transparent;
    color: ${({ theme }) => theme.primary};
    border: 0;
    font-size: 18px;
    padding: 0 5px;
    &:focus {
        outline: none;
    }
    &:disabled {
        color: ${({ theme }) => theme.primary};
    }
`

const StyledPre = styled.pre`
    display: inline;
    font-family: var(--font-family) !important;
`

const StyledErrors = styled.pre`
    display: inline;
    color: ${({ theme }) => theme.error};
    font-family: var(--font-family) !important;
`

export const Terminal = () => {
    const [waiting, setWaiting] = React.useState(false)
    const [searchParams] = useSearchParams()
    const [path, setPath] = React.useState('')
    const [folderContent, setFolderContent] = React.useState('')
    const lastInputRef = React.useRef()
    const terminalRef = React.useRef()
    const [commandHistory, setCommandHistory] = React.useState([])
    const [historyCounter, setHistoryCounter] = React.useState(-1)

    const [prompts, setPrompts] = React.useState([])

    const focusLastInput = () => {
        terminalRef.current.querySelectorAll('input').forEach((elem) => {
            elem.focus()
        })
    }

    const handleStopProcess = () => {
        FETCH(ENDPOINTS.terminal.kill()).then(() => {
            setWaiting(false)
        })
    }

    React.useEffect(focusLastInput, [prompts])

    React.useEffect(() => {
        FETCH(ENDPOINTS.terminal.init(), {
            path: searchParams.get('path') || 'null',
        }).then((data) => {
            setPath(data.data.path)
            setFolderContent(data.data.folder_content)
            setPrompts([
                {
                    path: data.data.path,
                    output: '',
                    value: '',
                    sent: false,
                },
            ])
        })
    }, [searchParams])

    const handleClear = () => {
        setPrompts([
            {
                path: path,
                output: '',
                value: '',
                sent: false,
            },
        ])
    }

    const handleEnterDown = (prompt, e) => {
        if (e.target.value === 'clear' || e.target.value === 'cls') {
            handleClear()
            return
        }

        setPrompts((prev) => {
            const newPrompts = [...prev]
            const index = newPrompts.indexOf(prompt)
            newPrompts[index].sent = true
            return newPrompts
        })
        setCommandHistory((prev) => {
            const newHistory = [...prev]
            newHistory.push(prompt)
            return newHistory
        })
        setWaiting(true)
        FETCH(ENDPOINTS.terminal.command(), {
            command: e.target.value,
            path: prompt.path,
        })
            .then((data) => {
                setPrompts((prev) => {
                    const newPrompts = [...prev]
                    const index = newPrompts.indexOf(prompt)
                    newPrompts[index].output = data.data.output
                    newPrompts[index].errors = data.data.errors
                    return newPrompts
                })
                setPath(data.data.path)
                setPrompts((prev) => [
                    ...prev,
                    {
                        path: data.data.path,
                    },
                ])
                setWaiting(false)
            })
            .catch(() => {
                setWaiting(false)
            })
    }

    const handleTabDown = (index, e) => {
        e.preventDefault()
        setPrompts((prev) => {
            const newPrompts = [...prev]

            const contentParts = e.target.value.split(' ')
            let best_value = contentParts.slice(-1)

            folderContent.forEach((item) => {
                if (item.startsWith(contentParts.slice(-1))) {
                    best_value = item
                }
            })

            newPrompts[index].value =
                contentParts.slice(0, -1).join(' ').trim() + ' ' + best_value
            return newPrompts
        })
    }

    const handleInputChange = (index, e) => {
        setPrompts((prev) => {
            const newPrompts = [...prev]
            newPrompts[index].value = e.target.value
            return newPrompts
        })
    }

    const handleArrowButtonDown = (c, index) => {
        setHistoryCounter((prev) => prev + c)
        setPrompts((prev) => {
            const newPrompts = [...prev]
            newPrompts[index].value = commandHistory[historyCounter + c]
            return newPrompts
        })
    }

    return (
        <StyledWrapper onClick={focusLastInput}>
            <FloatingActionButton
                onClick={handleClear}
                size={1.2}
                icon={<AiOutlineClear />}
            />

            <FloatingActionButton size={1.2} right={80} icon={<BiBookmark />} />
            {waiting && (
                <FloatingActionButton
                    size={1.2}
                    right={140}
                    icon={<FaStop />}
                    onClick={handleStopProcess}
                />
            )}

            <StyledTerminal ref={terminalRef}>
                {Object.keys(prompts).map((index) => (
                    <StyledPrompt key={index}>
                        <div>{prompts[index].path}</div>
                        <div>
                            $
                            <StyledInput
                                ref={lastInputRef}
                                autoFocus
                                value={prompts[index].value || ''}
                                disabled={prompts[index].sent}
                                onKeyDown={(e) => {
                                    e.key === 'Enter' &&
                                        handleEnterDown(prompts[index], e)
                                    e.key === 'Tab' && handleTabDown(index, e)
                                    e.key === 'ArrowDown' &&
                                        handleArrowButtonDown(1, index, e)
                                    e.key === 'ArrowUp' &&
                                        handleArrowButtonDown(-1, index, e)
                                }}
                                onChange={(e) => {
                                    handleInputChange(index, e)
                                }}
                                onInput={(e) => {
                                    handleInputChange(index, e)
                                }}
                            />
                        </div>
                        {prompts[index].output ? (
                            <>
                                <br />
                                <StyledPre
                                    dangerouslySetInnerHTML={{
                                        __html: convertTerminalTextToHTML(
                                            prompts[index].output
                                        ),
                                    }}
                                />
                                <br />
                            </>
                        ) : (
                            <>
                                <StyledErrors
                                    dangerouslySetInnerHTML={{
                                        __html: convertTerminalTextToHTML(
                                            prompts[index].errors
                                        ),
                                    }}
                                />
                            </>
                        )}
                        <br />
                    </StyledPrompt>
                ))}
            </StyledTerminal>
        </StyledWrapper>
    )
}
