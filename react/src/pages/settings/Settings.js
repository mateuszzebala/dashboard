import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { FiSettings } from 'react-icons/fi'
import { links } from '../../router/links'

export const SettingsPage = () => {
    return (
        <MainTemplate
            app={{
                name: 'Settings',
                icon: FiSettings,
                link: links.settings.index(),
            }}
        ></MainTemplate>
    )
}
