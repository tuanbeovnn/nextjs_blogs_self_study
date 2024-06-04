"use client"
import { PropsWithChildren } from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Header />
            <div style={{ minHeight: "calc(100vh - 218px)" }}>
                {children}
            </div>
            <Footer />
        </>
    );
};

export default Layout;