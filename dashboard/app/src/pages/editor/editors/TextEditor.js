import React from 'react'
import styled from 'styled-components'
import { centerEllipsis, range } from '../../../utils/utils'
import { FETCH } from '../../../api/api'
import { ENDPOINTS } from '../../../api/endpoints'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Loading } from '../../../atoms/Loading'
import { Button } from '../../../atoms/Button'
import { HiOutlinePlay } from 'react-icons/hi'
import { APPS } from '../../../apps/apps'
import { LINKS } from '../../../router/links'
import { MainTemplate } from '../../../templates/MainTemplate'
import { convertTerminalTextToHTML } from '../../../utils/utils'
import { useLoading, useModalForm, useSettings, useTheme } from '../../../utils/hooks'
import { EditorChooser } from '../../../atoms/modalforms/EditorChooser'
import { ChooseRunner } from '../../../atoms/modalforms/ChooseRunner'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { TbReplaceFilled } from 'react-icons/tb'
import { FiCode, FiDownload, FiEdit, FiPlay, FiSave } from 'react-icons/fi'
import { Theme } from '../../../atoms/Theme'
import { FilePrompt } from '../../../atoms/modalforms/FilePrompt'

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
    padding: 0;
    font-family: ${({theme})=>theme.monoFontFamily}, monospace;
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
    width: 40px;
    height: ${({ height }) => height * 30 + 'px'};
    line-height: 1.2;
    flex-direction: column;
    text-align: right;
    color: ${({ theme }) => theme.tertiary};
    span{
        font-family: ${({theme})=>theme.monoFontFamily}, monospace !important;
        font-weight: bold;
    }
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
    font-family: ${({theme})=>theme.monoFontFamily}, monospace;
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
    const modalForm = useModalForm()
    const [theme] = useTheme()
    const navigate = useNavigate()
    const [data, setData] = React.useState({})
    const [liked, setLiked] = React.useState(false)
    const [value, setValue] = React.useState(false)
    const [savedValue, setSavedValue] = React.useState('')
    const [command, setCommand] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    const [runLoading, setRunLoading] = React.useState(false)
    const [saveLoading, setSaveLoading] = React.useState(false)
    const [settings, setSettings, saveSettings] = useSettings()
    const [saved, setSaved] = React.useState(true)
    const load = useLoading()

    React.useEffect(()=>{
        if(savedValue === value) setSaved(true)
        else setSaved(false)
    }, [value])

    React.useEffect(()=>{
        data.path && saveSettings(prev => ({...prev, 'editor.last': [{name: data.filename, path: data.path, type: data.type}, ...prev['editor.last'].filter(file => file.path !== data.path)]}))
    }, [data])

    React.useEffect(()=>{
        const path = searchParams.get('path')
        setLiked(settings['editor.liked'].some(file => file.path === path))
    }, [settings])


    const handleSave = () => {
        value !== false && setSaveLoading(true)
        value !== false &&
            FETCH(ENDPOINTS.editor.save.text(searchParams.get('path')), {
                content: value,
            }).then(() => {
                setSaveLoading(false)
                setSaved(true)
                setSavedValue(value)
            })
    }

    const handleReload = () => {
        setLoading(true)
        FETCH(ENDPOINTS.files.file(searchParams.get('path')))
            .then((data) => {
                setValue(data.data)
                setSavedValue(data.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    React.useEffect(handleReload, [searchParams])

    React.useEffect(() => {
        FETCH(ENDPOINTS.editor.json(searchParams.get('path'))).then((data) => {
            setData(data.data)
        })
    }, [searchParams])

    React.useEffect(()=>{
        saveSettings()
    }, [liked])

    return (
        <MainTemplate
            app={{
                name: 'TEXT EDITOR',
                icon: FiCode,
                link: LINKS.editor.index()
            }}
            title={centerEllipsis(searchParams.get('path'), 50)}
            submenuChildren={
                <>
                    <Theme value={{...theme, primary: saved ? theme.success : theme.error}}>
                        <Button
                            tooltip={'SAVE FILE'}
                            size={1.4}
                            subContent={'SAVE'}
                            onKey={{
                                key: 's',
                                ctrlKey: true,
                                prevent: true,
                            }}
                            icon={<FiSave />}
                            loading={saveLoading}
                            onClick={handleSave}
                        />
                    </Theme>
                    <Button
                        second
                        subContent={'FOLDER'}
                        to={LINKS.files.indexPath(data.parent)}
                        tooltip={'GO TO FOLDER'}
                        size={1.4}
                        icon={<APPS.files.icon />}
                    />
                    <Button
                        second
                        tooltip={'DOWNLOAD FILE'}
                        subContent={'DOWNLOAD'}
                        size={1.4}
                        target={'_blank'}
                        download="true"
                        to={ENDPOINTS.files.file(searchParams.get('path'))}
                        icon={<FiDownload />}
                    />
                    <Button
                        second
                        icon={<FiEdit />}
                        subContent={'EDITOR'}
                        size={1.4}
                        tooltip={'CHOOSE EDITOR'}
                        onKey={{
                            key: 'e',
                            prevent: true,
                            ctrlKey: true,
                        }}
                        onClick={() => {
                            modalForm({
                                content: EditorChooser,
                                icon: <FiEdit />,
                                title: 'CHOOSE EDITOR TYPE',
                                todo: (editorType) => {
                                    navigate(
                                        LINKS.editor.edit(
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
                        icon={<TbReplaceFilled />} 
                        size={1.4} 
                        subContent={'REPLACE'}
                        onClick={()=>{
                            modalForm({
                                content: FilePrompt,
                                title: 'REPLACE FILE',
                                icon: <TbReplaceFilled/>,
                                todo: (val)=>{
                                    load({
                                        text: 'REPLACEING',
                                        show: true
                                    })
                                    FETCH(ENDPOINTS.editor.replace(searchParams.get('path')), {
                                        file: val,
                                    }).then(()=>{
                                        load({show: false})
                                        handleReload()
                                    })
                                },
                            })
                        }}
                    />
                    <Button
                        second
                        onClick={() => {
                            const path = searchParams.get('path')
                            if(liked){
                                saveSettings(prev => ({...prev, 'editor.liked': prev['editor.liked'].filter(file => file.path !== path)}))
                            }
                            else{
                                saveSettings(prev => ({...prev, 'editor.liked': [{name: data.filename, path: data.path, type: data.type}, ...prev['editor.liked']]}))
                            }
                        }}
                        tooltip={'LIKE'}
                        subContent={liked ? 'UNLIKE' : 'LIKE'}
                        onKey={{
                            key: 'l',
                            prevent: true,
                            ctrlKey: true,
                        }}
                        size={1.4}
                        icon={liked ? <AiFillHeart /> : <AiOutlineHeart />}
                    />
                    |
                    <Button
                        second
                        size={1.4}
                        loading={runLoading}
                        subContent={'RUN'}
                        onKey={{
                            key: 'F5',
                            prevent: true,
                        }}
                        onClick={() => {
                            if (value !== false && command) {
                                setRunLoading(true)
                                FETCH(
                                    ENDPOINTS.editor.save.run(
                                        searchParams.get('path')
                                    ),
                                    { command, content: value }
                                ).then((data) => {
                                    setRunLoading(false)
                                    setSaved(true)
                                    setSavedValue(value)
                                    modalForm({
                                        content: Terminal,
                                        title: 'TERMINAL',
                                        minimizeIcon: true,
                                        icon: <APPS.terminal.icon />,
                                        terminalContent:
                                            data.data.output + data.data.errors,
                                    })
                                })
                            } else {
                                modalForm({
                                    content: ChooseRunner,
                                    title: 'RUN',
                                    icon: <FiPlay />,
                                    filename: data.filename,

                                    todo: (val) => {
                                        setCommand(val)
                                    },
                                })
                            }
                        }}
                        icon={<FiPlay />}
                    ></Button>
                    <span
                        onClick={() => {
                            modalForm({
                                content: ChooseRunner,
                                title: 'RUN',
                                icon: <HiOutlinePlay />,
                                filename: data.filename,

                                todo: (val) => {
                                    setCommand(val)
                                },
                            })
                        }}
                    >
                        {command}
                    </span>
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
