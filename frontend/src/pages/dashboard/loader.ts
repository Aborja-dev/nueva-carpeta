import { CandidateRequest } from "../../services/api_gateway"
import { getSesion } from "../../services/service"

export const dashboardLoader = async () => {
    // buscar si existe una sesion activa
    const sesion = getSesion()

    // extraer el id del usuario
    const id = sesion?.id as string
    const proposalsList = await CandidateRequest.getAll(id)
    return { proposalsList }
}