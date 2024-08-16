import { redirect } from "react-router-dom"
import { getSesion } from "../services/service"
import { UserSesion } from "../types/types"

const hasSesionPermision = {
    allow: (sesion: UserSesion | null) :boolean => {
        if (sesion) return true
        return false
    },
    redirect: '/login'
}

export const mainLoader = () => {
    // buscar si existe una sesion activa
    const sesion = getSesion()
    const isAllow = hasSesionPermision.allow(sesion)
    if (!isAllow) {
        return redirect(hasSesionPermision.redirect)
    }
    return sesion
}