import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { useParams } from 'react-router'
import { APPS } from '../../apps/apps'
import { SelectItem } from '../../organisms/database/SelectItem'

export const DatabaseItemPage = () => {
    const { modelName } = useParams()
    const [value, setValue] = React.useState()
    return (
        <MainTemplate app={APPS.database}>
            <SelectItem
                modelName={modelName}
                value={value}
                setValue={setValue}
            />
        </MainTemplate>
    )
}
