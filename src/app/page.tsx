"use client";
import {
    Banner,
    Ads,
    ListPost,
} from '@/components';
import { authUpdateUser, authRefreshToken } from '@/sagas/auth/auth-slice';
import { getToken, logOut } from '@/utils/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {

    const { user } = useSelector((state: any) => state.auth);

    console.log("user from aaa", user)
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

    return (
        <div>
            <Banner />
            <div className="md:pt-20 pt-4 pb-24">
                <div className="max-w-7xl mx-auto md:px-8 px-4">
                    <Ads />
                    <div className="md:py-20 py-4">
                        <h2 className="font-bold text-2xl text-[#181A2A] md:mb-8 mb-4">
                            Latest Post
                        </h2>
                        <ListPost />
                    </div>
                    <Ads />
                </div>
            </div>
        </div>
    );
}
