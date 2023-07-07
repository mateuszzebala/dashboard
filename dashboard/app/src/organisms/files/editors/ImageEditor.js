import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { ENDPOINTS } from '../../../api/endpoints'
import styled from 'styled-components'
import { Button } from '../../../atoms/Button'
import {
    BsDropletHalf,
    BsFillBrightnessAltHighFill,
    BsPen,
} from 'react-icons/bs'
import { IoMdContrast } from 'react-icons/io'
import { BiCrop } from 'react-icons/bi'
import { HiMagnifyingGlassPlus } from 'react-icons/hi2'
import { HiOutlineColorSwatch } from 'react-icons/hi'
import { useState } from 'react'
import { useModalForm } from '../../../utils/hooks'
import { RangeChooser } from '../../../atoms/RangeChooser'

const StyledImageWrapper = styled.div`
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
`

const StyledTools = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    height: 100%;
    justify-content: center;
`

const StyledWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`

const StyledCanvas = styled.canvas``

export const ImageEditor = ({ save }) => {
    const { ask } = useModalForm()
    const [searchParams] = useSearchParams()
    const [rangeValue, setRangeValue] = React.useState({})

    const [image, setImage] = React.useState()
    const [context, setContext] = useState(null)
    const canvasRef = React.useRef()

    React.useEffect(() => {}, [save])

    React.useEffect(() => {
        const img = new Image()
        img.src = ENDPOINTS.files.file(searchParams.get('path'))
        img.onload = () => {
            setImage(img)
        }
    }, [searchParams])

    React.useEffect(() => {
        setContext(canvasRef.current.getContext('2d'))
    }, [image])

    React.useEffect(() => {
        context && image && context.drawImage(image, 0, 0)
    }, [context, image])

    React.useEffect(() => {}, [rangeValue])

    const handleAskRange = (title, icon, args) => {
        ask({
            content: RangeChooser,
            title: title.toUpperCase(),
            icon,
            todo: (value) => {
                setRangeValue((prev) => ({
                    ...prev,
                    [title]: value,
                }))
            },
            ...args,
        })
    }

    return (
        <StyledWrapper>
            <StyledImageWrapper>
                <StyledCanvas
                    ref={canvasRef}
                    width={image ? image.width : 0}
                    height={image ? image.height : 0}
                />
            </StyledImageWrapper>

            <StyledTools>
                <Button circle size={1.3} icon={<BiCrop />} />
                <Button
                    onClick={() => {
                        handleAskRange(
                            'Brightness',
                            <BsFillBrightnessAltHighFill />,
                            {
                                min: 0,
                                max: 200,
                                value: 100,
                            }
                        )
                    }}
                    circle
                    size={1.3}
                    icon={<BsFillBrightnessAltHighFill />}
                />
                <Button
                    onClick={() => {
                        handleAskRange('Contrast', <IoMdContrast />, {
                            min: 0,
                            max: 200,
                            value: 100,
                        })
                    }}
                    circle
                    size={1.3}
                    icon={<IoMdContrast />}
                />
                <Button circle size={1.3} icon={<HiMagnifyingGlassPlus />} />
                <Button
                    onClick={() => {
                        handleAskRange('Saturation', <BsDropletHalf />, {
                            min: 0,
                            max: 200,
                            value: 100,
                        })
                    }}
                    circle
                    size={1.3}
                    icon={<BsDropletHalf />}
                />
                <Button
                    onClick={() => {
                        handleAskRange('Colors', <HiOutlineColorSwatch />, {
                            min: -180,
                            max: 180,
                            value: 0,
                        })
                    }}
                    circle
                    size={1.3}
                    icon={<HiOutlineColorSwatch />}
                />
                <Button circle size={1.3} icon={<BsPen />} />
            </StyledTools>
        </StyledWrapper>
    )
}
