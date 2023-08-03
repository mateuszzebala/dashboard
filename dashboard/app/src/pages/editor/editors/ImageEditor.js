import React from 'react'
import { ENDPOINTS } from '../../../api/endpoints'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '../../../atoms/Button'
import { useParams } from 'react-router-dom'
import { HiDownload, HiOutlineColorSwatch } from 'react-icons/hi'
import { APPS } from '../../../apps/apps'
import { LINKS } from '../../../router/links'
import { LuSave } from 'react-icons/lu'
import { MainTemplate } from '../../../templates/MainTemplate'
import { BiCrop, BiEditAlt, BiSolidDropletHalf } from 'react-icons/bi'
import { useModalForm } from '../../../utils/hooks'
import { EditorChooser } from '../../../atoms/modalforms/EditorChooser'
import { BsFillBrightnessHighFill } from 'react-icons/bs'
import { IoMdContrast } from 'react-icons/io'
import { TbBlur, TbReplaceFilled } from 'react-icons/tb'
import { centerEllipsis, getCursorByPosition } from '../../../utils/utils'
import { GETCONFIG, SETCONFIG } from '../../../api/configuration'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import styled from 'styled-components'
import { RangeChooser } from '../../../atoms/modalforms/RangeChooser'
import { IoInvertModeOutline } from 'react-icons/io5'
import { FETCH } from '../../../api/api'
import { useMessage } from '../../../utils/messages'

const StyledImageWrapper = styled.div`
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
    box-shadow: 0 0 8px -3px ${({ theme }) => theme.primary};
    position: relative;
    overflow: hidden;
`

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;

    justify-content: center;
`

const StyledCrop = styled.div`
    position: absolute;
    left: ${({ crop }) => crop.x + '%'};
    top: ${({ crop }) => crop.y + '%'};
    width: ${({ crop }) => crop.width + '%'};
    height: ${({ crop }) => crop.height + '%'};
    background-color: ${({ theme }) => theme.secondary}22;
    border-radius: 4px;
    border: 3px solid ${({ theme }) => theme.primary};
    display: grid;
    justify-content: space-between;
    align-items: space-between;
    grid-template-columns: repeat(3, 5px);
    gap: 48%;
    grid-template-rows: repeat(3, 5px);
`

const CropDot = ({ top, left, setCrop }) => {
    return (
        <StyledCropDot
            cursor={getCursorByPosition(top, left)}
            top={top}
            left={left}
        />
    )
}

const StyledCropDot = styled.div`
    width: 10px;
    height: 10px;
    position: absolute;
    cursor: ${({ cursor }) => cursor};
    top: ${({ top }) =>
        top === 'top' ? 0 : top === 'bottom' ? '100%' : '50%'};
    left: ${({ left }) =>
        left === 'left' ? 0 : left === 'right' ? '100%' : '50%'};
    background-color: ${({ theme }) => theme.primary};
    transform: translate(-50%, -50%);
    border-radius: 2px;
`

const StyledImage = styled.img`
    filter: hue-rotate(${({ style }) => style.colors}deg)
        saturate(${({ style }) => style.saturation}%)
        blur(${({ style }) => style.blur}px)
        brightness(${({ style }) => style.brightness}%)
        contrast(${({ style }) => style.contrast}%)
        invert(${({ style }) => style.invert}%);
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
`

export const ImageEditor = () => {
    const [searchParams] = useSearchParams()
    const { type } = useParams()
    const modalForm = useModalForm()
    const navigate = useNavigate()
    const [liked, setLiked] = React.useState(false)
    const [image, setImage] = React.useState({})
    const [saveLoading, setSaveLoading] = React.useState(false)
    const { newMessage } = useMessage()
    const [crop, setCrop] = React.useState({
        show: false,
        x: 10,
        y: 10,
        width: 80,
        height: 80,
    })
    const [style, setStyle] = React.useState({
        colors: 0,
        saturation: 100,
        blur: 0,
        brightness: 100,
        contrast: 100,
        invert: 0,
    })

    React.useEffect(() => {
        FETCH(ENDPOINTS.editor.json(searchParams.get('path'))).then((data) => {
            setImage(data.data)
        })
    }, [])

    const addToLast = async () => {
        GETCONFIG('editor_last').then((value) => {
            SETCONFIG('editor_last', {
                files: [
                    ...new Set([searchParams.get('path'), ...value.files]),
                ].slice(0, 50),
            })
        })
        GETCONFIG('editor_liked').then((value) => {
            setLiked(value.files.includes(searchParams.get('path')))
        })
    }

    React.useEffect(() => {
        addToLast()
    }, [])

    React.useEffect(() => {
        GETCONFIG('editor_liked').then((value) => {
            if (liked) {
                SETCONFIG('editor_liked', {
                    files: [searchParams.get('path'), ...value.files],
                })
            } else {
                SETCONFIG('editor_liked', {
                    files: value.files.filter(
                        (file) => file !== searchParams.get('path')
                    ),
                })
            }
        })
    }, [liked])

    return (
        <MainTemplate
            app={APPS.editor}
            title={
                type.toUpperCase() +
                ' - ' +
                centerEllipsis(searchParams.get('path'), 50)
            }
            submenuChildren={
                <>
                    <Button
                        second
                        tooltip={'SAVE IMAGE'}
                        size={1.3}
                        icon={<LuSave />}
                        loading={saveLoading}
                        onClick={() => {
                            setSaveLoading(true)
                            FETCH(
                                ENDPOINTS.editor.save.image(
                                    searchParams.get('path')
                                ),
                                {
                                    props: JSON.stringify(style),
                                }
                            ).then(() => {
                                setSaveLoading(false)
                                newMessage({
                                    text: 'IMAGE SAVED',
                                })
                            })
                        }}
                    />
                    <Button
                        second
                        to={LINKS.files.indexPath(image.parent)}
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
                    <Button second icon={<TbReplaceFilled />} size={1.3} />
                    <Button
                        second
                        onClick={() => {
                            setLiked((prev) => !prev)
                        }}
                        tooltip={'LIKE'}
                        size={1.3}
                        icon={liked ? <AiFillHeart /> : <AiOutlineHeart />}
                    />
                    |
                    <Button
                        second
                        tooltip={'BRIGHTNESS'}
                        size={1.3}
                        icon={<BsFillBrightnessHighFill />}
                        onClick={() => {
                            modalForm({
                                content: RangeChooser,
                                title: 'BRIGHTNESS',
                                icon: <BsFillBrightnessHighFill />,
                                min: 0,
                                max: 200,
                                start: style.brightness,
                                transparentCurtain: true,
                                todo: (val) => {
                                    setStyle((prev) => ({
                                        ...prev,
                                        brightness: val,
                                    }))
                                },
                            })
                        }}
                    />
                    <Button
                        second
                        tooltip={'CONTRAST'}
                        size={1.3}
                        icon={<IoMdContrast />}
                        onClick={() => {
                            modalForm({
                                content: RangeChooser,
                                title: 'CONTRAST',
                                icon: <IoMdContrast />,
                                min: 0,
                                max: 200,
                                start: style.contrast,
                                transparentCurtain: true,
                                todo: (val) => {
                                    setStyle((prev) => ({
                                        ...prev,
                                        contrast: val,
                                    }))
                                },
                            })
                        }}
                    />
                    <Button
                        second
                        tooltip={'COLORS'}
                        size={1.3}
                        icon={<HiOutlineColorSwatch />}
                        onClick={() => {
                            modalForm({
                                content: RangeChooser,
                                title: 'COLORS',
                                icon: <HiOutlineColorSwatch />,
                                min: -180,
                                max: 180,
                                start: style.colors,
                                transparentCurtain: true,
                                todo: (val) => {
                                    setStyle((prev) => ({
                                        ...prev,
                                        colors: val,
                                    }))
                                },
                            })
                        }}
                    />
                    <Button
                        second
                        tooltip={'CROP'}
                        size={1.3}
                        icon={<BiCrop />}
                        onClick={() => {
                            setCrop((prev) => ({
                                ...prev,
                                show: !prev.show,
                            }))
                        }}
                    />
                    <Button
                        second
                        tooltip={'SATURATION'}
                        size={1.3}
                        icon={<BiSolidDropletHalf />}
                        onClick={() => {
                            modalForm({
                                content: RangeChooser,
                                title: 'SATURATION',
                                icon: <BiSolidDropletHalf />,
                                min: 0,
                                max: 200,
                                start: style.saturation,
                                transparentCurtain: true,
                                todo: (val) => {
                                    setStyle((prev) => ({
                                        ...prev,
                                        saturation: val,
                                    }))
                                },
                            })
                        }}
                    />
                    <Button
                        second
                        tooltip={'BLUR'}
                        size={1.3}
                        icon={<TbBlur />}
                        onClick={() => {
                            modalForm({
                                content: RangeChooser,
                                title: 'BLUR',
                                icon: <TbBlur />,
                                min: 0,
                                max: 40,
                                start: style.blur,
                                transparentCurtain: true,
                                todo: (val) => {
                                    setStyle((prev) => ({
                                        ...prev,
                                        blur: val,
                                    }))
                                },
                            })
                        }}
                    />
                    <Button
                        second
                        tooltip={'INVERT'}
                        size={1.3}
                        icon={<IoInvertModeOutline />}
                        onClick={() => {
                            modalForm({
                                content: RangeChooser,
                                title: 'INVERT',
                                icon: <IoInvertModeOutline />,
                                min: 0,
                                max: 100,
                                start: style.invert,
                                transparentCurtain: true,
                                todo: (val) => {
                                    setStyle((prev) => ({
                                        ...prev,
                                        invert: val,
                                    }))
                                },
                            })
                        }}
                    />
                </>
            }
        >
            <StyledWrapper>
                <StyledImageWrapper>
                    <StyledImage
                        style={style}
                        src={ENDPOINTS.files.file(searchParams.get('path'))}
                    />
                    {crop.show && (
                        <StyledCrop crop={crop}>
                            <CropDot
                                setCrop={setCrop}
                                crop={crop}
                                left={'right'}
                                top={'top'}
                            />
                            <CropDot
                                setCrop={setCrop}
                                crop={crop}
                                left={'right'}
                                top={'center'}
                            />
                            <CropDot
                                setCrop={setCrop}
                                crop={crop}
                                left={'right'}
                                top={'bottom'}
                            />
                            <CropDot
                                setCrop={setCrop}
                                crop={crop}
                                left={'left'}
                                top={'top'}
                            />
                            <CropDot
                                setCrop={setCrop}
                                crop={crop}
                                left={'left'}
                                top={'center'}
                            />
                            <CropDot
                                setCrop={setCrop}
                                crop={crop}
                                left={'left'}
                                top={'bottom'}
                            />
                            <CropDot
                                setCrop={setCrop}
                                crop={crop}
                                left={'center'}
                                top={'top'}
                            />
                            <CropDot
                                setCrop={setCrop}
                                crop={crop}
                                left={'center'}
                                top={'center'}
                            />
                            <CropDot
                                setCrop={setCrop}
                                crop={crop}
                                left={'center'}
                                top={'bottom'}
                            />
                        </StyledCrop>
                    )}
                </StyledImageWrapper>
            </StyledWrapper>
        </MainTemplate>
    )
}
