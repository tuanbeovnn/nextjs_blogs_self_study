"use client"
import Image from 'next/image';
import LogoIcon from "../../app/assets/images/logo-notext.png";
import EmailIcon from "../../app/assets/images/mail.png";
export const Footer = () => {
    return (
        <footer className="bg-[#F6F6F7] pt-16">
            <div className="max-w-7xl mx-auto md:px-8 px-4">
              
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

