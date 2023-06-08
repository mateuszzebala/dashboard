import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { useParams } from 'react-router'
import { APPS } from '../../apps/apps'

export const DatabaseItemPage = () => {
    const { modelName, pk } = useParams()
    return (
        <MainTemplate app={APPS.database}>
            {modelName}: {pk}
        </MainTemplate>
    )
}
