import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { SelectFile } from '../../organisms/files/SelectFile'

export const PythonPage = () => {
    const [val, setVal] = React.useState()
    return (
        <MainTemplate app={APPS.python}>
            <SelectFile value={val} setValue={setVal} />
        </MainTemplate>
    )
}
