import { Routes, Route } from 'react-router-dom'
import React from 'react'

import Login from './module/login/index'
import Index from './module/index/index'


const routerConfig = [
    {
        path: '/',
        element: Index,
        key: 'index'
    },
    {
        path: '/login',
        element: Login,
        key: 'login'
    },
    {
        path: '*',
        element: Index,
        key: 'index'
    }
]

export default function LayoutRouter() {
    return (
        <div className="layout-router" style={{height: '100%'}}>
            <Routes>
                {
                    routerConfig.map(item => (
                        <Route key={item.key} path={item.path} element={<item.element />} />
                    ))
                }
            </Routes>                
        </div>
    )
}

export {}