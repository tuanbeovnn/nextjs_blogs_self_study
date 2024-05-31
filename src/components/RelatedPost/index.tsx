import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function RelatedPost() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3400,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const data = [
        {
            id: 1,
            title: "How to Learn JavaScript",
            excerpt:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste dolor nihil provident obcaecati.",
            thumbnail: "https://source.unsplash.com/random/1",
        },
        {
            id: 2,
            title: "Understanding React Hooks",
            excerpt:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste dolor nihil provident obcaecati.",
            thumbnail: "https://source.unsplash.com/random/2",
        },
        {
            id: 3,
            title: "CSS Grid Layout",
            excerpt:
                "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste dolor nihil provident obcaecati.",
            thumbnail: "https://source.unsplash.com/random/3",
        },
        {
            id: 4,
            title: "CSS Grid Layout",
            excerpt:
                "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste dolor nihil provident obcaecati.",
            thumbnail: "https://source.unsplash.com/random/3",
        },
        {
            id: 5,
            title: "CSS Grid Layout",
            excerpt:
                "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste dolor nihil provident obcaecati.",
            thumbnail: "https://source.unsplash.com/random/3",
        },
        {
            id: 6,
            title: "CSS Grid Layout",
            excerpt:
                "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste dolor nihil provident obcaecati.",
            thumbnail: "https://source.unsplash.com/random/3",
        },
    ];
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Related Articles
            </h2>
            <Slider {...settings} className="slider-container">
                {data.map((article) => (
                    <div
                        key={article.id}
                        className="bg-white rounded-lg overflow-hidden shadow-md slider-item"
                    >
                        <div className="h-48 overflow-hidden group tion-transformtransi duration-200">
                            <img
                                src={article.thumbnail}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-110 duration-150 transition-all ease-in"
                            />
                        </div>
                        <div className="p-4">
                            <a href="#!">
                                <h3 className="text-lg font-semibold text-gray-800 truncate hover:text-blue-500 duration-150">
                                    {article.title}
                                </h3>
                            </a>
                            <p className="text-gray-600 mt-2 leading-5">{article.excerpt}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default RelatedPost