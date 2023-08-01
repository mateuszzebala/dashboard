import React from 'react'
import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'
import { MdOutlineMinimize } from 'react-icons/md'
import { BsArrowUpShort } from 'react-icons/bs'

const StyledWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 300;
    transform: translate(-50%, -50%);
    padding: 10px;
    background-color: ${({ theme }) => theme.modal.background};
    color: ${({ theme }) => theme.modal.font};
    box-shadow: 0px 0px 239.1px rgba(0, 0, 0, 0.028),
        0px 0px 291.6px rgba(0, 0, 0, 0.036),
        0px 0px 313.3px rgba(0, 0, 0, 0.041),
        0px 0px 322.7px rgba(0, 0, 0, 0.045), 0px 0px 329px rgba(0, 0, 0, 0.05),
        0px 0px 340.3px rgba(0, 0, 0, 0.059),
        0px 0px 370.9px rgba(0, 0, 0, 0.076), 0px 0px 500px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translate(-50%, -40%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
    animation: fade-in 0.5s forwards;
`

const StyledCaption = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 10px;
    align-items: center;
`

const StyledTitle = styled.span`
    font-weight: bold;
    font-size: 20px;
`

const StyledIcon = styled.span`
    font-weight: bold;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
`

const StyledCircleButton = styled.button`
    background-color: transparent;
    border: 0;
    font-size: 30px;
    display: inline-flex;
    flex-direction: column;
    color: ${({ theme }) => theme.primary};
    border-radius: 50%;
    width: 35px;
    height: 35px;
    justify-content: center;
    transition: background-color 0.2s;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.primary}22;
    }
    &:focus {
        outline: none;
    }
`

const StyledMinimize = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: ${({ theme }) => theme.secondary};
    box-shadow: 0 0 30px -10px ${({ theme }) => theme.primary};
    position: absolute;
    left: 50%;
    bottom: 30px;
    padding: 10px;
    border-radius: 7px;
    font-size: 20px;
    transform: translateX(-50%);
    z-index: 30;
    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    animation: fadein 0.3s ease;
`

export const Modal = ({
    open,
    setOpen,
    minimizeIcon = false,
    title = '',
    children,
    icon = '',
}) => {
    const [minimize, setMinimize] = React.useState(false)

    React.useEffect(() => {
        setMinimize(false)
    }, [children, title, icon])

    if (!open) return ''
    if (minimize)
        return (
            <StyledMinimize>
                <StyledIcon>{icon}</StyledIcon>
                {title || 'Window'}
                {minimizeIcon && (
                    <StyledCircleButton
                        onClick={() => {
                            setMinimize(false)
                        }}
                    >
                        <BsArrowUpShort />
                    </StyledCircleButton>
                )}
                <StyledCircleButton
                    onClick={() => {
                        setOpen(false)
                        setMinimize(false)
                    }}
                >
                    <IoClose />
                </StyledCircleButton>
            </StyledMinimize>
        )
    return (
        <StyledWrapper>
            <StyledCaption>
                <div>
                    {minimizeIcon && (
                        <StyledCircleButton
                            onClick={() => {
                                setMinimize(true)
                            }}
                        >
                            <MdOutlineMinimize />
                        </StyledCircleButton>
                    )}
                    <StyledCircleButton
                        onClick={() => {
                            setOpen(false)
                        }}
                    >
                        <IoClose />
                    </StyledCircleButton>
                </div>
                <StyledTitle>{title}</StyledTitle>
                <StyledIcon>{icon}</StyledIcon>
            </StyledCaption>
            {children}
        </StyledWrapper>
    )
}
