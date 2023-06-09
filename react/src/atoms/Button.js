import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'
import { VscLoading } from 'react-icons/vsc'
import { Link } from 'react-router-dom'

const StyledWrapper = styled.button`
    position: relative;
    background-color: ${({ theme }) => theme.button.background};
    color: ${({ theme }) => theme.button.font};
    border: 0;
    font-size: ${({ size }) => 20 * size + 'px'};
    width: ${({ icon, size }) => (icon ? 40 * size + 'px' : 'auto')};
    height: ${({ icon, size }) => (icon ? 40 * size + 'px' : 'auto')};
    padding: ${({ icon, size }) =>
        icon ? '0' : size * 10 + 'px ' + size * 20 + 'px'};
    border-radius: ${({ circle, size }) => (circle ? '50%' : size * 5 + 'px')};
    outline: 0px solid ${({ theme }) => theme.button.background}88;
    transition: outline-width 0.1s;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    cursor: pointer;
    &:focus,
    &:hover {
        outline-width: ${({ size }) => size * 3 + 'px'};
    }
`

const StyledLoading = styled.span`
    display: grid;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    place-items: center;
    padding: 0;
    @keyframes rotate {
        from {
            transform: translate(-50%, -50%) rotate(0deg);
        }
        to {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
    animation: rotate 1s linear infinite;
`

const StyledChildren = styled.span`
    color: ${({ theme, loading }) =>
        loading ? 'transparent' : theme.button.font};
`

export const Button = ({
    children,
    size = 1,
    loading = false,
    icon,
    onClick,
    to,
    circle,
    ...props
}) => {
    const handleOnClick = (e) => !loading && onClick && onClick(e)

    const content = (
        <StyledWrapper
            onClick={handleOnClick}
            icon={toBoolStr(icon)}
            circle={toBoolStr(circle)}
            size={size}
            {...props}
        >
            {icon || (
                <StyledChildren loading={toBoolStr(loading)}>
                    {children}
                </StyledChildren>
            )}
            {loading && (
                <StyledLoading>
                    <VscLoading />
                </StyledLoading>
            )}
        </StyledWrapper>
    )

    return to ? <Link to={to}>{content}</Link> : <>{content}</>
}
