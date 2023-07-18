import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { Button } from '../../atoms/Button'

export const EmailPage = () => {
    return (
        <MainTemplate app={APPS.email}>
            <Button second>OK</Button>
        </MainTemplate>
    )
}
