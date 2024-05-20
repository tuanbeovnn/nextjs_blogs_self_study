"use client"
import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';

function RequiredAuthPage({ children }: any) {

    const router = useRouter();
    const { user, isAuthenticated } = useSelector((state: any) => state.auth);

    console.log(user, isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated && !user?.id) {
            router.push('/login');
        }
    }, [user, router, isAuthenticated]);

    // if (!user?.id) {
    //     return router.push('/login');
    // }
    return (
        <>{children}</>
    )
}

export default RequiredAuthPage