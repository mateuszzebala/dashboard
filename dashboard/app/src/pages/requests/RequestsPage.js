import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { CodeInput } from '../../atoms/CodeInput'

export const RequestsPage = () => {
    const [value, setValue] = React.useState({})
    return (
        <MainTemplate app={APPS.requests}>
            <CodeInput value={value} setValue={setValue} length={5} />
        </MainTemplate>
    )
}
