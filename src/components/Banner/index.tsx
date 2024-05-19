import React from "react";
import { Author } from "../Author";
import { Badge } from "../Badge";

export const Banner = () => {
    return (
        <section className="mt-2.5 mb-4 md:mb-16">
            <div className="max-w-7xl mx-auto md:px-8 px-4 md:pt-4">
                <div
                    style={{
                        backgroundImage:
                            "linear-gradient(0deg, rgba(20, 22, 36, 0.4), rgba(20, 22, 36, 0.4)), url(https://source.unsplash.com/random)",
                    }}
                    className="h-[300px] md:h-[600px]  w-full object-cover rounded-xl bg-cover bg-center flex items-end"
                >
                    <div className="bg-white p-10 rounded-xl shadow-box border border-[#E8E8EA] w-[598px] hidden md:block ml-16 -mb-16">
                        <Badge label="Technology" />
                        <h1 className="text-3xl leading-10 text-[#181A2A] font-semibold mt-4 mb-6 line-clamp-3">
                            The Impact of Technology on the Workplace: How Technology is
                            Changing
                        </h1>
                        <Author
                            avatar="https://images2.thanhnien.vn/Uploaded/minhnguyet/2021_11_11/trieu-lo-tu-217.jpg"
                            name="Triệu Lộ Tư"
                            createdAt="09/11/1998"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
