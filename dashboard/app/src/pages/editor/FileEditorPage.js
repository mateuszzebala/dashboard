import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../../atoms/Button'
import { LuSave } from 'react-icons/lu'
import { HiDownload } from 'react-icons/hi'
import { ENDPOINTS } from '../../api/endpoints'
import { FETCH } from '../../api/api'
import { links } from '../../router/links'
import { useModalForm } from '../../utils/hooks'
import { EditorChooser } from '../../molecules/EditorChooser'
import { BiEditAlt } from 'react-icons/bi'
import { TextEditor } from '../../organisms/files/editors/TextEditor'
import { ImageEditor } from '../../organisms/files/editors/ImageEditor'
import { VideoEditor } from '../../organisms/files/editors/VideoEditor'

export const FileEditorPage = () => {
    const { ask } = useModalForm()
    const navigate = useNavigate()
    const { type } = useParams()
    const [searchParams] = useSearchParams()
    const [data, setData] = React.useState({})
    const [save, setSave] = React.useState(0)

    const handleAskEditor = () => {
        ask({
            content: EditorChooser,
            icon: <BiEditAlt />,
            title: 'Choose Other Editor',
            todo: (editorType) => {
                navigate(
                    links.editor.edit(searchParams.get('path'), editorType)
                )
            },
        })
    }

    React.useEffect(() => {
        FETCH(ENDPOINTS.files.fileJson(searchParams.get('path'))).then(
            (data) => {
                setData(data.data)
            }
        )
    }, [searchParams])

    return (
        <MainTemplate
            app={APPS.editor}
            title={type.toUpperCase() + ' ' + searchParams.get('path')}
            submenuChildren={
                <>
                    <Button
                        second
                        onClick={() => {
                            setSave((prev) => prev + 1)
                        }}
                        tooltip={'SAVE CONTENT'}
                        size={1.3}
                        icon={<LuSave />}
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
                        tooltip={'DOWNLOAD'}
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
                        onClick={handleAskEditor}
                    ></Button>
                </>
            }
        >
            {type.toLowerCase() === 'text' && (
                <TextEditor data={data} save={save} />
            )}
            {type.toLowerCase() === 'image' && (
                <ImageEditor data={data} save={save} />
            )}
            {type.toLowerCase() === 'video' && (
                <VideoEditor data={data} save={save} />
            )}
        </MainTemplate>
    )
}
