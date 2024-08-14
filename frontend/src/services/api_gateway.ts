import {  FetchApiRequest } from "../common/class/FetchApi";

const baseUrl = 'http://localhost:3000/api';
const login = async (username: string, password: string) => {
    const request = new FetchApiRequest(baseUrl)
    return await request.post({ email: username, password }).fetch('users/login')
};

export const CommonRequest = {
    login
}
