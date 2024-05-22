import axios from 'axios';
import { apiURL } from '../../config/config';

export const requestsPostFetchFeed = () => {
    return axios.request({
        method: 'GET',
        url: apiURL + `/v1/public/posts/feed`
    })
}

export const requestsGetPostById = (postId: string) => {
    return axios.request({
        method: 'GET',
        url: apiURL + `/v1/public/posts/${postId}`
    })
}