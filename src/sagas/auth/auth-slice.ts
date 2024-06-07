import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AuthState {
    user: object | undefined;
    accessToken: string | undefined;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: undefined,
    accessToken: undefined,
    loading: false,
    isAuthenticated: false,
    error: null,
};

const authSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        authLogin: (state, action: PayloadAction<object>) => {
            state.loading = true;
        },
        authLoginSuccess: (state) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        authLoginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        authRegister: (state, action: PayloadAction<object>) => {
            state.loading = true;
        },
        authRegisterSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        authRegisterFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        authUpdateUser: (state, action) => ({
            ...state,
            user: action.payload.user,
            accessToken: action.payload.accessToken,
            isAuthenticated: true,
            loading: false,
            error: null
        }),
        authFetchMe: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        authRefreshToken: (state, action) => ({
            ...state,
            ...action.payload,

        }),
        authLogout: (state) => state,

        authLoginGoogle: (state, action: PayloadAction<object>) => {
            state.loading = true;
            state.error = null;
        },
        authLoginGoogleSuccess: (state) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        authLoginGoogleFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const {
    authLogin,
    authLoginSuccess,
    authLoginFailure,
    authRegister,
    authRegisterSuccess,
    authRegisterFailure,
    authUpdateUser,
    authFetchMe,
    authRefreshToken,
    authLogout,
    authLoginGoogle,
    authLoginGoogleSuccess,
    authLoginGoogleFailure
} = authSlice.actions;

export default authSlice.reducer;