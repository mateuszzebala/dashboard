import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { FolderContent } from '../../organisms/files/FolderContent'

export const FilesPage = () => {
    return (
        <MainTemplate app={APPS.files}>
            <FolderContent />
        </MainTemplate>
    )
}
