import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: inline-flex;
    width: 100%;
    box-shadow: 0 0 5px -3px black;
    padding: 10px 40px;
    border-radius: 5px;
    text-align: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
        background-color: #00000011;
    }
`

export const Host = ({ name, ...props }) => {
    return <StyledWrapper {...props}>{name}</StyledWrapper>
}
