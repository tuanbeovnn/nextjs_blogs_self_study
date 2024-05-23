import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: 'blogs',
    initialState: {
        user: undefined,
        accessToken: undefined,
        isAuthenticated: false,
    },
    reducers: {
        authLogin: (state, action) => {
            return {
                ...state,
            }
        },
        authRegister: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        authUpdateUser: (state, action) => ({
            user: action.payload.user,
            accessToken: action.payload.accessToken,
            isAuthenticated: true
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

    }
})

export const { authLogin, authRegister, authUpdateUser, authFetchMe, authRefreshToken, authLogout } = authSlice.actions;

export default authSlice.reducer;