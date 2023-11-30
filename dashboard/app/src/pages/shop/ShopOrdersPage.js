import React from 'react'
import {MainTemplate} from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'


export const ShopOrdersPage = () => {
    return (
        <MainTemplate app={APPS.shop} title='ORDERS'></MainTemplate>
    )
}