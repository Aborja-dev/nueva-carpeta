import {  FetchApiRequest } from "../common/class/FetchApi";

const baseUrl = 'http://localhost:3000/api';
const login = async (username: string, password: string) => {
    const request = new FetchApiRequest(baseUrl)
    return request
        .post({ email: username, password })
        .fetch('users/login')
        .then(response => response.json())
};

export const CommonRequest = {
    login
}
