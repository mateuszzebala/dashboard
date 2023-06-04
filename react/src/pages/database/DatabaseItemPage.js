import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { useParams } from 'react-router'

export const DatabaseItemPage = () => {
    const { modelName, pk } = useParams()
    return (
        <MainTemplate title={'DATABASE'}>
            {modelName}: {pk}
        </MainTemplate>
    )
}
