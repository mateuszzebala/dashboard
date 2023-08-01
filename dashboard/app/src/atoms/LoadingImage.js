import React from 'react'
import styled from 'styled-components'
import { Loading } from './Loading'

const StyledImage = styled.img`
    width: ${({ width }) => width + 'px'};
    height: ${({ height }) => height + 'px'};
`

const StyledLoading = styled.div`
    width: ${({ width }) => width + 'px'};
    height: ${({ height }) => height + 'px'};

    display: grid;
    place-items: center;
    background-color: ${({ theme }) => theme.primary}11;
    border-radius: 10px;
`

export const LoadingImage = ({ ...props }) => {
    const [loading, setLoading] = React.useState(true)

    return (
        <>
            <StyledImage
                {...props}
                onLoad={() => {
                    setLoading(false)
                }}
            />
            {loading && (
                <StyledLoading {...props}>
                    <Loading size={2} />
                </StyledLoading>
            )}
        </>
    )
}
