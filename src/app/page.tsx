"use client";
import {
    Ads,
    Banner,
    Post
} from '@/components';
import PostItemLoading from '@/components/Loading/PostItemLoading';
import { postFetchFeed } from '@/sagas/post/post-slice';
import { PostType } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from "uuid";
const itemsPerPage = 9;

function Home() {
    const { listPost, loading } = useSelector((state: any) => state.post);
    const dispatch = useDispatch();
    const isInitialMount = useRef(true);
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        if (isInitialMount.current) {
            dispatch(
                postFetchFeed(0)
            );
            isInitialMount.current = false;
        }
    }, [dispatch]);

    useEffect(() => {
        if (!isInitialMount.current) {
            setPosts(prevPosts => [...prevPosts, ...listPost]);
        } else {
            isInitialMount.current = false;
        }
    }, [listPost]);

    const handleLoadMore = () => {
        const nextPage = Math.ceil(posts.length / itemsPerPage) + 1;
        dispatch(postFetchFeed(nextPage));
    };

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
                            {posts?.length > 0 ? (
                                posts.map((post: PostType) => (
                                    <Post
                                        key={post.id}
                                        post={post}
                                    />
                                ))
                            ) : (
                                <>
                                    {new Array(itemsPerPage).fill(0).map(() => (
                                        <PostItemLoading key={v4()}></PostItemLoading>
                                    ))}
                                </>
                            )}
                        </div>
                        <button className="md:mt-8 mt-4 mx-auto px-5 py-3 flex items-center gap-3 h-12 border border-blue-500 rounded-md font-medium font-base text-blue-500"
                            onClick={handleLoadMore}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="mx-auto w-5 h-5 border-2 border-blue-500 border-t-2 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Load more"
                            )}
                        </button>

                    </div>
                    <Ads />
                </div>
            </div>
        </div>
    )
}

export default Home;
