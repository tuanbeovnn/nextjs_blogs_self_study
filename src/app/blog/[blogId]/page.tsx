"use client";
import { Author, Badge } from "@/components";
import { postFetchById } from "@/sagas/post/post-slice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const BlogDetail = () => {
    const params = useParams();
    const { postDetail, loading } = useSelector((state: any) => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(postFetchById(params.blogId.toString()));
    }, [dispatch, params.blogId]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }


    return (
        <div className="max-w-[864px] mx-auto md:px-8 px-4">
            <div className="mb-8">
                <Badge label={postDetail?.category?.name} />
                <h1 className="font-semibold text-4xl text-[#181A2A] mt-4 mb-5">
                    {postDetail?.title}
                </h1>
                <Author
                    avatar="https://source.unsplash.com/random"
                    name={postDetail?.createdBy?.name}
                    createdAt={new Date()}
                />
            </div>
            <div className="pb-[2rem] text-[#3B3C4A] font-[400] text-xl leading-8"
                dangerouslySetInnerHTML={{
                    __html: postDetail?.content
                }}
            ></div>
        </div>
    );
};

export default BlogDetail;