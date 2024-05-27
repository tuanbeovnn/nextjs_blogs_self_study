"use client";
import { Author, Badge } from "@/components";
import { postFetchById } from "@/sagas/post/post-slice";
import { getTagClass } from "@/utils/tagStyles";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BlogDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { postDetail, loading } = useSelector((state: any) => state.post);
    const { user } = useSelector((state: any) => state.auth);

    useEffect(() => {
        dispatch(postFetchById(params.blogId.toString()));
    }, [dispatch, params.blogId]);

    const tags = postDetail?.tags || [];

    return (
        <div className="max-w-[864px] mx-auto md:px-8 px-4">
            <div className="mb-8">
                <Badge label={postDetail?.category?.name} />
                <h1 className="font-semibold text-4xl text-[#181A2A] mt-4 mb-5">
                    {postDetail?.title}
                </h1>
                <h6 className="font-semibold text-lg italic text-[#181A2A] mt-4 mb-5">{postDetail.shortDescription}</h6>
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

            <div className="text-[#3B3C4A] font-[400] leading-8">
                <div className="text-base font-semibold mb-4 mt-6 text-gray-700 flex items-center">
                    <h2 className="mr-2">Tags:</h2>
                    <div className="flex flex-wrap">
                    {tags.map((tag: string) => (
                            <span key={tag} className={`text-xs font-medium mr-2 px-2.5 py-1 rounded ${getTagClass(tag)}`}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Comment Post */}
            <h1 className="text-2xl font-semibold mb-4 mt-6 text-gray-700 ">
                Discussion (20)
            </h1>
            <form className="mb-5">
                <textarea
                    disabled={!user && !user?.id}
                    className={`w-full p-5 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-blue-200 resize-none ${!user ? 'bg-gray-200 cursor-not-allowed' : ''
                        }`}
                    rows={3}
                    placeholder={user && user?.id ? "Write a comment..." : "Please log in to write a comment"}
                ></textarea>

                <div className="flex justify-end">
                    {!user && !user?.id ? "" : <button
                        type="submit"
                        className="mt-3 p-3 flex items-center justify-center px-3 text-blue-500 bg-white border border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                    >
                        Post comment
                    </button>}
                </div>
            </form>

            <div className="space-y-6">
                <div className="flex items-start p-5 mb-10 rounded-lg shadow-sm border border-blue-100">
                    <img
                        className="w-12 h-12 rounded-full object-cover"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="User avatar"
                    />
                    <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Michael Gough
                                </h3>
                                <span className="text-gray-500 text-sm">Feb. 8, 2022</span>
                            </div>
                            <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                className="inline-flex items-center p-2 text-sm font-medium text-center bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50  "
                                type="button">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                                <span className="sr-only">Comment settings</span>
                            </button>
                            <div id="dropdownComment1"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p className="mt-2 text-gray-700 leading-6">
                            Very straight-to-point article. Really worth time reading. Thank
                            you! But tools are just the instruments for the UX designers. The
                            knowledge of the design tools are as important as the creation of
                            the design strategy.
                        </p>

                        {!user && !user?.id ? ""
                            : <button className="mt-3 text-blue-500 hover:underline focus:outline-none">
                                Reply
                            </button>}
                        {/* <!-- Replies --> */}
                        <div className="mt-6 pl-6 border-l-2 border-gray-200 space-y-6">
                            <div className="flex items-start">
                                <img
                                    className="w-10 h-10 rounded-full object-cover"
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="User avatar"
                                />
                                <div className="ml-4 flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-md font-semibold text-gray-800">
                                                Anna Smith
                                            </h4>
                                            <span className="text-gray-500 text-sm">
                                                Feb. 9, 2022
                                            </span>
                                        </div>
                                        <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                            className="inline-flex items-center p-2 text-sm font-medium text-center bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50  "
                                            type="button">
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                            </svg>
                                            <span className="sr-only">Comment settings</span>
                                        </button>
                                    </div>
                                    <p className="mt-2 text-gray-700 leading-6">
                                        I totally agree with you, Michael! The strategy is indeed
                                        crucial.
                                    </p>
                                    {!user && !user?.id ? ""
                                        : <button className="mt-3 text-blue-500 hover:underline focus:outline-none">
                                            Reply
                                        </button>}
                                    <div className="mt-6 pl-6 border-l-2 border-gray-200 space-y-6">

                                        <div className="flex items-start">
                                            <img
                                                className="w-10 h-10 rounded-full object-cover"
                                                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                alt="User avatar"
                                            />
                                            <div className="ml-4 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="text-md font-semibold text-gray-800">
                                                            John Doe
                                                        </h4>
                                                        <span className="text-gray-500 text-sm">
                                                            Feb. 10, 2022
                                                        </span>
                                                    </div>
                                                    <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                                        className="inline-flex items-center p-2 text-sm font-medium text-center bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50  "
                                                        type="button">
                                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                                        </svg>
                                                        <span className="sr-only">Comment settings</span>
                                                    </button>
                                                </div>
                                                <p className="mt-2 text-gray-700 leading-6">
                                                    Great point, Anna. Having a solid strategy makes all the
                                                    difference.
                                                </p>
                                                {!user && !user?.id ? ""
                                                    : <button className="mt-3 text-blue-500 hover:underline focus:outline-none">
                                                        Reply
                                                    </button>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <img
                                    className="w-10 h-10 rounded-full object-cover"
                                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="User avatar"
                                />
                                <div className="ml-4 flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-md font-semibold text-gray-800">
                                                John Doe
                                            </h4>
                                            <span className="text-gray-500 text-sm">
                                                Feb. 10, 2022
                                            </span>
                                        </div>
                                        <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                            className="inline-flex items-center p-2 text-sm font-medium text-center bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50  "
                                            type="button">
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                            </svg>
                                            <span className="sr-only">Comment settings</span>
                                        </button>
                                    </div>
                                    <p className="mt-2 text-gray-700 leading-6">
                                        Great point, Anna. Having a solid strategy makes all the
                                        difference.
                                    </p>
                                    {!user && !user?.id ? ""
                                        : <button className="mt-3 text-blue-500 hover:underline focus:outline-none">
                                            Reply
                                        </button>}
                                    <div className="mt-6 pl-6 border-l-2 border-gray-200 space-y-6">

                                        <div className="flex items-start">
                                            <img
                                                className="w-10 h-10 rounded-full object-cover"
                                                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                alt="User avatar"
                                            />
                                            <div className="ml-4 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="text-md font-semibold text-gray-800">
                                                            Anna Smith
                                                        </h4>
                                                        <span className="text-gray-500 text-sm">
                                                            Feb. 10, 2022
                                                        </span>
                                                    </div>
                                                    <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                                        className="inline-flex items-center p-2 text-sm font-medium text-center bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50  "
                                                        type="button">
                                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                                        </svg>
                                                        <span className="sr-only">Comment settings</span>
                                                    </button>
                                                </div>
                                                <p className="mt-2 text-gray-700 leading-6">
                                                    Great point, Anna. Having a solid strategy makes all the
                                                    difference.
                                                </p>
                                                {!user && !user?.id ? ""
                                                    : <button className="mt-3 text-blue-500 hover:underline focus:outline-none">
                                                        Reply
                                                    </button>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;