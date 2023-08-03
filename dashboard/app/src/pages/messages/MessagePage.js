import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'

export const MessagePage = () => {
    return <MainTemplate app={APPS.messages}></MainTemplate>
}
