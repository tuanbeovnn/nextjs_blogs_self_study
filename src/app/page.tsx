"use client";
import {
    Ads,
    Banner,
    Post
} from '@/components';
import LoadingSkeleton from '@/components/Loading/LoadingSkeleton';
import PostItemLoading from '@/components/Loading/PostItemLoading';
import { postFetchFeed } from '@/sagas/post/post-slice';
import { PostType } from '@/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
    const { listPost, loading } = useSelector((state: any) => state.post);
    console.log(loading)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            postFetchFeed()
        );
    }, [dispatch]);

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

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {!loading && listPost?.length > 0 ? (
                                listPost.map((post: PostType) => (
                                    <Post
                                        key={post.id}
                                        post={post}
                                    />
                                ))
                            ) : (
                                <>
                                    <PostItemLoading />
                                    <PostItemLoading />
                                    <PostItemLoading />
                                    <PostItemLoading />
                                    <PostItemLoading />
                                    <PostItemLoading />
                                </>
                            )}
                        </div>
                        <button className="md:mt-8 mt-4 mx-auto px-5 py-3 flex items-center gap-3 h-12 border border-[#696A75]/30 rounded-md font-medium font-base text-[#696A75]">
                            View All Post
                        </button>
                    </div>
                    <Ads />
                </div>
            </div>
        </div>
    )
}

export default Home;