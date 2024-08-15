import React, { useState } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { getSesion } from '../../services/service'

const userSesionPermision = {
    allow: (sesion: any):boolean => {
        if (sesion.name) return true
        return false
    },
    redirect: '/login'
}

export const mainLoader = () => {
    // buscar si existe una sesion activa
    const sesion = getSesion() ?? false
    debugger
    const isAllow = userSesionPermision.allow(sesion)
    if (!isAllow) {
        return redirect(userSesionPermision.redirect)
    }
    return sesion
}
const MainLayout: React.FC = ({ children }: any) => {
    const sesion = useLoaderData() as any  
    return (
        <div>
            <Header name={sesion.name}/>
            <Outlet />
        </div>
    )
}

export default MainLayout
