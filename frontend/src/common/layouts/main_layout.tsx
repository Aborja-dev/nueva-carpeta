import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import Header from '../components/Header'
import { UserSesion } from '../../types/types'


const MainLayout: React.FC = () => {
    const sesion = useLoaderData() as UserSesion
    return (
        <div>
            <Header name={sesion.name}/>
            <Outlet />
        </div>
    )
}

export default MainLayout
