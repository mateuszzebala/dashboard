import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { Terminal } from '../../organisms/terminal/Terminal'

export const TerminalPage = () => {
    const [path, setPath] = React.useState('')
    return (
        <MainTemplate app={APPS.terminal} title={path}>
            <Terminal path={path} setPath={setPath} />
        </MainTemplate>
    )
}
