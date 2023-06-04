import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { HomePage } from '../pages/HomePage'
import { Page404 } from '../pages/Page404'
import { DatabasePage } from '../pages/database/DatabasePage'
import { DatabaseModelPage } from '../pages/database/DatabaseModelPage'
import { DatabaseItemPage } from '../pages/database/DatabaseItemPage'

const pages = {
    '/': HomePage,

    '/database/': DatabasePage,
    '/database/:modelName': DatabaseModelPage,
    '/database/:modelName/:pk': DatabaseItemPage,

    '*': Page404,
}

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {Object.keys(pages).map((path) => {
                    const Elem = pages[path]
                    return <Route key={path} path={path} element={<Elem />} />
                })}
            </Routes>
        </BrowserRouter>
    )
}
