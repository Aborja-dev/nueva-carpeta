import {  FetchApiRequest, FetchApiWithToken } from "../common/class/FetchApi";
import { Proposal, ProposalCreateData, ProposalDetail } from "../types/types";
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

const updateData = async (id, body) => {
    const request = createAuthApiRequest()
    if (typeof request === 'string') return request
    return request
        .patch(body)
        .fetch(`proposals/${id}`)
        .then((res)=> res.status === 200 ? res.json() : 'Ha ocurrido un error')
}

const getData = async (): Promise<string | {
    eventStatus: any
    eventTypes: any
    event: any
    proposalsStatus: any,
    topics: any
}> => {
    const request = new FetchApiRequest(baseUrl)
    return request
        .get()
        .fetch('data')
        .then((res)=> res.status === 200 ? res.json() : 'Ha ocurrido un error');
}

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

const createProposal = async (input: ProposalCreateData) => {
    const request = createAuthApiRequest()
    if (typeof request === 'string') return request
    return request
        .post(input)
        .fetch('proposals')
        .then((res)=> res.status === 201 ? res.json() : 'Ha ocurrido un error')

}

const deleteProposal = async (id: number) => {
    const request = createAuthApiRequest()
    if (typeof request === 'string') return request
    return request
        .delete()
        .fetch(`proposals/${id}`)
        .then((res)=> res.status === 200 ? res.json() : 'Ha ocurrido un error')
}

export const CommonRequest = {
    login,
    register,
    getData,
}

export const CandidateRequest = {
    getAll: getAllProposals,
    getdetail: getProposalDetail,
    createOne: createProposal,
    deleteOne: deleteProposal,
    update: updateData
}
