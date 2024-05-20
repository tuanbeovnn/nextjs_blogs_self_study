export interface LoginAction {
    type: string;
    payload: {
        username: string;
        password: string;
    };
}

export interface RegisterAction {
    type: string;
    payload: {
        name: string;
        email: string;
        password: string;
    };
}

export interface Token {
    type: string;
    payload: {
        token: string;
    };
}


export interface RefreshTokenAction {
    type: string;
    payload: {
        refreshToken: string;
    };
}