"use client"
import { authRefreshToken, authUpdateUser } from '@/sagas/auth/auth-slice';
import { getToken, logOut } from '@/utils/auth';
import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Footer } from '../Footer';
import { Header } from '../Header';

const Layout = ({ children }: PropsWithChildren) => {

    const { user, isAuthenticated } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && user.id) {
            const { access_token } = getToken();
            dispatch(
                authUpdateUser({
                    user: user,
                    accessToken: access_token,
                })
            );
        } else {
            const { refresh_token } = getToken();
            if (refresh_token) {
                dispatch(authRefreshToken(refresh_token));
            } else {
                dispatch(authUpdateUser({}));
                logOut();
            }
        }
    }, [dispatch, user]);

    if (!isAuthenticated) {
        return null;
    }
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Layout;