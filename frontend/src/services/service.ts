export interface UserSesion {
    id: string,
    name: string,
    type: "ADMIN" | "USER" | "ORGANIZER" | "CANDIDATE",
    token: string
}

export const saveSesion = (sesion: Omit<UserSesion, "token">) => {
    const sesionString = JSON.stringify(sesion)
    localStorage.setItem("user_sesion", sesionString)
}

export const deleteSesion = () => {
    localStorage.removeItem("user_sesion")
    localStorage.removeItem("user_token")
}

export const getSesion = (): UserSesion | null => {
    const sesionString = localStorage.getItem("user_sesion")
    if (!sesionString) return null
    const sesion = JSON.parse(sesionString) as UserSesion
    return sesion
}

export const saveToken = (token: string) => {
    localStorage.setItem("user_token", token)
}

export const getToken = (): string | null => {
    const token = localStorage.getItem("user_token")
    if (!token) return null
    return token
}
