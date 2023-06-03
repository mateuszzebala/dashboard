import React from 'react'
import { MainTemplate } from '../templates/MainTemplate'
import { Range } from '../atoms/Range'

export const HomePage = () => {
    return (
        <MainTemplate title={'HOME'}>
            <Range />
        </MainTemplate>
    )
}
