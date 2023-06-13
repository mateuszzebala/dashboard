import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { Button } from '../../atoms/Button'
import { useParams } from 'react-router'
import { ENDPOINTS } from '../../api/endpoints'
import { FETCH } from '../../api/api'
import { fieldToString } from '../../utils/utils'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
`

export const DatabaseItemPage = () => {
    const { modelName, pk } = useParams()

    const [itemData, setItemData] = React.useState()
    const [modelData, setModelData] = React.useState()

    React.useEffect(() => {
        FETCH(ENDPOINTS.database.model(modelName)).then((data) => {
            setModelData(data.data)
        })
        FETCH(ENDPOINTS.database.item(modelName, pk)).then((data) => {
            setItemData(data.data)
        })
    }, [])

    return (
        <MainTemplate app={APPS.database}>
            <StyledWrapper>
                {modelData &&
                    itemData &&
                    Object.keys(modelData.fields).map((fieldName) => (
                        <span key={fieldName}>
                            {fieldName}{' '}
                            {fieldToString(
                                itemData.fields[fieldName],
                                modelData.fields[fieldName].type
                            )}
                        </span>
                    ))}
                <Button>SAVE</Button>
            </StyledWrapper>
        </MainTemplate>
    )
}
