"use client";
import { Ads, Banner } from "@/components";
import PostItemLoading from "@/components/Loading/PostItemLoading";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { postFetchFeed } from "@/sagas/post/post-slice";
import { PostType } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

const itemsPerPage = 9;

function Home() {
  const { listPost, loading, totalRecordsFeed } = useSelector(
    (state: any) => state.post,
  );

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (listPost.length === 0) dispatch(postFetchFeed(0));
  }, [dispatch, listPost.length]);

  const handleLoadMore = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    dispatch(postFetchFeed(newPage));
  };

  const allPostsLoaded = listPost?.length >= totalRecordsFeed;
  return (
    <>
      <div>
        <Banner />
        <div className="md:pt-20 pt-4 pb-24">
          <div className="max-w-7xl mx-auto md:px-8 px-4">
            <Ads />
            <div className="md:py-20 py-4">
              <h2 className="font-bold text-2xl text-heading dark:text-white md:mb-8 mb-4">
                Latest Post
              </h2>
              {listPost?.length > 0 ? (
                <HoverEffect items={listPost} />
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {new Array(itemsPerPage).fill(0).map(() => (
                      <PostItemLoading key={v4()}></PostItemLoading>
                    ))}
                  </div>
                </>
              )}
              {!allPostsLoaded && (
                <button
                  className="md:mt-8 mt-4 mx-auto px-5 py-3 flex items-center gap-3 h-12 border border-blue-500 rounded-md font-medium font-base text-blue-500"
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="mx-auto w-5 h-5 border-2 border-blue-500 border-t-2 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Load more"
                  )}
                </button>
              )}
            </div>
            <Ads />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
