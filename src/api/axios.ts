import { apiURL } from '@/config/config';
import axios from 'axios';

export default axios.create({
    baseURL: apiURL,
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
    },
});