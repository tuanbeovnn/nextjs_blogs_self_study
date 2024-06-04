"use client";
import RequiredAuthPage from "@/components/Auth";
import DropdownHook from "@/components/DropdownHook/DropdownHook";
import InputHook from "@/components/Input/InputHook";
import QuillEditorHook from "@/components/QuillEditorHook/QuillEditorHook";
import { modules } from "@/config/config";
import { fetchByCategory } from "@/sagas/post/post-slice";
import { CategoryItemType } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
// Define the schema
const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    shortDescription: yup.string().required("Short Description is required").min(1, "Content must be at least 100 characters"),
    thumbnail: yup.string().required("Thumbnail is required"),
    category: yup.string().required("Category is required"),
    tags: yup.string().required("Tags is required"),
    content: yup
        .string()
        .required("Content is required")
        .min(1, "Content must be at least 200 characters")

});
const AddNewPost = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [availableTags, setAvailableTags] = useState<string[]>(["Web", "Design", "Programming", "Technology"]);
    const dispatch = useDispatch();
    const { listCatagory, loading } = useSelector((state: any) => state.post);

    const handleTagSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        const newTags = selectedOptions.filter(option => !tags.includes(option));
        setTags([...tags, ...newTags]);
        setAvailableTags(availableTags.filter(tag => !newTags.includes(tag)));
        e.target.value = "";
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
        setAvailableTags([...availableTags, tagToRemove]);
    };

    const { handleSubmit, register, formState: { errors, isSubmitting, isValid, isDirty }, reset, control } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

    const getBase64 = (file: File) => {
    };

    const onSubmit = (values: object) => {

        console.log(values);

        if (isValid) {

        }
    }
    useEffect(() => {
        dispatch(fetchByCategory());
    }, [dispatch]);

    return (
        <RequiredAuthPage>
            <div className="max-w-5xl mx-auto p-8 my-5">
                <h1 className="text-3xl font-bold mb-6">Add New Post</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputHook control={control} name="title" placeholder="Enter title" id="title" type="text" label="Post Title" />
                    <InputHook control={control} name="shortDescription" placeholder="Enter short description" id="shortDescription" type="text" label="Short Description" />
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
                    <InputHook control={control} name="thumbnail" id="thumbnail" type="file" label="Thumbnail Image" />
                    <DropdownHook
                        control={control}
                        name="category"
                        label="Category"
                        options={listCatagory?.map((category: CategoryItemType) => ({
                            value: category.id,
                            label: category.name
                        }))}
                    />
                    <Controller
                        name='content'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            <QuillEditorHook
                                value={value || ""}
                                label="Content"
                                onChange={onChange}
                                modules={modules}
                            />
                        )}
                    />
                    {errors && errors.content && <span className="text-red-500 text-sm">{errors.content.message}</span>}
                    {/* <QuillEditorHook control={control} name="content" label="Content" modules={modules} onChange={handleContentChange} /> */}
                    <div className="flex items-center justify-between">
                        <button type="submit" className="mt-3 p-3 flex items-center justify-center px-3 text-blue-500 bg-white border border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                            Publish
                        </button>
                    </div>
                </form>

            </div>
        </RequiredAuthPage>
    );
};

export default AddNewPost;