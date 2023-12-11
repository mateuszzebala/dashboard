import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'

export const NewUserPage = () => {
    return ( 
        <MainTemplate app={APPS.users} title='NEW'></MainTemplate>
    )
}