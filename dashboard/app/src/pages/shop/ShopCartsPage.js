import React from 'react'
import {MainTemplate} from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'


export const ShopCartsPage = () => {
    return (
        <MainTemplate app={APPS.shop} title='CARTS'></MainTemplate>
    )
}