import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { Button } from '../../atoms/Button'
import { links } from '../../router/links'
import { useParams } from 'react-router'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 30px 10px;
`
export const DatabasePatchItemPage = () => {
    const { modelName } = useParams()

    return (
        <MainTemplate
            app={APPS.database}
            topbarLink={links.database.model(modelName)}
            title={`EDIT ${modelName.toUpperCase()}`}
            submenuChildren={
                <>
                    <Button second size={0.9}>
                        SAVE
                    </Button>
                </>
            }
        >
            <StyledWrapper></StyledWrapper>
        </MainTemplate>
    )
}
