"use client"
import { authLogout } from '@/sagas/auth/auth-slice';
import { fetchByCategory } from '@/sagas/post/post-slice';
import debounce from 'lodash.debounce';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from "../../../public/assets/images/logo.png";
import SunnyIcon from "../../../public/assets/images/sunny.png";

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

    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            dispatch(fetchByCategory());
            isInitialMount.current = false;
        }
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

                    {/* <form className="relative flex items-center h-full md:w-30 w-full rounded-md bg-[#F4F4F5]">
                        <input
                            className="w-full h-full outline-none text-sm text-gray-700 pl-4 px-2 pr-2 bg-transparent"
                            type="text"
                            placeholder="Search"
                        />
                        <div className="h-full px-2 flex items-center text-gray-700">
                            <Image src={SearchIcon} className="w-4" alt="search-icon" />
                        </div>
                    </form> */}
                    {
                        user && user.id ?
                            <label className="relative inline-flex items-center cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30px" height="30px"><path d="M 25 0 C 22.800781 0 21 1.800781 21 4 C 21 4.515625 21.101563 5.015625 21.28125 5.46875 C 15.65625 6.929688 12 11.816406 12 18 C 12 25.832031 10.078125 29.398438 8.25 31.40625 C 7.335938 32.410156 6.433594 33.019531 5.65625 33.59375 C 5.265625 33.878906 4.910156 34.164063 4.59375 34.53125 C 4.277344 34.898438 4 35.421875 4 36 C 4 37.375 4.84375 38.542969 6.03125 39.3125 C 7.21875 40.082031 8.777344 40.578125 10.65625 40.96875 C 13.09375 41.472656 16.101563 41.738281 19.40625 41.875 C 19.15625 42.539063 19 43.253906 19 44 C 19 47.300781 21.699219 50 25 50 C 28.300781 50 31 47.300781 31 44 C 31 43.25 30.847656 42.535156 30.59375 41.875 C 33.898438 41.738281 36.90625 41.472656 39.34375 40.96875 C 41.222656 40.578125 42.78125 40.082031 43.96875 39.3125 C 45.15625 38.542969 46 37.375 46 36 C 46 35.421875 45.722656 34.898438 45.40625 34.53125 C 45.089844 34.164063 44.734375 33.878906 44.34375 33.59375 C 43.566406 33.019531 42.664063 32.410156 41.75 31.40625 C 39.921875 29.398438 38 25.832031 38 18 C 38 11.820313 34.335938 6.9375 28.71875 5.46875 C 28.898438 5.015625 29 4.515625 29 4 C 29 1.800781 27.199219 0 25 0 Z M 25 2 C 26.117188 2 27 2.882813 27 4 C 27 5.117188 26.117188 6 25 6 C 23.882813 6 23 5.117188 23 4 C 23 2.882813 23.882813 2 25 2 Z M 27.34375 7.1875 C 32.675781 8.136719 36 12.257813 36 18 C 36 26.167969 38.078125 30.363281 40.25 32.75 C 41.335938 33.941406 42.433594 34.6875 43.15625 35.21875 C 43.515625 35.484375 43.785156 35.707031 43.90625 35.84375 C 44.027344 35.980469 44 35.96875 44 36 C 44 36.625 43.710938 37.082031 42.875 37.625 C 42.039063 38.167969 40.679688 38.671875 38.9375 39.03125 C 35.453125 39.753906 30.492188 40 25 40 C 19.507813 40 14.546875 39.753906 11.0625 39.03125 C 9.320313 38.671875 7.960938 38.167969 7.125 37.625 C 6.289063 37.082031 6 36.625 6 36 C 6 35.96875 5.972656 35.980469 6.09375 35.84375 C 6.214844 35.707031 6.484375 35.484375 6.84375 35.21875 C 7.566406 34.6875 8.664063 33.941406 9.75 32.75 C 11.921875 30.363281 14 26.167969 14 18 C 14 12.261719 17.328125 8.171875 22.65625 7.21875 C 23.320313 7.707031 24.121094 8 25 8 C 25.886719 8 26.679688 7.683594 27.34375 7.1875 Z M 21.5625 41.9375 C 22.683594 41.960938 23.824219 42 25 42 C 26.175781 42 27.316406 41.960938 28.4375 41.9375 C 28.792969 42.539063 29 43.25 29 44 C 29 46.222656 27.222656 48 25 48 C 22.777344 48 21 46.222656 21 44 C 21 43.242188 21.199219 42.539063 21.5625 41.9375 Z" /></svg>
                            </label> : ""
                    }

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
                                <div>
                                </div>
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
                                            {/* <li>
                                                <Link href="/newpost" className="block px-4 py-2 hover:bg-gray-200" onClick={handleOptionClick}>Add new post</Link>
                                            </li> */}
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