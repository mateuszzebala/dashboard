import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { Terminal } from '../../organisms/terminal/Terminal'

export const TerminalPage = () => {
    return <MainTemplate app={APPS.terminal}>
        <Terminal />
    </MainTemplate>
}
