"use client";
import { Ads, Author, Badge, Post } from "@/components";
import PostItemLoading from "@/components/Loading/PostItemLoading";
import { fetchByCategory, postFetchByCategory } from "@/sagas/post/post-slice";
import { PostType } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

const itemsPerPage = 6;

const CategoryBlog = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const categoryName = segments[segments.length - 1];
  const isInitialMount = useRef(true);
  const { listCatagory, loading, listPostByCategory } = useSelector(
    (state: any) => state.post,
  );

  useEffect(() => {
    dispatch(fetchByCategory());
  }, [dispatch]);

  useEffect(() => {
    if (listCatagory.length > 0) {
      const category = listCatagory.find(
        (item: any) => item.name === categoryName,
      );
      if (category) {
        dispatch(postFetchByCategory(category.id.toString()));
      }
    }
  }, [categoryName, dispatch, listCatagory]);

  return (
    <div className="max-w-7xl mx-auto md:px-8 px-4">
      <div className="py-4 text-center md:mb-12 mb-4">
        <h1 className="text-3xl text-heading dark:text-white font-semibold uppercase">
          {categoryName}
        </h1>
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
            avatar="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            name="Tracey Wilson"
            createdAt="August 20, 2022"
            light
            id="null"
          />
        </div>
      </div>

      <div className="md:pt-12 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {!loading && listPostByCategory?.length > 0 ? (
            listPostByCategory.map((post: PostType) => (
              <Post key={post.id} post={post} />
            ))
          ) : (
            <>
              {new Array(itemsPerPage).fill(0).map(() => (
                <PostItemLoading key={v4()}></PostItemLoading>
              ))}
            </>
          )}
        </div>
        <div className="md:my-20 my-8">
          <Ads />
        </div>
      </div>
    </div>
  );
};

export default CategoryBlog;
