import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { useParams } from 'react-router'
import { PutItemForm } from '../../organisms/database/PutItemForm'
import { APPS } from '../../apps/apps'

import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    justify-content: center;
`

export const DatabasePutItemPage = () => {
    const { modelName } = useParams()
    return (
        <MainTemplate app={APPS.database} title={`New ${modelName}`}>
            <StyledWrapper>
                <PutItemForm modelName={modelName} />
            </StyledWrapper>
        </MainTemplate>
    )
}
