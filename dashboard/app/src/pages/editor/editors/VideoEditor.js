import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { ENDPOINTS } from '../../../api/endpoints'
import { Button } from '../../../atoms/Button'
import { HiDownload } from 'react-icons/hi'
import { APPS } from '../../../apps/apps'
import { links } from '../../../router/links'
import { LuSave } from 'react-icons/lu'
import { FETCH } from '../../../api/api'
import { MainTemplate } from '../../../templates/MainTemplate'
import { BiEditAlt } from 'react-icons/bi'

export const VideoEditor = () => {
    const [searchParams] = useSearchParams()
    const { type } = useParams()
    const [data, setData] = React.useState({})

    React.useEffect(() => {
        FETCH(ENDPOINTS.editor.json(searchParams.get('path'))).then((data) => {
            setData(data.data)
        })
    }, [searchParams])

    return (
        <MainTemplate
            app={APPS.editor}
            title={type.toUpperCase() + ' ' + searchParams.get('path')}
            submenuChildren={
                <>
                    <Button
                        second
                        tooltip={'SAVE VIDEO'}
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
                        tooltip={'DOWNLOAD VIDEO'}
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
                    ></Button>
                </>
            }
        ></MainTemplate>
    )
}
