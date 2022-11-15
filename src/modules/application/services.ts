import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios'
import { STORAGE_JWT } from '../../lib/helpers/constants';
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
        let header = await getHeaderWithToken()

        const { data, status }: AxiosResponse<JWTResponse> = await request.put('/auth/alterarSenha', {
            login: user, 
            senha: currentPassword,
            senhaNova: newPassword
        }, header)
        
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

async function getHeaderWithToken(): Promise<any> {
    let header = {}

    let jwt = await AsyncStorage.getItem(STORAGE_JWT)

    if (jwt) {
        header = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
    }

    return header
}

// Adicionando um interceptor de Response
request.interceptors.response.use(function (response) {
    // Qualquer código de status que esteja dentro de 2xx fará com que essa função seja acionada
    // Faça algo com os dados de resposta
    return response;
  }, function (error) {
    console.log("error axios interceptor", error)

    return Promise.reject(error);
  });

export {
    login,
    changePassword
}