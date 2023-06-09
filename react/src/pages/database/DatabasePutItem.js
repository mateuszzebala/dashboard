import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { useParams } from 'react-router'
import { PutItemForm } from '../../organisms/database/PutItemForm'
import { APPS } from '../../apps/apps'
import { Typography } from '../../atoms/Typography'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 20px;
    justify-content: center;
`

export const DatabasePutItem = () => {
    const { modelName } = useParams()
    return (
        <MainTemplate app={APPS.database}>
            <StyledWrapper>
                <Typography variant={'h2'}>
                    NEW {modelName.toUpperCase()}
                </Typography>
                <PutItemForm modelName={modelName} />
            </StyledWrapper>
        </MainTemplate>
    )
}
