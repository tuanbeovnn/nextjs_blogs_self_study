import Link from 'next/link';
import React from 'react';
import { Author } from '../Author';
import { Badge } from '../Badge';
import LoadingSkeleton from './LoadingSkeleton';

const PostItemLoading = () => {
    return (
        <div className="md:p-4 p-2.5 border border-borderLight dark:border-borderDark rounded-xl h-full">
            <div className="relative block pt-[67%] transition-transform duration-200 overflow-hidden group">
                <LoadingSkeleton width="100%" height="100%" className="absolute top-0 left-0 object-cover object-center rounded-lg group-hover:scale-110 duration-150" radius="10px"></LoadingSkeleton>
            </div>
            <div className="mt-4 p-2">
                <div
                    className={`inline-flex items-center justify-center rounded-md py-1 px-2.5 gap-1`}
                >
                    <span
                        className="text-sm font-medium text-white"
                    >
                        <LoadingSkeleton width="80px" height="20px" radius="10px"></LoadingSkeleton>
                    </span>
                </div>
                <Link
                    href=""
                    className="md:text-2xl text-lg text-heading font-semibold line-clamp-3 mb-5 my-4 h-24 hover:underline"
                >
                    <LoadingSkeleton width="100%" height="70%" className="md:text-2xl text-lg text-heading font-semibold line-clamp-3 mb-5 my-4 h-24 hover:underline" radius="10px"></LoadingSkeleton>

                </Link>
                <Link href="" className="flex flex-wrap items-center">
                    <LoadingSkeleton className="w-10 h-10 object-cover object-center rounded-full mr-3" width="40px" height="40px" radius="50px"></LoadingSkeleton>
                    <span
                        className="font-medium mr-5 text-[#ffff] hover:underline"
                    >
                        <LoadingSkeleton width="270px" height="25px" radius="20px"></LoadingSkeleton>
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default PostItemLoading;