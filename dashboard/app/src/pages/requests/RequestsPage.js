import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { Button } from '../../atoms/Button'
import { ContextMenu } from '../../atoms/ContextMenu'
import { Fa500Px, FaAccusoft, FaDownload } from 'react-icons/fa'
import { BiRename } from 'react-icons/bi'

export const RequestsPage = () => {
    return (
        <MainTemplate app={APPS.requests}>
            <ContextMenu second wrapper={Button} data={[
                {text: 'Download', icon: <FaDownload/>},
                {text: 'Change Name', icon: <BiRename/>},
            ]}>
                <span>SIEMA</span>
            </ContextMenu>
        </MainTemplate>
    )
}
