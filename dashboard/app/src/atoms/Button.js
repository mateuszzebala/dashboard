import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'
import { VscLoading } from 'react-icons/vsc'
import { Link, useNavigate } from 'react-router-dom'
import { Tooltip } from './Tooltip'
import { useGlobalKey } from '../utils/hooks'

const StyledWrapper = styled.button`
    position: relative;
    background-color: ${({ theme, second }) =>
        second ? theme.primary + '22' : theme.primary};
    color: ${({ theme, second }) =>
        second ? theme.secondary : theme.secondary};
    border: 0;
    font-size: ${({ size }) => 20 * size + 'px'};
    width: ${({ icon, size, width }) =>
        width ? width : icon ? 40 * size + 'px' : 'auto'};
    height: ${({ icon, size }) => (icon ? 40 * size + 'px' : 'auto')};
    padding: ${({ icon, size }) =>
        icon ? '0' : size * 10 + 'px ' + size * 20 + 'px'};
    border-radius: ${({ circle, size }) => (circle ? '50%' : size * 5 + 'px')};
    outline: 0 solid black;
    outline-color: ${({ theme, second }) =>
        theme.primary + (second ? '22' : '88')};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s, color 0.3s, outline-color 0.3s,
        outline-width 0.1s;
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
    color: ${({ theme, second }) => (second ? theme.primary : theme.secondary)};
    place-items: center;
    padding: 0;
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    animation: rotate 1s linear infinite;
`

const StyledSubContent = styled.span`
    position: absolute;
    bottom: 2px;
    left: 50%;
    font-weight: 600;
    transform: translateX(-50%);
    font-size: ${({size})=>size * 6}px;
    color: ${({theme, second})=> second ? theme.primary : theme.secondary};
    white-space: nowrap;
`

const StyledChildren = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    opacity: ${({ loading }) => (loading ? 0 : 1)};
    color: ${({ theme, second }) => (second ? theme.primary : theme.secondary)};
`

export const Button = ({
    children,
    size = 1,
    loading = false,
    icon,
    onClick,
    tooltip,
    to,
    circle,
    second,
    onKey,
    subContent='',
    ...props
}) => {
    const navigate = useNavigate()
    const handleOnClick = (e) =>
        to ? navigate(to) : !loading && onClick && onClick(e)

    useGlobalKey(
        (e) => {
            handleOnClick(e)
        },
        onKey,
        onKey
    )

    const content = (
        <Tooltip text={tooltip}>
            <StyledWrapper
                onClick={handleOnClick}
                icon={toBoolStr(icon)}
                circle={toBoolStr(circle)}
                size={size}
                second={toBoolStr(second)}
                {...props}
            >
                <StyledChildren second={second} loading={toBoolStr(loading)}>
                    {icon || children}
                </StyledChildren>
                {loading && (
                    <StyledLoading second={second}>
                        <VscLoading />
                    </StyledLoading>
                )}
                <StyledSubContent size={size} second={toBoolStr(second)}>
                    {subContent}
                </StyledSubContent>
            </StyledWrapper>
        </Tooltip>
    )

    return to ? (
        <Link tabIndex={-1} to={to} {...props}>
            {content}
        </Link>
    ) : (
        <>{content}</>
    )
}
