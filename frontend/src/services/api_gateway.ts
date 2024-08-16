import {  FetchApiRequest, FetchApiWithToken } from "../common/class/FetchApi";
import { Proposal, ProposalDetail } from "../types/types";
import { getToken } from "./service";

const baseUrl = 'http://localhost:3000/api';
const login = async (username: string, password: string) => {
    const request = new FetchApiRequest(baseUrl)
    return request
        .post({ email: username, password })
        .fetch('users/login')
        .then(response => response.json())
};

const register = async (name: string, email: string, password: string) => {
    const request = new FetchApiRequest(baseUrl)
    return request
        .post({ name, email, password })
        .fetch('users/register')
        .then((res)=> res.status === 201 ? res.json() : 'Ha ocurrido un error'); 
};

const createAuthApiRequest = (): FetchApiWithToken | string => {
    const token = getToken()
    if (!token) return 'Ha ocurrido un error'
    return new FetchApiWithToken(baseUrl, token)
}

const getAllProposals = async (userId: string): Promise<string | Proposal[]> => {
    const token = getToken()
    if (!token) return 'Ha ocurrido un error'
    const request = new FetchApiWithToken(baseUrl, token)
    return request
        .get()
        .fetch(`proposals/user/${userId}`)
        .then((res)=> res.status === 200 ? res.json() : 'Ha ocurrido un error')
}

const getProposalDetail = async (id: string): Promise<string | ProposalDetail> => {
    const request = createAuthApiRequest()
    if (typeof request === 'string') return request
    return request
        .get()
        .fetch(`proposals/${id}`)
        .then((res)=> res.status === 200 ? res.json() : 'Ha ocurrido un error')
}

const createProposal = async (input: any) => {
    const request = createAuthApiRequest()
    if (typeof request === 'string') return request
    return request
        .post(input)
        .fetch('proposals')
        .then((res)=> res.status === 201 ? res.json() : 'Ha ocurrido un error')

}

/* export interface ForCreateProposalController {
    title: string,
    abstract: string,
    estimatedDuration: number,
    status: ProposalStatus,
    streamed: boolean,
    uniqueCode: string,
    topics: string[],
    eventId: string,
    candidateId: string
} */

export const CommonRequest = {
    login,
    register
}

export const CandidateRequest = {
    getAll: getAllProposals,
    getdetail: getProposalDetail,
    createOne: createProposal
}
