import { IncomingMessage } from "http";
import Cookies from "js-cookie";
import cookie from 'cookie';
const accessTokenKey: string = 'crow_access_token';
const refreshTokenKey: string = 'crow_refresh_token';
const objCookies: any = {
    expires: 7,
    domain: process.env.COOKIE_DOMAIN,
};

export const saveToken = (access_token: string, refresh_token: string) => {
    if (access_token && refresh_token) {
        Cookies.set(accessTokenKey, access_token, {
            ...objCookies,
        });
        Cookies.set(refreshTokenKey, refresh_token, {
            ...objCookies,
        });
    } else {
        Cookies.remove(accessTokenKey, {
            ...objCookies,
            path: '/',
            domain: process.env.COOKIE_DOMAIN,
        });
        Cookies.remove(refreshTokenKey, {
            ...objCookies,
            path: '/',
            domain: process.env.COOKIE_DOMAIN,
        });
    }
};

export const getToken = (req?: IncomingMessage) => {
    if (req) {
        const cookies = cookie.parse(req.headers.cookie || '');
        const access_token = cookies[accessTokenKey];
        const refresh_token = cookies[refreshTokenKey];
        return {
            access_token,
            refresh_token,
        };
    } else {
        const access_token = Cookies.get(accessTokenKey);
        const refresh_token = Cookies.get(refreshTokenKey);
        return {
            access_token,
            refresh_token,
        };
    }
};

export const logOut = () => {
    const access_token = Cookies.get(accessTokenKey);
    if (access_token) {
        Cookies.remove(accessTokenKey, {
            ...objCookies,
            path: '/',
            domain: process.env.COOKIE_DOMAIN,
        });
        Cookies.remove(refreshTokenKey, {
            ...objCookies,
            path: '/',
            domain: process.env.COOKIE_DOMAIN,
        });
    }
};