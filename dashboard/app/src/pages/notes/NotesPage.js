import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'

export const NotesPage = () => {
    return <MainTemplate app={APPS.notes}></MainTemplate>
}
