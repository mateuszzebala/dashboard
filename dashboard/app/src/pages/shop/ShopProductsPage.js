import React from 'react'
import {MainTemplate} from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'


export const ShopProductsPage = () => {
    return (
        <MainTemplate app={APPS.shop} title='PRODUCTS'></MainTemplate>
    )
}