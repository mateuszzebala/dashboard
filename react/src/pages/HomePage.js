import React from 'react'
import { MainTemplate } from '../templates/MainTemplate'
import { Loading } from '../atoms/Loading'

export const HomePage = () => {
    return (
        <MainTemplate title={'HOME'}>
            <Loading size={1} speed={0.6} />
        </MainTemplate>
    )
}
