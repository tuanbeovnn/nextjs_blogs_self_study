"use client";
import { Badge, Author, ListPost, Ads, Post } from "@/components";
import { fetchByCategory, postFetchByCategory } from "@/sagas/post/post-slice";
import { PostType } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const JavaScriptBlog = () => {


    const dispatch = useDispatch();
    const pathname = usePathname()
    const segments = pathname.split('/');
    const categoryName = segments[segments.length - 1];
    const { listCatagory, loading, listPostByCategory } = useSelector((state: any) => state.post);

    useEffect(() => {
        dispatch(fetchByCategory());
    }, [dispatch]);

    useEffect(() => {
        if (listCatagory.length > 0) {
            const category = listCatagory.find((item: any) => item.name === "JavaScript");
            if (category) {
                dispatch(postFetchByCategory(category.id.toString()));
            }
        }
    }, [categoryName, dispatch, listCatagory]);

    return (
        <div className="max-w-7xl mx-auto md:px-8 px-4">
            <div className="py-4 text-center md:mb-12 mb-4">
                <h1 className="text-3xl text-[#181A2A] font-semibold">{categoryName.toUpperCase()}</h1>
            </div>
            <div
                style={{
                    backgroundImage:
                        "linear-gradient(0deg, rgba(20, 22, 36, 0.4), rgba(20, 22, 36, 0.4)), url(https://source.unsplash.com/random)",
                }}
                className="relative h-[450px] w-full bg-center bg-cover rounded-xl flex items-end"
            >
                <div className="p-10">
                    <Badge label="Technology" />
                    <h2 className="max-w-[720px] text-4xl text-white font-semibold mt-4 mb-6">
                        The Impact of Technology on the Workplace: How Technology is
                        Changing
                    </h2>
                    <Author
                        avatar="https://source.unsplash.com/random"
                        name="Tracey Wilson"
                        createdAt="August 20, 2022"
                        light
                    />
                </div>
            </div>

            <div className="md:pt-12 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {listPostByCategory && listPostByCategory?.length > 0 ? (
                        listPostByCategory.map((post: PostType) => (
                            <Post
                                key={post.id}
                                post={post}
                            />
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>
                <div className="md:my-20 my-8">
                    <Ads />
                </div>
            </div>
        </div>
    );
};

export default JavaScriptBlog;
