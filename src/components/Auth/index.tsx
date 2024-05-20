"use client"
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { useSelector } from "react-redux";

function RequiredAuthPage({ children }: PropsWithChildren) {

    const { user } = useSelector((state: any) => state.auth);

    if (!user?.id) {
        return redirect('/login');
    }

    return (
        <>{children}</>
    )
}

export default RequiredAuthPage