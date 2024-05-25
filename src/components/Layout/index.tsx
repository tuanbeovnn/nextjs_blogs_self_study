"use client"
import { authRefreshToken, authUpdateUser } from '@/sagas/auth/auth-slice';
import { getToken, logOut } from '@/utils/auth';
import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Footer } from '../Footer';
import { Header } from '../Header';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Layout;