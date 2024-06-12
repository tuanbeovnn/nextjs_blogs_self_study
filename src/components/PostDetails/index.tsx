import { getTagClass } from '@/utils/tagStyles'
import React from 'react'
import { Author } from '../Author'
import { Badge } from '../Badge'

interface PostDetailsProps {
    postDetail: {
        category: {
            name: string
        }
        title: string
        shortDescription: string
        content: string
        createdBy: {
            name: string
            id: string
        }
    }
    tags: string[]
}

function PostDetails({ postDetail, tags }: PostDetailsProps) {
    return (
        <>
            <div className="mb-8">
                <Badge label={postDetail?.category?.name} />
                <h1 className="font-semibold text-4xl text-[#181A2A] mt-4 mb-5 text-justify">
                    {postDetail?.title}
                </h1>
                <h6 className="font-semibold text-lg italic text-[#181A2A] mt-4 mb-5">{postDetail.shortDescription}</h6>
                <Author
                    avatar="https://picsum.photos/seed/picsum/400/500"
                    name={postDetail?.createdBy?.name}
                    createdAt={new Date()}
                    id={postDetail?.createdBy?.id}
                />
            </div>
            <div className="pb-[2rem] text-[#3B3C4A] font-[400] text-xl leading-8 text-justify"
                dangerouslySetInnerHTML={{
                    __html: postDetail?.content
                }}
            ></div>

            <div className="text-[#3B3C4A] font-[400] leading-8">
                <div className="text-base font-semibold mb-4 mt-6 text-gray-700 flex items-center">
                    <h2 className="mr-2">Tags:</h2>
                    <div className="flex flex-wrap">
                        {tags?.map((tag: string) => (
                            <span key={tag} className={getTagClass(tag) + ` text-xs font-medium mr-2 px-2.5 py-1 rounded`}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostDetails