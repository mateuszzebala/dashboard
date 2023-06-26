import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { Button } from '../../atoms/Button'
import { useParams } from 'react-router'
import { ENDPOINTS } from '../../api/endpoints'
import { FETCH } from '../../api/api'
import { fieldToString } from '../../utils/utils'
import { Tooltip } from '../../atoms/Tooltip'
import { Theme } from '../../atoms/Theme'
import { theme } from '../../theme/theme'
import { Field, HeaderRow, Row, Table } from '../../atoms/Table'



const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
    flex-wrap: wrap;
`

const StyledValue = styled.span`
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
`


const StyledButtons = styled.div`
  display: flex;
  gap: 10px;
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
        <MainTemplate app={APPS.database} title={`${modelName} - ${pk}`} submenuChildren={
            <StyledButtons>
                <Button size={0.8}>EDIT</Button>
                <Theme value={{
                    button: {
                        background: theme.error,
                        font: theme.light,
                    },
                }}>
                    <Button size={0.8}>DELETE</Button>
                </Theme>
            </StyledButtons>
        }>
            <StyledWrapper>
                <Table>
                    <HeaderRow>
                        <Field>
                            FIELD
                        </Field>
                        <Field>
                            VALUE
                        </Field>
                    </HeaderRow>
                    {modelData &&
                        itemData &&
                        Object.keys(modelData.fields).map((fieldName) => (
                            <Row key={fieldName}>
                                <Field>{fieldName}</Field>
                                <Field>
                                    <Tooltip text={fieldToString(
                                        itemData.fields[fieldName],
                                        modelData.fields[fieldName].type
                                    )}>
                                        <StyledValue>
                                            {fieldToString(
                                                itemData.fields[fieldName],
                                                modelData.fields[fieldName].type,
                                            )}
                                        </StyledValue>
                                    </Tooltip>
                                </Field>
                            </Row>
                        ))}
                </Table>


            </StyledWrapper>
        </MainTemplate>
    )
}
