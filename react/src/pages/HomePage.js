import React from 'react'
import { MainTemplate } from '../templates/MainTemplate'
import { Paginator } from '../atoms/Paginator'

export const HomePage = () => {
    const [page, setPage] = React.useState(1)

    return (
        <MainTemplate title={'HOME'}>
            <Paginator value={page} setValue={setPage} pages={10} />
        </MainTemplate>
    )
}
