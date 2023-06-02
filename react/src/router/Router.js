import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { HomePage } from '../pages/HomePage'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}
