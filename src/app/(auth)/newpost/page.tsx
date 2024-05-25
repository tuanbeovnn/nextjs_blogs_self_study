"use client";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import ReactQuill from "react-quill";
import RequiredAuthPage from "@/components/Auth";
import { modules } from "@/config/config";

const AddNewPost = () => {
    const [content, setContent] = useState("");

    const handleContentChange = (value: string) => {
        setContent(value);
    };

    return (
        <RequiredAuthPage>
            <div className="max-w-5xl mx-auto p-8 my-5">
                <h1 className="text-3xl font-bold mb-6">Add New Post</h1>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Enter your title"
                    />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="title"
                    >
                        Short Description
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="shortDescription"
                        type="text"
                        placeholder="Enter your short description"
                    />
                </div>

                <div className="mb-5">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="tags"
                    >
                        Tags
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="tags"
                        type="text"
                        placeholder="Enter tags separated by commas"
                    />
                </div>

                <div className="mb-5">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="tags"
                    >
                        Category
                    </label>
                    <div className="md:col-span-4">
                        <select
                            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="location"
                            id="location"
                        >
                            <option value="Viet Nam">Select category</option>
                            <option value="Viet Nam">Viet Nam</option>
                            <option value="USA">USA</option>
                            <option value="Japan">Japan</option>
                            <option value="Germany">Germany</option>
                            <option value="China">China</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="UK">UK</option>
                            <option value="France">France</option>
                            <option value="Spain">Spain</option>
                            <option value="Russia">Russia</option>
                        </select>
                    </div>
                </div>

                <div className="mb-5">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="content"
                    >
                        Content
                    </label>
                    <div className="appearance-none rounded w-full leading-tight focus:outline-none focus:shadow-outline h-60">
                        <ReactQuill
                            modules={modules}
                            value={content}
                            onChange={handleContentChange}
                            style={{ height: "200px" }}
                        />
                    </div>
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="thumbnail"
                    >
                        Thumbnail Image
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="mt-3 p-3 flex items-center justify-center px-3 text-blue-500 bg-white border border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                        type="button"
                    >
                        Publish
                    </button>
                </div>
            </div>
        </RequiredAuthPage>

    );
};

export default AddNewPost;
