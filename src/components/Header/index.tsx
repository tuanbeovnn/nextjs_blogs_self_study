"use client"
import { authLogout } from '@/sagas/auth/auth-slice';
import { fetchByCategory } from '@/sagas/post/post-slice';
import debounce from 'lodash.debounce';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from "../../app/assets/images/logo.png";
import SearchIcon from "../../app/assets/images/search.png";
import SunnyIcon from "../../app/assets/images/sunny.png";

export const Header = () => {
    const dispatch = useDispatch();
    const [isDark, setIsDark] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { user, } = useSelector((state: any) => state.auth);

    const { listCatagory, loading } = useSelector((state: any) => state.post);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const avatarRef = useRef<HTMLImageElement>(null);

    const toggleDropdown = useCallback(() => {
        setDropdownVisible(prev => !prev);
    }, []);

    const handleOutsideClick = useCallback((event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
            setDropdownVisible(false);
        }
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedHandleOutsideClick = useCallback(debounce(handleOutsideClick, 100), [handleOutsideClick]);

    const handleOptionClick = useCallback(() => {
        setDropdownVisible(false);
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", debouncedHandleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", debouncedHandleOutsideClick);
            debouncedHandleOutsideClick.cancel(); // Cancel any pending debounced calls on cleanup
        };
    }, [debouncedHandleOutsideClick]);

    useEffect(() => {
        if (user && user.id) {
            setDropdownVisible(false); // Hide dropdown on successful login
        }
    }, [user]);

    useEffect(() => {
        dispatch(fetchByCategory());
    }, [dispatch]);

    return (
        <header className="bg-white border-gray-200">
            <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto md:px-8 px-4 md:py-8 py-2.5 gap-4">
                <Link href="/" className="flex items-center">
                    <Image src={Logo} className="md:h-9 h-6" alt="Logo" />
                </Link>
                <div className="items-center justify-between hidden w-full text-sm min-[920px]:flex min-[920px]:w-auto">
                    <ul className="flex flex-row gap-10">
                        <li>
                            <Link
                                href="/"
                                className="inline-block text-[#3B3C4A] hover:text-blue-600 text-base"
                            >
                                Home
                            </Link>
                        </li>
                        {listCatagory.map((category: any) => (
                            <li key={category?.id}>
                                <Link
                                    href={`/blog/category/${category?.name}`}
                                    className="inline-block text-[#3B3C4A] hover:text-blue-600 text-base"
                                >
                                    {category?.name}
                                </Link>
                            </li>
                        ))}

                    </ul>
                </div>
                <div className="hidden md:flex items-center gap-x-3 flex-shrink-0 h-[36px]">
                    <form className="relative flex items-center h-full md:w-30 w-full rounded-md bg-[#F4F4F5]">
                        <input
                            className="w-full h-full outline-none text-sm text-gray-700 pl-4 px-2 pr-2 bg-transparent"
                            type="text"
                            placeholder="Search"
                        />
                        <div className="h-full px-2 flex items-center text-gray-700">
                            <Image src={SearchIcon} className="w-4" alt="search-icon" />
                        </div>
                    </form>
                    <div className="flex justify-center space-x-2 h-full">
                        {user && user.id ? (
                            <div className="relative flex items-center justify-center">
                                <img
                                    ref={avatarRef}
                                    className="w-10 h-10 min-w-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer"
                                    src="https://i.pravatar.cc/150"
                                    alt="Bordered avatar"
                                    onClick={toggleDropdown}
                                />
                                {dropdownVisible && (
                                    <div ref={dropdownRef} id="dropdownInformation" className="absolute top-full mt-4 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                        <div className="px-4 py-3 text-sm text-gray-900">
                                            <div>{user?.name}</div>
                                            <div className="font-medium truncate">{user?.email}</div>
                                        </div>
                                        <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownInformationButton">
                                            <li>
                                                <Link href="/" className="block px-4 py-2 hover:bg-gray-200" onClick={handleOptionClick}>Dashboard</Link>
                                            </li>
                                            <li>
                                                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-200" onClick={handleOptionClick}>Profile</Link>
                                            </li>
                                            <li>
                                                <Link href="/" className="block px-4 py-2 hover:bg-gray-200" onClick={handleOptionClick}>Earnings</Link>
                                            </li>
                                        </ul>
                                        <div className="py-2">
                                            <a href="/" onClick={() => { dispatch(authLogout()); handleOptionClick(); }}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">Sign out</a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex justify-center space-x-2 h-full">
                                <Link
                                    href="/login"
                                    className="flex items-center justify-center px-5 text-blue-500 bg-white border border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                                >
                                    <button>Login</button>
                                </Link>
                                <Link
                                    href="/register"
                                    className="flex items-center justify-center px-5 text-blue-500 bg-white border border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                                >
                                    <button>Register</button>
                                </Link>

                            </div>

                        )}
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isDark}
                            onChange={(e) => setIsDark(e.target.checked)}
                            className="sr-only"
                        />
                        <div
                            className={`w-12 inline-flex items-center h-7 p-0.5 rounded-full bg-[#E8E8EA] ${isDark && "bg-blue-600"
                                }`}
                        >
                            <div
                                className={`${isDark && "translate-x-5"
                                    } h-6 w-6 bg-white rounded-full transition-all shadow flex items-center justify-center`}
                            >
                                <Image src={SunnyIcon} className="w-4" alt="toggle dark mode" />
                            </div>
                        </div>
                    </label>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    type="button"
                    className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden"
                >
                    <svg
                        aria-hidden="true"
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                <div
                    className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-white -translate-x-full  ${isOpen && "translate-x-0"
                        }`}
                >
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center "
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                </div>
                {isOpen && (
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed z-20 bg-black/30 h-screen w-full left-0 top-0"
                    ></div>
                )}
            </div>
        </header>
    );
};