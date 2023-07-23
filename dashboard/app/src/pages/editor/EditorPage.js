import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { AiOutlineClockCircle, AiOutlineHeart } from 'react-icons/ai'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { useModalForm } from '../../utils/hooks'
import { EditorChooser } from '../../atoms/modalforms/EditorChooser'
import { BiEditAlt } from 'react-icons/bi'
import { links } from '../../router/links'
import { useNavigate } from 'react-router'
import { getIconByFileType } from '../../organisms/files/ItemTile'

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
        FETCH(ENDPOINTS.editor.last_and_liked()).then((data) => {
            setLast(data.data.last)
            setLiked(data.data.liked)
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
                                                links.editor.edit(
                                                    file.path,
                                                    editorType
                                                )
                                            )
                                        },
                                    })
                                }}
                                key={file.path}
                            >
                                {getIconByFileType(file.type)} {file.basename}
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
                                                links.editor.edit(
                                                    file.path,
                                                    editorType
                                                )
                                            )
                                        },
                                    })
                                }}
                                key={file.path}
                            >
                                {getIconByFileType(file.type)} {file.basename}
                            </StyledFile>
                        ))}
                    </StyledFiles>
                </StyledColumn>
            </StyledWrapper>
        </MainTemplate>
    )
}
