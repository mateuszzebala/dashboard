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
import { GETCONFIG } from '../../api/configuration'

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
    const { ask } = useModalForm()
    const navigate = useNavigate()

    React.useEffect(() => {
        GETCONFIG('editor_last').then(async (val) => {
            setLast(val.files)
        })
        GETCONFIG('editor_liked').then(async (val) => {
            setLiked(val.files)
        })
    }, [])

    return (
        <MainTemplate app={APPS.editor}>
            <StyledWrapper>
                <StyledColumn>
                    <StyledTitle>
                        <AiOutlineHeart />
                        LIKED
                    </StyledTitle>
                    <StyledFiles>
                        {liked.map((file) => (
                            <StyledFile
                                onClick={() => {
                                    ask({
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
                                key={file}
                            >
                                {getIconByFileType(file.type)} {file}
                            </StyledFile>
                        ))}
                    </StyledFiles>
                </StyledColumn>
                <StyledColumn>
                    <StyledTitle>
                        <AiOutlineClockCircle />
                        LAST
                    </StyledTitle>
                    <StyledFiles>
                        {last.map((file) => (
                            <StyledFile
                                onClick={() => {
                                    ask({
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
                                key={file}
                            >
                                {getIconByFileType(file)} {file}
                            </StyledFile>
                        ))}
                    </StyledFiles>
                </StyledColumn>
            </StyledWrapper>
        </MainTemplate>
    )
}
