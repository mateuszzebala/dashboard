import React from 'react'
import { MainTemplate } from '../templates/MainTemplate'
import { Button } from '../atoms/Button'

export const HomePage = () => {
    return (
        <MainTemplate title={'HOME'}>
            <Button>OK</Button>
        </MainTemplate>
    )
}
