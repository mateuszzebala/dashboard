import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { AiOutlineHeart } from 'react-icons/ai'
import { useModalForm, useSettings } from '../../utils/hooks'
import { Button, EditorChooser, SelectFile } from '../../atoms'
import { BiEditAlt } from 'react-icons/bi'
import { LINKS } from '../../router/links'
import { useNavigate } from 'react-router'
import { getIconByFileType } from '../../organisms/files/ItemTile'
import { BsFolder2Open } from 'react-icons/bs'
import { centerEllipsis, toBoolStr } from '../../utils/utils'
import { FiClock, FiFolder, FiTrash } from 'react-icons/fi'
import { isMobile } from 'react-device-detect'

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    justify-content: flex-start;
`

const StyledFiles = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    min-width: 300px;
    overflow-y: auto;
    width: 100%;
    padding: 10px;
    &::-webkit-scrollbar {
        width: 0;
    }
`

const StyledFile = styled.div`
    color: ${({ theme }) => theme.primary};
    padding: 20px 15px;
    background-color: ${({ theme }) => theme.quaternary};
    box-shadow: 0 0 5px -3px ${({ theme }) => theme.primary};
    font-size: 20px;
    width: 100%;
    align-items: center;
    outline: 0px solid ${({ theme }) => theme.quaternary}88;
    gap: 10px;
    display: flex;
    cursor: pointer;
    border-radius: 10px;
    transition: outline-width 0.1s;
    justify-content: space-between;
    &:hover,
    &:focus {
        outline-width: 7px;
    }
    > span {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 30px;
        }
    }
`
const StyledTitle = styled.h1`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 30px;
`

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: ${({ isMobile }) => (isMobile ? '100%' : '50%')};
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
                        subContent="OPEN"
                        tooltip={'OPEN FILE'}
                        icon={<FiFolder />}
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
                                            navigate(LINKS.editor.edit(path, editorType))
                                        },
                                    })
                                },
                            })
                        }}
                    />
                    <Button onClick={() => setDeleteMode((prev) => !prev)} second={!deleteMode} size={1.4} tooltip={'REMOVE FILE LIST'} subContent="DELETE" icon={<FiTrash />} />
                </>
            }
        >
            <StyledWrapper>
                <StyledColumn isMobile={toBoolStr(isMobile)}>
                    <StyledTitle>
                        <AiOutlineHeart />
                        LIKED
                    </StyledTitle>
                    <StyledFiles>
                        {liked.map((file) => (
                            <StyledFile
                                deleteMode={toBoolStr(deleteMode)}
                                onClick={
                                    deleteMode
                                        ? () => {
                                              saveSettings((prev) => ({ ...prev, 'editor.liked': prev['editor.liked'].filter((f) => f.path != file.path) }))
                                          }
                                        : () => {
                                              modalForm({
                                                  content: EditorChooser,
                                                  icon: <BiEditAlt />,
                                                  title: 'CHOOSE EDITOR TYPE',
                                                  todo: (editorType) => {
                                                      navigate(LINKS.editor.edit(file.path, editorType))
                                                  },
                                              })
                                          }
                                }
                                key={file.path}
                            >
                                <span>
                                    <span className="icon">{getIconByFileType(file.type)}</span>
                                    {centerEllipsis(file.name, 30)}
                                </span>
                                {deleteMode && <FiTrash />}
                            </StyledFile>
                        ))}
                        {last.length == 0 && <span>LIST IS EMPTY</span>}
                    </StyledFiles>
                </StyledColumn>
                <StyledColumn isMobile={toBoolStr(isMobile)}>
                    <StyledTitle>
                        <FiClock />
                        LAST
                    </StyledTitle>
                    <StyledFiles>
                        {last.map((file) => (
                            <StyledFile
                                deleteMode={toBoolStr(deleteMode)}
                                onClick={
                                    deleteMode
                                        ? () => {
                                              saveSettings((prev) => ({ ...prev, 'editor.last': prev['editor.last'].filter((f) => f.path != file.path) }))
                                          }
                                        : () => {
                                              modalForm({
                                                  content: EditorChooser,
                                                  icon: <BiEditAlt />,
                                                  title: 'CHOOSE EDITOR TYPE',
                                                  todo: (editorType) => {
                                                      navigate(LINKS.editor.edit(file.path, editorType))
                                                  },
                                              })
                                          }
                                }
                                key={file.path}
                            >
                                <span>
                                    <span className="icon">{getIconByFileType(file.type)}</span>
                                    {centerEllipsis(file.name, 30)}
                                </span>
                                {deleteMode && <FiTrash />}
                            </StyledFile>
                        ))}
                        {last.length == 0 && <span>LIST IS EMPTY</span>}
                    </StyledFiles>
                </StyledColumn>
            </StyledWrapper>
        </MainTemplate>
    )
}
