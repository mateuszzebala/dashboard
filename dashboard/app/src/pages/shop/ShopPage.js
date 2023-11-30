import React from 'react'
import {MainTemplate} from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'


export const ShopPage = () => {
    return (
        <MainTemplate app={APPS.shop}></MainTemplate>
    )
}