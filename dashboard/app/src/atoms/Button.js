import React from 'react'
import styled from 'styled-components'
import { toBoolStr } from '../utils/utils'
import { VscLoading } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { Tooltip } from './Tooltip'

const StyledWrapper = styled.button`
    position: relative;
    background-color: ${({ theme, second }) =>
        second ? theme.button.background + '22' : theme.button.background};
    color: ${({ theme, second }) =>
        second ? theme.button.background : theme.button.font};
    border: 0;
    font-size: ${({ size }) => 20 * size + 'px'};
    width: ${({ icon, size }) => (icon ? 40 * size + 'px' : 'auto')};
    height: ${({ icon, size }) => (icon ? 40 * size + 'px' : 'auto')};
    padding: ${({ icon, size }) =>
        icon ? '0' : size * 10 + 'px ' + size * 20 + 'px'};
    border-radius: ${({ circle, size }) => (circle ? '50%' : size * 5 + 'px')};
    outline: 0 solid black;
    outline-color: ${({ theme, second }) =>
        theme.button.background + (second ? '22' : '88')};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s, outline-color 0.3s, outline-width 0.1s;
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

const StyledChildren = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    opacity: ${({ loading }) => (loading ? 0 : 1)};
    color: ${({ theme, second }) =>
        second ? theme.button.background : theme.button.font};
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
    ...props
}) => {
    const handleOnClick = (e) => !loading && onClick && onClick(e)

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
                <StyledChildren
                    second={second}
                    loading={toBoolStr(loading)}
                >
                    {icon || children}
                </StyledChildren>
                {loading && (
                    <StyledLoading>
                        <VscLoading />
                    </StyledLoading>
                )}
            </StyledWrapper>
        </Tooltip>
    )

    return to ? (
        <Link to={to} {...props}>
            {content}
        </Link>
    ) : (
        <>{content}</>
    )
}
