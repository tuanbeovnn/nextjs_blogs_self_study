"use client";
import PostDetails from "@/components/PostDetails";
import RelatedPost from "@/components/RelatedPost";
import { postFetchById } from "@/sagas/post/post-slice";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "@/components/Comment";

function CategoryItemDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const { postDetail, loading } = useSelector((state: any) => state.post);
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(postFetchById(params?.detailsItemCategory?.toString()));
  }, [dispatch, params.detailsItemCategory]);

  const tags = postDetail?.tags || [];

  return (
    <div className="max-w-[864px] mx-auto md:px-8 px-4">
      <PostDetails postDetail={postDetail} tags={tags} />
      {/* slide Post */}
      <div className="mb-20">
        <RelatedPost />
      </div>

      {/* Comment Post */}
      <h1 className="text-2xl font-semibold mb-4 mt-6 text-gray-700  dark:text-white">
        Discussion (20)
      </h1>
      <form className="mb-5">
        <textarea
          disabled={!user && !user?.id}
          className={`w-full p-5 text-gray-700 bg-gray-200 dark:bg-heading border dark:border-borderDark rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none ${
            !user ? "cursor-not-allowed" : ""
          }`}
          rows={1}
          placeholder={
            user && user?.id
              ? "Write a comment..."
              : "Please log in to write a comment"
          }
        ></textarea>

        <div className="flex justify-end">
          {!user && !user?.id ? (
            ""
          ) : (
            <button
              type="submit"
              className="mt-3 p-3 flex items-center justify-center px-3 text-blue-500 bg-white border border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              Post comment
            </button>
          )}
        </div>
      </form>
      <Comment user={user} />
    </div>
  );
}

export default CategoryItemDetail;
