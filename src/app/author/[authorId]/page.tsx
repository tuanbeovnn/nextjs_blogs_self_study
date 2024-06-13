"use client";
import { Post } from "@/components";
import { postFetchByUserId } from "@/sagas/post/post-slice";
import { PostType } from "@/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthorDetail = () => {

    const dispatch = useDispatch();
    const pathname = usePathname();
    const segments = pathname.split('/');
    const userIdFromParam = segments[segments.length - 1];

    const { listPostByUserId } = useSelector((state: any) => state.post);

    useEffect(() => {
        dispatch(postFetchByUserId(userIdFromParam));
    }, [dispatch, userIdFromParam]);

    return (
        <div className="max-w-7xl mx-auto md:px-8 px-4">
            <div className="md:p-12 p-6 mb-12 text-center rounded-xl bg-[#F6F6F7]">
                <div className="max-w-2xl mx-auto">
                    <div className="flex gap-4 items-center justify-center">
                        <Image
                            src="https://source.unsplash.com/random"
                            className="w-16 h-16 rounded-full"
                            alt=""
                        />
                        <div>
                            <div className="text-xl text-[#181A2A] font-medium">
                                Jonathan Doe
                            </div>
                            <div className="text-sm text-[#696A75]">
                                Collaborator & Editor
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-lg text-[#3B3C4A] my-6">
                        Meet Jonathan Doe, a passionate writer and blogger with a love for
                        technology and travel. Jonathan holds a degree in Computer Science
                        and has spent years working in the tech industry, gaining a deep
                        understanding of the impact technology has on our lives.
                    </p>
                </div>
                <div className="flex items-center gap-2 justify-center">
                    <div className="w-8 h-8 rounded-md bg-[#696A75] inline-flex items-center justify-center">
                        <span className="text-base text-white">A</span>
                    </div>
                    <div className="w-8 h-8 rounded-md bg-[#696A75] inline-flex items-center justify-center">
                        <span className="text-base text-white">A</span>
                    </div>
                    <div className="w-8 h-8 rounded-md bg-[#696A75] inline-flex items-center justify-center">
                        <span className="text-base text-white">A</span>
                    </div>
                    <div className="w-8 h-8 rounded-md bg-[#696A75] inline-flex items-center justify-center">
                        <span className="text-base text-white">A</span>
                    </div>
                </div>
            </div>

            <div className="md:pb-24 pb-10">
                <div className="text-2xl text-[#181A2A] font-bold mb-8">
                    Latest Post
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {listPostByUserId && listPostByUserId.length > 0 ? (
                        listPostByUserId.map((post: PostType) => (
                            <Post
                                key={post.id}
                                post={post}
                            />
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthorDetail;
