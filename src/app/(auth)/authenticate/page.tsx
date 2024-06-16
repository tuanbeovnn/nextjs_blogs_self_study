"use client";
import LoadingSpin from "@/components/Loading/LoadingSpin";
import { authLoginGoogle } from "@/sagas/auth/auth-slice";
import { redirect } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function Authenticate() {
	const userAgent = window.navigator.userAgent;
	const platform = window.navigator.platform;
	const randomString =
		Math.random().toString(20).substring(2, 14) +
		Math.random().toString(20).substring(2, 14);
	const deviceID = `${userAgent}-${platform}-${randomString}`;
	const {user, isAuthenticated, loading} = useSelector(
		(state: any) => state.auth
	);
	const isInitialMount = useRef(true);
	const dispatch = useDispatch();
	useEffect(() => {
        if (isInitialMount.current) {
            const authCodeRegex = /code=([^&]+)/;
            const isMatch = window.location.href.match(authCodeRegex);

            if (!isMatch) {
                // If there's no auth code in the URL, redirect to the login page
                redirect("/login");
                return;
            }

            let authCode = isMatch[1];
            authCode = decodeURIComponent(authCode);
            const data = {
                code: authCode,
                deviceInfo: {
                    deviceId: deviceID,
                    deviceType: platform,
                },
            };
            dispatch(authLoginGoogle(data));
            isInitialMount.current = false;
        }
    }, [deviceID, dispatch, platform]);

	if (user && isAuthenticated && !loading) {
		return redirect("/");
	}

	return (
            <>
                <LoadingSpin/>
            </>
	);
}

export default Authenticate;
