// genera el boilerplate de un laoder con paramas para react router

import { CandidateRequest } from "../../services/api_gateway"

export const proposalDetailLoader = async ({ params }) => {
    const proposal = await CandidateRequest.getdetail(params.id)
    return { proposal }
}