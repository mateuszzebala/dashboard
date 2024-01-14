import React from 'react'
import styled from 'styled-components'
import { ENDPOINTS } from '../../api/endpoints'
import { capitalize } from '../../utils/utils'
import { FETCH } from '../../api/api'
import { Field, Row, Table } from '../Table'

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
            <Table>
                {Object.keys(informations).map(infoKey => (
                    <Row key={infoKey}>
                        <Field>{capitalize(infoKey)}</Field>
                        <Field>{informations[infoKey]}</Field>
                    </Row>
                ))}
            </Table>
            
        </StyledInformation>
    )
}