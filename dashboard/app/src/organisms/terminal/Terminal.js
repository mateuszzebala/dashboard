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
import { useModalForm } from '../../utils/hooks'
import { Prompt } from '../../atoms/modalforms/Prompt'
import { LINKS } from '../../router/links'
import { APPS } from '../../apps/apps'
import { BsGear } from 'react-icons/bs'

const StyledWrapper = styled.div`
    position: relative;
    height: 100%;
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
`

const StyledTerminal = styled.div`
    font-family: 'Fira Mono', monospace;
  font-weight: bold;
`

const StyledPrompt = styled.div`
    color: ${({ theme }) => theme.primary};
    font-size: 18px;
`
const StyledInput = styled.input`
    background-color: transparent;
    color: ${({ theme }) => theme.primary};
    border: 0;
    font-size: 18px;
    font-family: 'Fira Mono', monospace;
    font-weight: bold;
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
    font-family: 'Fira Mono', monospace;
    font-weight: bold;
`

const StyledErrors = styled.pre`
    display: inline;
    color: ${({ theme }) => theme.error};
    font-family: 'Fira Mono', monospace;
    font-weight: bold;
`


export const Terminal = ({ path, setPath }) => {
    const [waiting, setWaiting] = React.useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const modalForm = useModalForm()
    const [folderContent, setFolderContent] = React.useState('')
    const lastInputRef = React.useRef()
    const terminalRef = React.useRef()
    const [commandHistory, setCommandHistory] = React.useState([])
    const [historyCounter, setHistoryCounter] = React.useState(-1)
    const [os, setOs] = React.useState('Linux')
    const [prompts, setPrompts] = React.useState([])

    const focusLastInput = () => {
        terminalRef.current.querySelectorAll('input').forEach((elem) => {
            elem.focus()
        })
    }

    const handleStopProcess = () => {
        FETCH(ENDPOINTS.terminal.kill()).then((data) => {
            data.data.done && setWaiting(false)
        })
    }

    React.useEffect(focusLastInput, [prompts])

    React.useEffect(() => {
        FETCH(ENDPOINTS.terminal.init(), {
            path: searchParams.get('path') || null,
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
            setOs(data.data.os)
        })
    }, [])


    React.useEffect(()=>{
        setSearchParams({path})
        path && FETCH(ENDPOINTS.terminal.init(), {
            path
        }).then((data) => {
            setFolderContent(data.data.folder_content)
        })
    }, [path])

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
        setCommandHistory((prev) => [prompt, ...prev])
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

    const handleArrowButtonDown = (c, index, e) => {
        e.preventDefault()
        setHistoryCounter((prev) => {
            let newCounter = prev + c
            if (newCounter < 0) newCounter = 0
            if (newCounter > commandHistory.length - 1) newCounter = commandHistory.length - 1
            return newCounter
        })
    }

    React.useEffect(()=>{
        if(lastInputRef.current && commandHistory[historyCounter]) lastInputRef.current.value = commandHistory[historyCounter].value
    }, [historyCounter])

    React.useEffect(()=>{
        console.log(commandHistory)
    }, [commandHistory])

    const PromptInput = ({index}) => {
        return (
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
                        handleArrowButtonDown(-1, index, e)
                    e.key === 'ArrowUp' &&
                        handleArrowButtonDown(1, index, e)
                }}
                onChange={(e) => {
                    handleInputChange(index, e)
                }}
                onInput={(e) => {
                    handleInputChange(index, e)
                }}
            />
        )
    }

    return (
        <StyledWrapper onClick={focusLastInput}>
            <FloatingActionButton
                onClick={handleClear}
                size={1.3}
                icon={<AiOutlineClear />}
                second
            />
            <FloatingActionButton size={1.3} right={140} second icon={<APPS.files.icon/>} to={LINKS.files.indexPath(path)}/>
            <FloatingActionButton
                size={1.3}
                second
                right={80}
                icon={<BiBookmark />}
                onClick={() => {
                    modalForm({
                        content: Prompt,
                        label: 'BOOKMARK NAME',
                        title: 'ADD BOOKMARK',
                        icon: <BiBookmark />,
                        setButton: 'ADD'
                    })
                }}
            />
            <FloatingActionButton
                size={1.3}
                icon={<BsGear />}
                right={200}
                second
            />
            {waiting && (
                <FloatingActionButton
                    second
                    size={1.3}
                    right={260}
                    icon={<FaStop />}
                    onClick={handleStopProcess}
                />
            )}

            <StyledTerminal ref={terminalRef}>
                {Object.keys(prompts).map((index) => (
                    <StyledPrompt key={index}>
                        {os === 'Linux' || os === 'Darwin' && (
                            <>
                                <div>{prompts[index].path}</div>
                                <div>
                                    $
                                    <PromptInput index={index}/>
                                </div>
                            </>
                        )}
                        {os === 'Windows' && (
                            <div>{prompts[index].path}&gt;<PromptInput index={index}/></div>
                        )}
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
