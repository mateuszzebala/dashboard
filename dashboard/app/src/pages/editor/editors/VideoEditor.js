import React from 'react'
import { ENDPOINTS } from '../../../api/endpoints'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button, EditorChooser } from '../../../atoms'
import { HiDownload, HiOutlineColorSwatch } from 'react-icons/hi'
import { APPS } from '../../../apps/apps'
import { LINKS } from '../../../router/links'
import { LuSave } from 'react-icons/lu'
import { MainTemplate } from '../../../templates/MainTemplate'
import { BiCrop, BiEditAlt, BiSolidDropletHalf } from 'react-icons/bi'
import { useModalForm } from '../../../utils/hooks'
import { BsFillBrightnessHighFill } from 'react-icons/bs'
import { IoMdContrast } from 'react-icons/io'
import { TbTemperature } from 'react-icons/tb'
import { FiScissors } from 'react-icons/fi'

export const VideoEditor = () => {
    const [searchParams] = useSearchParams()
    const { type } = useParams()
    const modalForm = useModalForm()
    const navigate = useNavigate()
    const [data] = React.useState({})
    const [saveLoading] = React.useState(false)

    return (
        <MainTemplate
            app={APPS.editor}
            title={type.toUpperCase() + ' - ' + searchParams.get('path')}
            submenuChildren={
                <>
                    <Button
                        second
                        tooltip={'SAVE IMAGE'}
                        size={1.3}
                        icon={<LuSave />}
                        loading={saveLoading}
                    />
                    <Button
                        second
                        to={LINKS.files.indexPath(data.parent)}
                        tooltip={'OPEN FOLDER'}
                        size={1.3}
                        icon={<APPS.files.icon />}
                    />
                    <Button
                        second
                        tooltip={'DOWNLOAD IMAGE'}
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
                            modalForm({
                                content: EditorChooser,
                                icon: <BiEditAlt />,
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
                    |
                    <Button
                        second
                        tooltip={'BRIGHTNESS'}
                        size={1.3}
                        icon={<BsFillBrightnessHighFill />}
                    />
                    <Button
                        second
                        tooltip={'CONTRAST'}
                        size={1.3}
                        icon={<IoMdContrast />}
                    />
                    <Button
                        second
                        tooltip={'COLORS'}
                        size={1.3}
                        icon={<HiOutlineColorSwatch />}
                    />
                    <Button
                        second
                        tooltip={'CROP'}
                        size={1.3}
                        icon={<BiCrop />}
                    />
                    <Button
                        second
                        tooltip={'SATURATION'}
                        size={1.3}
                        icon={<BiSolidDropletHalf />}
                    />
                    <Button
                        second
                        tooltip={'TEMPERATURE'}
                        size={1.3}
                        icon={<TbTemperature />}
                    />
                    <Button
                        second
                        tooltip={'CUT'}
                        size={1.3}
                        icon={<FiScissors />}
                    />
                </>
            }
        >
            <video
                width={450}
                height={300}
                src={ENDPOINTS.files.file(searchParams.get('path'))}
            />
        </MainTemplate>
    )
}
