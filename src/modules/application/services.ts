import axios, { AxiosResponse } from 'axios'
import { JWTResponse, RequestResponse } from './models';
import { ROOT_URL } from './settings';

const request = axios.create({
    baseURL: ROOT_URL,
    timeout: 10000,
})

async function login(user: string, password: string): Promise<RequestResponse<JWTResponse>> {
    try {
        const { data, status }: AxiosResponse<JWTResponse> = await request.post('/auth/login', {
            login: user, 
            senha: password
        })

        return {
            data,
            status
        }
    } catch(error: any) {
        console.log('API ERR', error)

        const response = error.response
        return {
            status: response ? response.status :  500
        }
    }
}

async function changePassword(user: string, currentPassword: string, newPassword: string): Promise<RequestResponse<JWTResponse>> {
    try {
        const { data, status }: AxiosResponse<JWTResponse> = await request.put('/auth/alterarSenha', {
            login: user, 
            senha: currentPassword,
            senhaNova: newPassword
        })

        return {
            data,
            status
        }
    } catch(error: any) {
        console.log('API ERR', error)

        const response = error.response
        return {
            status: response ? response.status :  500
        }
    }
}

export {
    login,
    changePassword
}