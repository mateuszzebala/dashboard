import React from 'react'
import styled from 'styled-components'

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
                width={loading ? 0 : props.width}
                height={loading ? 0 : props.height}
                onLoad={() => {
                    setLoading(false)
                }}
            />
            {loading && <StyledLoading {...props}></StyledLoading>}
        </>
    )
}
