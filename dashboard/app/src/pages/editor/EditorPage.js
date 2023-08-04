import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { AiOutlineClockCircle, AiOutlineHeart } from 'react-icons/ai'
import { useModalForm } from '../../utils/hooks'
import { EditorChooser } from '../../atoms/modalforms/EditorChooser'
import { BiEditAlt } from 'react-icons/bi'
import { LINKS } from '../../router/links'
import { useNavigate } from 'react-router'
import { getIconByFileType } from '../../organisms/files/ItemTile'
import { GETCONFIG, SETCONFIG } from '../../api/configuration'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { Button } from '../../atoms/Button'
import { Loading } from '../../atoms/Loading'
import { SelectFile } from '../../atoms/modalforms/SelectFile'
import { BsFileBreak, BsFolder, BsFolder2Open } from 'react-icons/bs'

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    justify-content: space-around;
`

const StyledFiles = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    min-width: 500px;
    overflow-y: auto;

    padding: 10px;
    height: 100%;
    &::-webkit-scrollbar {
        width: 0;
    }
`

const StyledFile = styled.div`
    color: ${({ theme }) => theme.primary};
    padding: 20px 15px;
    box-shadow: 0 0 5px -3px ${({ theme }) => theme.primary};
    font-size: 20px;
    width: 100%;
    align-items: center;
    gap: 10px;
    display: flex;
    cursor: pointer;
    border-radius: 0 5px 5px 0;
    border-left: 3px solid ${({ theme }) => theme.primary};
    transition: transform 0.3s;
    &:hover {
        transform: scale(0.95);
    }
`
const StyledTitle = styled.h1`
    display: inline-flex;
    align-items: center;
    gap: 10px;
`

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
`

export const EditorPage = () => {
    const [last, setLast] = React.useState([])
    const [liked, setLiked] = React.useState([])
    const modalForm = useModalForm()
    const [loading, setLoading] = React.useState({ liked: true, last: true })
    const navigate = useNavigate()

    React.useEffect(() => {
        GETCONFIG('editor_last').then(async (val) => {
            const lastFiles = (
                await Promise.all(
                    val.files.map(
                        async (file) =>
                            (
                                await FETCH(ENDPOINTS.editor.json(file))
                            ).data
                    )
                )
            ).filter((file) => file.exists)
            SETCONFIG('editor_last', {
                files: lastFiles.map((file) => file.path),
            })
            setLast(lastFiles)
            setLoading((prev) => ({ ...prev, last: false }))
        })
        GETCONFIG('editor_liked').then(async (val) => {
            const likedFiles = (
                await Promise.all(
                    val.files.map(
                        async (file) =>
                            (
                                await FETCH(ENDPOINTS.editor.json(file))
                            ).data
                    )
                )
            ).filter((file) => file.exists)
            SETCONFIG('editor_liked', {
                files: likedFiles.map((file) => file.path),
            })
            setLiked(likedFiles)
            setLoading((prev) => ({ ...prev, liked: false }))
        })
    }, [])

    return (
        <MainTemplate
            app={APPS.editor}
            submenuChildren={
                <Button
                    second
                    size={1.1}
                    onKey={{
                        key: 'o',
                        prevent: true,
                        ctrlKey: true,
                    }}
                    onClick={() => {
                        modalForm({
                            content: SelectFile,
                            title: 'OPEN FILE',
                            icon: <BsFolder2Open />,
                            todo: (path) => {
                                modalForm({
                                    content: EditorChooser,
                                    icon: <BiEditAlt />,
                                    title: 'CHOOSE EDITOR TYPE',
                                    todo: (editorType) => {
                                        navigate(
                                            LINKS.editor.edit(path, editorType)
                                        )
                                    },
                                })
                            },
                        })
                    }}
                >
                    <BsFolder2Open /> OPEN
                </Button>
            }
        >
            <StyledWrapper>
                <StyledColumn>
                    <StyledTitle>
                        <AiOutlineClockCircle />
                        LAST
                    </StyledTitle>
                    {loading.last && <Loading size={2} />}
                    <StyledFiles>
                        {last.map((file) => (
                            <StyledFile
                                onClick={() => {
                                    modalForm({
                                        content: EditorChooser,
                                        icon: <BiEditAlt />,
                                        title: 'CHOOSE EDITOR TYPE',
                                        todo: (editorType) => {
                                            navigate(
                                                LINKS.editor.edit(
                                                    file.path,
                                                    editorType
                                                )
                                            )
                                        },
                                    })
                                }}
                                key={file.path}
                            >
                                {getIconByFileType(file.type)} {file.filename}
                            </StyledFile>
                        ))}
                    </StyledFiles>
                </StyledColumn>
                <StyledColumn>
                    <StyledTitle>
                        <AiOutlineHeart />
                        LIKED
                    </StyledTitle>
                    {loading.liked && <Loading size={2} />}
                    <StyledFiles>
                        {liked.map((file) => (
                            <StyledFile
                                onClick={() => {
                                    modalForm({
                                        content: EditorChooser,
                                        icon: <BiEditAlt />,
                                        title: 'CHOOSE EDITOR TYPE',
                                        todo: (editorType) => {
                                            navigate(
                                                LINKS.editor.edit(
                                                    file.path,
                                                    editorType
                                                )
                                            )
                                        },
                                    })
                                }}
                                key={file.path}
                            >
                                {getIconByFileType(file.type)} {file.filename}
                            </StyledFile>
                        ))}
                    </StyledFiles>
                </StyledColumn>
            </StyledWrapper>
        </MainTemplate>
    )
}
