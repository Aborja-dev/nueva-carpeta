import { redirect } from "react-router-dom"
import { getSesion } from "../services/service"
import { UserSesion } from "../types/types"

const userSesionPermision = {
    allow: (sesion: UserSesion | null) :boolean => {
        if (sesion?.name) return true
        return false
    },
    redirect: '/login'
}

export const mainLoader = () => {
    // buscar si existe una sesion activa
    const sesion = getSesion()
    const isAllow = userSesionPermision.allow(sesion)
    if (!isAllow) {
        return redirect(userSesionPermision.redirect)
    }
    return sesion
}