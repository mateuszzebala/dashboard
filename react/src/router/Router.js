import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { HomePage } from '../pages/HomePage'
import { Page404 } from '../pages/Page404'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<HomePage />} />
                <Route path={'*'} element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    )
}
