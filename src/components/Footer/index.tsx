"use client"
import Image from 'next/image';
import LogoIcon from "../../app/assets/images/logo-notext.png";
import EmailIcon from "../../app/assets/images/mail.png";
export const Footer = () => {
    return (
        <footer className="bg-[#F6F6F7] pt-16">
            <div className="max-w-7xl mx-auto md:px-8 px-4">
                <div className="pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 col-span-1 grid lg:grid-cols-2 grid-cols-1 gap-10">
                        <div className="col-span-1">
                            <h3 className="font-semibold text-lg text-[#181A2A] mb-3">
                                About
                            </h3>
                            <p className="text-base text-[#696A75] mb-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam
                            </p>
                            <p className="text-base text-[#3B3C4A]">
                                <span className="text-[#181A2A] font-semibold">Email : </span>
                                info@jstemplate.net
                            </p>
                            <p className="text-base text-[#3B3C4A]">
                                <span className="text-[#181A2A] font-semibold">Phone : </span>
                                880 123 456 789
                            </p>
                        </div>
                        <div className="col-span-1 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <h3 className="font-semibold text-lg text-[#181A2A] mb-3">
                                    Quick Link
                                </h3>
                                <ul>
                                    <li>
                                        <a href="/" className="text-base text-[#3B3C4A]">
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" className="text-base text-[#3B3C4A]">
                                            About
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" className="text-base text-[#3B3C4A]">
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" className="text-base text-[#3B3C4A]">
                                            Archived
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" className="text-base text-[#3B3C4A]">
                                            Contact
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-[#181A2A] mb-3">
                                    Category
                                </h3>
                                <ul>
                                    <li>
                                        <a href="/" className="text-base text-[#3B3C4A]">
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" className="text-base text-[#3B3C4A]">
                                            About
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" className="text-base text-[#3B3C4A]">
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" className="text-base text-[#3B3C4A]">
                                            Archived
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" className="text-base text-[#3B3C4A]">
                                            Contact
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <form className="md:p-8 p-4 w-full rounded-xl bg-white">
                            <div className="text-center mb-7">
                                <div className="font-semibold text-xl text-[#181A2A] mb-2">
                                    Weekly Newsletter
                                </div>
                                <div className="text-base text-[#696A75]">
                                    Get blog articles and offers via email
                                </div>
                            </div>
                            <div className="flex items-center h-12 w-full bg-white rounded-md border border-[#DCDDDF] overflow-hidden">
                                <input
                                    className="w-full h-full py-3 px-4 outline-none"
                                    type="text"
                                    placeholder="Your Email"
                                />
                                <div className="pr-4">
                                    <Image
                                        src={EmailIcon}
                                        className="w-5 h-5 object-cover"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="mt-2 h-12 bg-[#4B6BFB] flex items-center justify-center py-3 px-5 rounded-md gap-3 text-base text-white font-medium w-full"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <hr />
                <div className="flex flex-wrap py-8 gap-3 items-center md:flex-row flex-col">
                    <div className="flex flex-shrink-0 items-center gap-3 md:order-1 order-2">
                        <Image src={LogoIcon} className="w-12 h-12" alt="" />
                        <div>
                            <div className="text-xl text-[#141624]">
                                Meta<span className="font-bold">Blog</span>
                            </div>
                            <div className="text-base text-[#3B3C4A] mt-0.5">
                                © JS Template 2023. All Rights Reserved.
                            </div>
                        </div>
                    </div>

                    <ul className="flex gap-8 md:flex-row flex-col order-1 mb-6 md:mb-0 flex-grow justify-end">
                        <li>
                            <a href="/">Terms of Use</a>
                        </li>
                        <li>
                            <a href="/">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/">Cookie Policy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

