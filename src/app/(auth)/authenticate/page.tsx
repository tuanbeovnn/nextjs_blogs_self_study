"use client";
import { authLoginGoogle } from '@/sagas/auth/auth-slice';
import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
function Authenticate() {

    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const randomString = Math.random().toString(20).substring(2, 14) + Math.random().toString(20).substring(2, 14);
    const deviceID = `${userAgent}-${platform}-${randomString}`;
    const { user, isAuthenticated, loading } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        const authCodeRegex = /code=([^&]+)/;
        const isMatch = window.location.href.match(authCodeRegex);
        if (isMatch) {
            let authCode = isMatch[1];
            authCode = decodeURIComponent(authCode);
            console.log(authCode);
            const data = {
                code: authCode,
                deviceInfo: {
                    deviceId: deviceID,
                    deviceType: platform
                }
            }
            dispatch(authLoginGoogle(data));
        }

    }, [])

    if (user && isAuthenticated && !loading) {
        return redirect("/");
    }

    return (
        <>
        </>
    )
}

export default Authenticate