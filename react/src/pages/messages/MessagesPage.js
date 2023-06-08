import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'

export const MessagesPage = () => {
    return <MainTemplate app={APPS.messages}></MainTemplate>
}
