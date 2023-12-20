import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { AiOutlineClockCircle, AiOutlineHeart } from 'react-icons/ai'
import { useModalForm, useSettings } from '../../utils/hooks'
import { EditorChooser } from '../../atoms/modalforms/EditorChooser'
import { BiEditAlt } from 'react-icons/bi'
import { LINKS } from '../../router/links'
import { useNavigate } from 'react-router'
import { getIconByFileType } from '../../organisms/files/ItemTile'
import { Button } from '../../atoms/Button'
import { SelectFile } from '../../atoms/modalforms/SelectFile'
import { BsFolder2Open } from 'react-icons/bs'
import { centerEllipsis, toBoolStr } from '../../utils/utils'
import { FiFolder, FiTrash } from 'react-icons/fi'

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
    justify-content: space-between;

    &:hover, &:focus{
        transform: ${({deleteMode}) => deleteMode ? '' : 'scale(0.95)'};
    }
    >span{
        display: inline-flex;
        align-items: center;
        gap: 10px;
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
    const [deleteMode, setDeleteMode] = React.useState(false)
    const modalForm = useModalForm()
    const [settings, setSettings, saveSettings] = useSettings()
    const navigate = useNavigate()

    React.useEffect(() => {
        setLast(settings['editor.last'])
        setLiked(settings['editor.liked'])
    }, [settings])

    return (
        <MainTemplate
            app={APPS.editor}
            submenuChildren={
                <>
                    <Button
                        second
                        size={1.4}
                        subContent='OPEN'
                        tooltip={'OPEN FILE'}
                        icon={<FiFolder /> }
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
                    />
                    <Button onClick={()=>setDeleteMode(prev => !prev)} second={!deleteMode} size={1.4} tooltip={'REMOVE FILE LIST'} subContent='DELETE' icon={<FiTrash/>}/>
                </>
            }
        >
            <StyledWrapper>
                <StyledColumn>
                    <StyledTitle>
                        <AiOutlineClockCircle />
                        LAST
                    </StyledTitle>
                    <StyledFiles>
                        {last.map((file) => (
                            <StyledFile
                                deleteMode={toBoolStr(deleteMode)}
                                onClick={deleteMode ? () => {
                                    saveSettings(prev => ({...prev, 'editor.last': prev['editor.last'].filter(f => f.path != file.path)}))
                                } : () => {
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
                                <span>{getIconByFileType(file.type)} {centerEllipsis(file.name, 30)}</span>
                                {deleteMode && <FiTrash/>}
                            </StyledFile>
                        ))}
                    </StyledFiles>
                </StyledColumn>
                <StyledColumn>
                    <StyledTitle>
                        <AiOutlineHeart />
                        LIKED
                    </StyledTitle>
                    <StyledFiles>
                        {liked.map((file) => (
                            <StyledFile
                                deleteMode={toBoolStr(deleteMode)}
                                onClick={deleteMode ? () => {
                                    saveSettings(prev => ({...prev, 'editor.liked': prev['editor.liked'].filter(f => f.path != file.path)}))
                                } : () => {
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
                                <span>{getIconByFileType(file.type)} {centerEllipsis(file.name, 30)}</span>
                                {deleteMode && <FiTrash/>}
                            </StyledFile>
                        ))}
                    </StyledFiles>
                </StyledColumn>
            </StyledWrapper>
        </MainTemplate>
    )
}
