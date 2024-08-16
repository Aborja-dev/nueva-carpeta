import {  FetchApiRequest } from "../common/class/FetchApi";
import { Proposal } from "../types/types";

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

const getAllProposals = async (userId: string): Promise<string | Proposal[]> => {
    const request = new FetchApiRequest(baseUrl)
    return request
        .get()
        .fetch(`proposals/user/${userId}`)
        .then((res)=> res.status === 200 ? res.json() : 'Ha ocurrido un error')
}

export const CommonRequest = {
    login,
    register
}

export const CandidateRequest = {
    getAll: getAllProposals
}
