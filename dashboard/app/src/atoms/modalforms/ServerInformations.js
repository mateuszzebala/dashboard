import React from 'react'
import styled from 'styled-components'
import { ENDPOINTS } from '../../api/endpoints'
import { capitalize } from '../../utils/utils'
import { FETCH } from '../../api/api'

const StyledInformation = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 20px;
    gap: 10px;
    font-size: 20px;
    max-width: 100%;
`


export const ServerInformations = () => {
    const [informations, setInformations] = React.useState({})

    React.useEffect(()=>{
        FETCH(ENDPOINTS.home.informations()).then(data=>{
            setInformations(data.data)
        })
    }, [])

    return (
        <StyledInformation>
            {Object.keys(informations).map(infoKey => (
                <span key={infoKey}><b>{capitalize(infoKey)}:</b>&nbsp;{informations[infoKey]}</span>
            ))}
        </StyledInformation>
    )
}