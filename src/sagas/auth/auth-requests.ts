import axios from 'axios';
import { apiURL } from '../../config/config';

export const requestsLogin = (data: object) => {
    console.log("auth login request ", data)
    return axios.request({
        method: 'POST',
        url: apiURL + `/v1/auth/signin`,
        data: data
    })
}

export const requestsAuthRegister = (data: object) => {
    return axios.request({
        method: 'POST',
        url: apiURL + `/v1/auth/signup`,
        data: data
    })
}

export const requestsAuthFetchMe = (token: string) => {
    // if (!token) {
    //     return;
    // }
    return axios.request({
        method: 'GET',
        url: apiURL + `/v1/users/me`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}


export const requestsFreshToken = (data: object) => {
    return axios.request({
        method: 'POST',
        url: apiURL + `/v1/auth/refresh`,
        data: data
    })
}