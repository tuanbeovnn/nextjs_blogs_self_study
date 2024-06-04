import Link from 'next/link';
import React from 'react';
import { Author } from '../Author';
import { Badge } from '../Badge';
import LoadingSkeleton from './LoadingSkeleton';

const PostItemLoading = () => {
    return (
        <div className="md:p-4 p-2.5 border border-[#E8E8EA] rounded-xl h-full">
            <LoadingSkeleton width="100%" height="100%" radius="10px"></LoadingSkeleton>
            <div className="relative block pt-[67%] transition-transform duration-200 overflow-hidden group">
                {/* <img
                    className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-lg group-hover:scale-110 duration-150"
                    src=""
                    alt=""
                /> */}
                {/* <LoadingSkeleton ></LoadingSkeleton> */}
            </div>

            <div className="mt-4 p-2">
                <Badge mode="outline" label="" />
                <Link
                    href=""
                    className="md:text-2xl text-lg text-[#181A2A] font-semibold line-clamp-3 mb-5 my-4 h-24 no-underline hover:underline"
                >
                    {/* {post?.title} */}
                </Link>
                {/* <Author
                    avatar={randomImageUrl}
                    name={post?.createdBy.name}
                    createdAt={post?.createdDate}
                    id={post?.createdBy.id}
                /> */}
            {/* <LoadingSkeleton width="20%" height="10%" radius="10px"></LoadingSkeleton> */}


            </div>
        </div>
    );
};

export default PostItemLoading;