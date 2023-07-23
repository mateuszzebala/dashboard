import React from 'react'
import styled from 'styled-components'
import { range } from '../../../utils/utils'
import { FETCH } from '../../../api/api'
import { ENDPOINTS } from '../../../api/endpoints'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Loading } from '../../../atoms/Loading'
import { Button } from '../../../atoms/Button'
import { useParams } from 'react-router-dom'
import { HiDownload } from 'react-icons/hi'
import { APPS } from '../../../apps/apps'
import { links } from '../../../router/links'
import { LuSave } from 'react-icons/lu'
import { MainTemplate } from '../../../templates/MainTemplate'
import { BiEditAlt } from 'react-icons/bi'
import { convertTerminalTextToHTML } from '../../../utils/utils'
import { useModalForm } from '../../../utils/hooks'
import { EditorChooser } from '../../../atoms/modalforms/EditorChooser'
import { ChooseRunner } from '../../../atoms/modalforms/ChooseRunner'
import { BsFillPlayFill, BsPlay } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'

const StyledWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    gap: 5px;
    overflow-y: scroll;
`

const StyledTextArea = styled.textarea`
    border: 0;
    width: 100%;
    height: ${({ height }) => height * 30 + 'px'};
    line-height: 1.2;
    font-size: 20px;
    resize: none;
    white-space: pre;
    overflow-wrap: normal;
    overflow-x: scroll;
    padding: 0;

    overflow: scroll;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.secondary};
    &:focus {
        outline: none;
    }
    &::-webkit-scrollbar {
        height: 0;
    }
`
const StyledLines = styled.div`
    font-size: 20px;
    display: flex;
    padding: 0;
    width: 50px;
    height: ${({ height }) => height * 30 + 'px'};
    line-height: 1.2;
    flex-direction: column;
    text-align: right;
    color: ${({ theme }) => theme.tertiary};

    &::-webkit-scrollbar {
        height: 0;
        width: 0;
    }
`

const StyledLoading = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`

const StyledIde = styled.div`
    display: flex;
    height: 100%;
`

const StyledTerminal = styled.pre`
    font-family: var(--font-family);
    color: ${({ theme }) => theme.primary};
    font-size: 20px;
    overflow: scroll;
    max-width: 80vw;
    max-height: 70vh;
    min-height: 70vh;
    min-width: 80vw;
`

const Lines = ({ max }) => {
    const linesRef = React.useRef()

    return (
        <StyledLines ref={linesRef}>
            {range(1, max).map((line) => (
                <span key={line}>{line + 1}</span>
            ))}
        </StyledLines>
    )
}

const Terminal = ({ terminalContent }) => (
    <StyledTerminal
        dangerouslySetInnerHTML={{
            __html: convertTerminalTextToHTML(terminalContent),
        }}
    />
)

export const TextEditor = () => {
    const [searchParams] = useSearchParams()
    const { type } = useParams()
    const { ask } = useModalForm()
    const navigate = useNavigate()
    const [data, setData] = React.useState({})
    const [value, setValue] = React.useState(false)
    const [command, setCommand] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    const [runLoading, setRunLoading] = React.useState(false)
    const [saveLoading, setSaveLoading] = React.useState(false)

    const handleSave = () => {
        value !== false && setSaveLoading(true)
        value !== false &&
            FETCH(ENDPOINTS.editor.save.text(searchParams.get('path')), {
                content: value,
            }).then(() => {
                setSaveLoading(false)
            })
    }

    React.useEffect(() => {
        FETCH(ENDPOINTS.files.file(searchParams.get('path')))
            .then((data) => {
                setValue(data.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    React.useEffect(() => {
        FETCH(ENDPOINTS.editor.json(searchParams.get('path'))).then((data) => {
            setData(data.data)
        })
    }, [searchParams])

    return (
        <MainTemplate
            app={APPS.editor}
            title={type.toUpperCase() + ' - ' + searchParams.get('path')}
            submenuChildren={
                <>
                    <Button
                        second
                        tooltip={'SAVE FILE'}
                        size={1.3}
                        icon={<LuSave />}
                        loading={saveLoading}
                        onClick={handleSave}
                    />
                    <Button
                        second
                        to={links.files.indexPath(data.parent)}
                        tooltip={'OPEN FOLDER'}
                        size={1.3}
                        icon={<APPS.files.icon />}
                    />
                    <Button
                        second
                        tooltip={'DOWNLOAD FILE'}
                        size={1.3}
                        target={'_blank'}
                        download="true"
                        to={ENDPOINTS.files.file(searchParams.get('path'))}
                        icon={<HiDownload />}
                    />
                    <Button
                        second
                        icon={<BiEditAlt />}
                        size={1.3}
                        tooltip={'CHOOSE EDITOR'}
                        onClick={() => {
                            ask({
                                content: EditorChooser,
                                icon: <BiEditAlt />,
                                title: 'CHOOSE EDITOR TYPE',
                                todo: (editorType) => {
                                    navigate(
                                        links.editor.edit(
                                            searchParams.get('path'),
                                            editorType
                                        )
                                    )
                                },
                            })
                        }}
                    />
                    <Button
                        second
                        onClick={() => {
                            FETCH(
                                ENDPOINTS.editor.like(searchParams.get('path'))
                            )
                        }}
                        tooltip={'LIKE'}
                        size={1.3}
                        icon={<AiOutlineHeart />}
                    />
                    |
                    <Button
                        second
                        size={1.1}
                        onClick={() => {
                            ask({
                                content: ChooseRunner,
                                title: 'RUNNER',
                                icon: <BsFillPlayFill />,
                                filename: data.filename,
                                todo: (val) => {
                                    setCommand(val)
                                },
                            })
                        }}
                    >
                        {command ? command : 'RUNNER'}
                    </Button>
                    {command.length >= 1 && (
                        <Button
                            second
                            size={1.3}
                            icon={<BsPlay />}
                            loading={runLoading}
                            onClick={() => {
                                if (value !== false) {
                                    setRunLoading(true)
                                    FETCH(
                                        ENDPOINTS.editor.save.run(
                                            searchParams.get('path')
                                        ),
                                        { command, content: value }
                                    ).then((data) => {
                                        setRunLoading(false)
                                        ask({
                                            content: Terminal,
                                            title: 'TERMINAL',
                                            icon: <APPS.terminal.icon />,
                                            terminalContent:
                                                data.data.output +
                                                data.data.errors,
                                        })
                                    })
                                }
                            }}
                        />
                    )}
                </>
            }
        >
            {loading && (
                <StyledLoading>
                    <Loading size={2} />
                </StyledLoading>
            )}

            {!loading && (
                <StyledIde>
                    <StyledWrapper>
                        <Lines
                            max={value.split('\n').length}
                            height={value.split('\n').length}
                        />
                        <StyledTextArea
                            onKeyDown={(e) => {
                                if (e.key == 'Tab') {
                                    e.preventDefault()
                                    var start = e.target.selectionStart
                                    var end = e.target.selectionEnd
                                    e.target.value =
                                        e.target.value.substring(0, start) +
                                        '\t' +
                                        e.target.value.substring(end)
                                    e.target.selectionStart =
                                        e.target.selectionEnd = start + 1
                                    setValue(e.target.value)
                                }
                                if (e.key === 's' && e.ctrlKey) {
                                    e.preventDefault()
                                    handleSave()
                                }
                            }}
                            preformate
                            spellCheck={false}
                            height={value.split('\n').length}
                            onChange={(e) => {
                                setValue(e.target.value)
                            }}
                            value={value}
                        />
                    </StyledWrapper>
                </StyledIde>
            )}
        </MainTemplate>
    )
}
