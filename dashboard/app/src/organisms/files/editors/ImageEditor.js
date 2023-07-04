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

const StyledImage = styled.img`
    max-width: 90%;
    max-height: 90%;
`
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

export const ImageEditor = () => {
    const [searchParams] = useSearchParams()
    return (
        <StyledWrapper>
            <StyledImageWrapper>
                <StyledImage
                    src={ENDPOINTS.files.file(searchParams.get('path'))}
                    alt={searchParams.get('path')}
                />
            </StyledImageWrapper>
            <StyledTools>
                <Button circle size={1.3} icon={<BiCrop />} />
                <Button
                    circle
                    size={1.3}
                    icon={<BsFillBrightnessAltHighFill />}
                />
                <Button circle size={1.3} icon={<IoMdContrast />} />
                <Button circle size={1.3} icon={<HiMagnifyingGlassPlus />} />
                <Button circle size={1.3} icon={<BsDropletHalf />} />
                <Button circle size={1.3} icon={<HiOutlineColorSwatch />} />
                <Button circle size={1.3} icon={<BsPen />} />
            </StyledTools>
        </StyledWrapper>
    )
}
