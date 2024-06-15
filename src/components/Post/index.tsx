import { PostType } from "@/types";
import Link from "next/link";
import React from "react";
import { Author } from "../Author";
import { Badge } from "../Badge";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface PostProps {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const categoryName = segments[segments.length - 1];
  const href =
    segments[segments.length - 2] === "category"
      ? `/blog/category/${categoryName}/details/${post?.id}`
      : `/blog/details/${post?.id}`;

  // const randomImageUrl = `https://picsum.photos/200/300?random=${Math.floor(
  //   Math.random() * 30
  // )}`;
  const randomImageUrl = `https://picsum.photos/200/300`;
  return (
    <div className="md:p-4 p-2.5 border bg-white dark:bg-black border-borderLight dark:border-borderDark rounded-2xl h-full">
      <div className="overflow-hidden h-60 rounded-lg">
        <Image
          className="object-cover object-center w-full h-full hover:scale-110 transition-transform duration-200 "
          src={randomImageUrl}
          width={2000}
          height={240}
          alt=""
        />
      </div>

      <div className="mt-4 p-2">
        <Badge mode="outline" label={post?.category.name} />
        <Link
          href={href}
          className="md:text-2xl text-lg text-heading dark:text-white font-semibold line-clamp-3 mb-5 my-4 h-24 hover:underline"
        >
          {post?.title}
        </Link>
        <Author
          avatar={randomImageUrl}
          name={post?.createdBy.name}
          createdAt={post?.createdDate}
          id={post?.createdBy.id}
        />
      </div>
    </div>
  );
};

export default Post;
