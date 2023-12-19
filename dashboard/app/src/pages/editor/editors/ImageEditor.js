import React from 'react'
import { ENDPOINTS } from '../../../api/endpoints'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '../../../atoms/Button'
import { HiOutlineColorSwatch } from 'react-icons/hi'
import { APPS } from '../../../apps/apps'
import { LINKS } from '../../../router/links'
import { MainTemplate } from '../../../templates/MainTemplate'
import { BiCrop, BiSolidDropletHalf } from 'react-icons/bi'
import { useModalForm, useSettings, useTheme } from '../../../utils/hooks'
import { EditorChooser } from '../../../atoms/modalforms/EditorChooser'
import { BsFillBrightnessHighFill } from 'react-icons/bs'
import { IoMdContrast } from 'react-icons/io'
import { TbBlur, TbReplaceFilled } from 'react-icons/tb'
import { centerEllipsis, getCursorByPosition, objectEquals } from '../../../utils/utils'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import styled from 'styled-components'
import { RangeChooser } from '../../../atoms/modalforms/RangeChooser'
import { IoInvertModeOutline, IoResize } from 'react-icons/io5'
import { FETCH } from '../../../api/api'
import { useMessage } from '../../../utils/messages'
import { FiDownload, FiEdit, FiImage, FiSave } from 'react-icons/fi'
import { FilePrompt } from '../../../atoms/modalforms/FilePrompt'
import { Theme } from '../../../atoms/Theme'

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
    background-color: ${({ theme }) => theme.secondary}33;
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
    const [drag, setDrag] = React.useState(false)

    return (
        <StyledCropDot
            onMouseDown={() => {
                setDrag(true)
            }}
            onMouseUp={() => {
                setDrag(false)
            }}
            onMouseMove={(event) => {
                if (!drag) return
                if (top == 'center' && left == 'center') {
                    
                    setCrop(prev => ({ ...prev, x: 0, y: 0 }))
                }
            }}
            cursor={getCursorByPosition(top, left)}
            top={top}
            left={left}
        />
    )
}

const StyledCropDot = styled.div`
    width: 20px;
    height: 20px;
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
    const modalForm = useModalForm()
    const navigate = useNavigate()
    const [liked, setLiked] = React.useState(false)
    const [saved, setSaved] = React.useState(true)
    const [theme] = useTheme()
    const [image, setImage] = React.useState({})
    const [saveLoading, setSaveLoading] = React.useState(false)
    const { newMessage } = useMessage()
    const [settings, setSettings, saveSettings] = useSettings()
    
    const [crop, setCrop] = React.useState({
        show: false,
        x: 10,
        y: 10,
        width: 80,
        height: 80,
    })

    const defaultConfig = {
        colors: 0,
        saturation: 100,
        blur: 0,
        brightness: 100,
        contrast: 100,
        invert: 0,
    }

    React.useEffect(() => {
        image && saveSettings(prev => ({ ...prev, 'editor.last': [{ name: image.filename, path: image.path, type: image.type }, ...prev['editor.last'].filter(file => file.path !== image.path)] }))
    }, [image])

    const [style, setStyle] = React.useState(defaultConfig)

    React.useEffect(() => {
        const path = searchParams.get('path')
        setLiked(settings['editor.liked'].some(file => file.path === path))
    }, [settings])

    React.useEffect(() => {
        if (objectEquals(defaultConfig, style)) setSaved(true)
        else setSaved(false)
    }, [style])

    React.useEffect(() => {
        FETCH(ENDPOINTS.editor.json(searchParams.get('path'))).then((data) => {
            setImage(data.data)
        })
    }, [])

    const handleSave = () => {
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
    }

    React.useEffect(() => {
        saveSettings()
    }, [liked])

    return (
        <MainTemplate
            app={{
                name: 'IMAGE EDITOR',
                icon: FiImage,
                link: LINKS.editor.index()
            }}
            title={centerEllipsis(searchParams.get('path'), 50)}
            submenuChildren={
                <>
                    <Theme value={{ ...theme, primary: saved ? theme.success : theme.error }}>
                        <Button
                            tooltip={'SAVE IMAGE'}
                            size={1.4}
                            icon={<FiSave />}
                            subContent={'SAVE'}
                            onKey={{
                                key: 's',
                                ctrlKey: true,
                                prevent: true,
                            }}
                            loading={saveLoading}
                            onClick={handleSave}
                        />
                    </Theme>
                    <Button
                        subContent={'FOLDER'}
                        second
                        to={LINKS.files.indexPath(image.parent)}
                        tooltip={'GO TO FOLDER'}
                        size={1.4}
                        icon={<APPS.files.icon />}
                    />
                    <Button
                        second
                        subContent={'DOWNLOAD'}
                        tooltip={'DOWNLOAD IMAGE'}
                        size={1.4}
                        target={'_blank'}
                        download="true"
                        to={ENDPOINTS.files.file(searchParams.get('path'))}
                        icon={<FiDownload />}
                    />
                    <Button
                        second
                        subContent={'EDITOR'}
                        icon={<FiEdit />}
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
                        onClick={() => {
                            modalForm({
                                content: FilePrompt,
                                title: 'REPLACE IMAGE',
                                icon: <TbReplaceFilled />,
                                todo: () => { },
                            })
                        }}
                        subContent={'REPLACE'}
                        second
                        icon={<TbReplaceFilled />}
                        size={1.4}
                    />
                    <Button
                        second
                        subContent={liked ? 'UNLIKE' : 'LIKE'}
                        onKey={{
                            key: 'l',
                            prevent: true,
                            ctrlKey: true,
                        }}
                        onClick={() => {
                            const path = searchParams.get('path')
                            if (liked) {
                                saveSettings(prev => ({ ...prev, 'editor.liked': prev['editor.liked'].filter(file => file.path !== path) }))
                            }
                            else {
                                saveSettings(prev => ({ ...prev, 'editor.liked': [{ name: image.filename, path: image.path, type: image.type }, ...prev['editor.liked']] }))
                            }
                        }}
                        tooltip={liked ? 'UNLIKE' : 'LIKE'}
                        size={1.4}
                        icon={liked ? <AiFillHeart /> : <AiOutlineHeart />}
                    />
                    |
                    <Button
                        second
                        tooltip={'BRIGHTNESS'}
                        subContent={'BRIGHT...'}
                        onKey={{
                            key: '!',
                            shiftKey: true,
                            ctrlKey: true,
                            prevent: true,
                        }}
                        size={1.4}
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
                        subContent={'CONTRAST'}
                        tooltip={'CONTRAST'}
                        size={1.4}
                        onKey={{
                            key: '@',
                            shiftKey: true,
                            ctrlKey: true,
                            prevent: true,
                        }}
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
                        subContent={'COLORS'}
                        size={1.4}
                        onKey={{
                            key: '#',
                            shiftKey: true,
                            ctrlKey: true,
                            prevent: true,
                        }}
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
                        subContent={'CROP'}
                        onKey={{
                            key: '$',
                            shiftKey: true,
                            ctrlKey: true,
                            prevent: true,
                        }}
                        size={1.4}
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
                        subContent={'SATUR...'}
                        size={1.4}
                        onKey={{
                            key: '%',
                            shiftKey: true,
                            ctrlKey: true,
                            prevent: true,
                        }}
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
                        subContent={'BLUR'}
                        size={1.4}
                        onKey={{
                            key: '^',
                            shiftKey: true,
                            ctrlKey: true,
                            prevent: true,
                        }}
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
                        subContent={'INVERT'}
                        size={1.4}
                        onKey={{
                            key: '&',
                            shiftKey: true,
                            ctrlKey: true,
                            prevent: true,
                        }}
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
                    <Button
                        second
                        tooltip={'RESIZE'}
                        subContent={'RESIZE'}
                        size={1.4}
                        onKey={{
                            key: '&',
                            shiftKey: true,
                            ctrlKey: true,
                            prevent: true,
                        }}
                        icon={<IoResize />}
                        onClick={() => {
                            modalForm({
                                content: RangeChooser,
                                title: 'RESIZE',
                                icon: <IoResize />,
                                min: 0,
                                max: 3,
                                step: 0.1,
                                start: style.resize,
                                transparentCurtain: true,
                                todo: (val) => {
                                    setStyle((prev) => ({
                                        ...prev,
                                        resize: val,
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
