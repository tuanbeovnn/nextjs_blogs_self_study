"use client";

import Logo from "@/components/Logo/Logo";

export const Footer = () => {
  return (
    <footer className="border-t-borderLight dark:border-t-borderDark border-t">
      <div className="max-w-7xl mx-auto md:px-8 px-4">
        <div className="flex flex-wrap py-8 gap-3 items-center md:flex-row flex-col">
          <Logo kind={"footer"} />

          <ul className="flex dark:text-white text-main gap-8 md:flex-row flex-col order-1 mb-6 md:mb-0 flex-grow justify-end">
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
