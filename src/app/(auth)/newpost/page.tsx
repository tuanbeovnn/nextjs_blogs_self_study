"use client";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import ReactQuill from "react-quill";
import RequiredAuthPage from "@/components/Auth";
import { modules } from "@/config/config";

const AddNewPost = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [availableTags, setAvailableTags] = useState<string[]>(["Web", "Design", "Programming", "Technology"]);
    const [content, setContent] = useState<string>("");

    const handleTagSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        const newTags = selectedOptions.filter(option => !tags.includes(option));
        setTags([...tags, ...newTags]);
        setAvailableTags(availableTags.filter(tag => !newTags.includes(tag)));
        e.target.value = ""; // Reset the select element
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
        setAvailableTags([...availableTags, tagToRemove]);
    };

    const handleContentChange = (value: string) => {
        setContent(value);
    };

    return (
        <RequiredAuthPage>
            <div className="max-w-5xl mx-auto p-8 my-5">
                <h1 className="text-3xl font-bold mb-6">Add New Post</h1>
                <div className="mb-5">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shortDescription">
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                        Tags
                    </label>

                    <div className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tags">
                        {tags.map((tag, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-1 rounded dark:text-blue-400 border border-blue-400">
                                {tag}
                                <button type="button" className="inline-flex items-center p-1 ms-2 text-sm bg-transparent rounded-sm hover:bg-blue-200  dark:hover:text-blue-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove" onClick={() => removeTag(tag)}>
                                    <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Remove badge</span>
                                </button>
                            </span>
                        ))}
                        <div className="md:col-span-4">
                            <select
                                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                onChange={handleTagSelect}
                                defaultValue=""
                            >
                                <option value="" disabled>Select tags</option>
                                {availableTags.map((tag, index) => (
                                    <option key={index} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <div className="md:col-span-4">
                        <select className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="category" id="category">
                            <option value="">Select category</option>
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <div className="appearance-none rounded w-full leading-tight focus:outline-none focus:shadow-outline h-60">
                        <ReactQuill theme="snow" modules={modules} value={content} onChange={handleContentChange} style={{ height: '200px' }} />
                    </div>
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
                        Thumbnail Image
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="thumbnail" type="file" accept="image/*" />
                </div>
                <div className="flex items-center justify-between">
                    <button className="mt-3 p-3 flex items-center justify-center px-3 text-blue-500 bg-white border border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded shadow-md hover:shadow-lg transition duration-300 ease-in-out" type="button">
                        Publish
                    </button>
                </div>
            </div>
        </RequiredAuthPage>
    );
};

export default AddNewPost;