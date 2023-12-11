import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'

export const EmailNewsletterPage = () => {
    return (
        <MainTemplate app={APPS.email} title='NEWSLETTER'></MainTemplate>
    )
}
