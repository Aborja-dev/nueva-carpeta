import { CommonRequest } from "../../services/api_gateway"

export const createLoader = async () => {
    const result = await CommonRequest.getData()
    if (typeof result === 'string') return null
    const {event, topics} = result
    return {event, topics}
}