import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    width: ${({ size }) => size * 50 + 'px'};
    height: ${({ size }) => size * 50 + 'px'};
    display: flex;
    align-items: center;
    justify-content: center;
`

const BigCircle = styled.div`
    border: ${({ size }) => size * 0 + 'px'} solid
        ${({ theme }) => theme.primary};
    width: ${({ size }) => size * 50 + 'px'};
    height: ${({ size }) => size * 50 + 'px'};
    border-radius: 50%;
    position: relative;
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    animation: rotate ${({ speed }) => speed + 's'} linear infinite;
`
const MiddleCircle = styled.div`
    border-top: ${({ size }) => size * 8 + 'px'} solid
        ${({ theme }) => theme.primary};
    border-left: ${({ size }) => size * 8 + 'px'} solid transparent;
    border-bottom: ${({ size }) => size * 8 + 'px'} solid ${({ theme }) => theme.primary};
    border-right: ${({ size }) => size * 8 + 'px'} solid transparent;
    width: ${({ size }) => size * 43 + 'px'};
    height: ${({ size }) => size * 43 + 'px'};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const SmallCircle = styled.div`
    border: ${({ size }) => size * 0 + 'px'} solid
        ${({ theme }) => theme.primary};
    width: ${({ size }) => size * 34 + 'px'};
    height: ${({ size }) => size * 34 + 'px'};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

// export const Loading = ({ size = 1, speed = 1 }) => {
//     return (
//         <StyledWrapper>
//             <BigCircle size={size} speed={speed}>
//                 <MiddleCircle size={size}>
//                     <SmallCircle size={size}></SmallCircle>
//                 </MiddleCircle>
//             </BigCircle>
//         </StyledWrapper>
//     )
// }


const StyledSkChase = styled.div`
    @keyframes sk-chase {
        100% { transform: rotate(360deg); } 
    }

   
    height: ${({size}) => size * 40}px;
    width: ${({size}) => size * 40}px;
    position: relative;
    animation: sk-chase 2.5s infinite linear both;  
`


const StyledSkChaseDot = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0; 
    animation: sk-chase-dot 2.0s infinite ease-in-out both; 

    @keyframes sk-chase-dot {
        80%, 100% { transform: rotate(360deg); } 
    }

    @keyframes sk-chase-dot-before {
        50% {
            transform: scale(0.4); 
        } 100%, 0% {
            transform: scale(1.0); 
        } 
    }

    &::before {
        content: '';
        display: block;
        width: 25%;
        height: 25%;
        background-color: ${({theme})=>theme.primary};
        border-radius: 100%;
        animation: sk-chase-dot-before 2.0s infinite ease-in-out both; 
    }
    &:nth-child(1) { animation-delay: -1.1s; }
    &:nth-child(2) { animation-delay: -1.0s; }
    &:nth-child(3) { animation-delay: -0.9s; }
    &:nth-child(4) { animation-delay: -0.8s; }
    &:nth-child(5) { animation-delay: -0.7s; }
    &:nth-child(6) { animation-delay: -0.6s; }
    &:nth-child(1):before { animation-delay: -1.1s; }
    &:nth-child(2):before { animation-delay: -1.0s; }
    &:nth-child(3):before { animation-delay: -0.9s; }
    &:nth-child(4):before { animation-delay: -0.8s; }
    &:nth-child(5):before { animation-delay: -0.7s; }
    &:nth-child(6):before { animation-delay: -0.6s; }

`

export const Loading = ({ size = 1, speed = 1 }) => {
    return (
        <StyledSkChase size={size}>
            <StyledSkChaseDot/>
            <StyledSkChaseDot/>
            <StyledSkChaseDot/>
            <StyledSkChaseDot/>
            <StyledSkChaseDot/>
            <StyledSkChaseDot/>
        </StyledSkChase>
    )
}
