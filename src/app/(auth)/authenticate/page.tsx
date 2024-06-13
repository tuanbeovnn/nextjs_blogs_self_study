"use client";
import { authLoginGoogle } from '@/sagas/auth/auth-slice';
import React, { use, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
function Authenticate() {

    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const randomString = Math.random().toString(20).substring(2, 14) + Math.random().toString(20).substring(2, 14);
    const deviceID = `${userAgent}-${platform}-${randomString}`;
    const { user, isAuthenticated, loading } = useSelector((state: any) => state.auth);
    const isInitialMount = useRef(true);
    const dispatch = useDispatch();
    useEffect(() => {
        if (isInitialMount.current) {
            const authCodeRegex = /code=([^&]+)/;
            const isMatch = window.location.href.match(authCodeRegex);
            if (isMatch) {
                let authCode = isMatch[1];
                authCode = decodeURIComponent(authCode);
                const data = {
                    code: authCode,
                    deviceInfo: {
                        deviceId: deviceID,
                        deviceType: platform
                    }
                }
                dispatch(authLoginGoogle(data));
            }
            isInitialMount.current = false;
        }
    }, [deviceID, dispatch, platform])

    if (user && isAuthenticated && !loading) {
        return redirect("/");
    }

    return (
        <>
        </>
    )
}

export default Authenticate