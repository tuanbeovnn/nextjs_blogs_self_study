"use client";
import { Author, Badge } from "@/components";
import { useParams } from "next/navigation";
import React, { use } from "react";


const BlogDetail = () => {

    const params = useParams();

    console.log(params)
    

    return (
        <div className="max-w-[864px] mx-auto md:px-8 px-4">
            <div className="mb-8">
                <Badge label="Technology" />
                <h1 className="font-semibold text-4xl text-[#181A2A] mt-4 mb-5">
                    The Impact of Technology on the Workplace: How Technology is Changing
                </h1>
                <Author
                    avatar="https://source.unsplash.com/random"
                    name="Tracey Wilson"
                    createdAt={new Date()}
                />
            </div>
            <div className="pb-[2rem] text-[#3B3C4A] font-[400] text-xl leading-8"
                dangerouslySetInnerHTML={{
                    __html: "<h1>Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. However, traveling can also be stressful and overwhelming, especially if you don't plan and prepare adequately. In this blog article, we'll explore tips and tricks for a memorable journey and how to make the most of your travels. One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.</h1>",
                }}
            ></div>
        </div>
    );
};

export default BlogDetail;
