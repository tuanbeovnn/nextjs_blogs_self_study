"use client"
import RequiredAuthPage from "@/components/Auth";
const Profile = () => {

    return (
        <RequiredAuthPage>
            <div className="max-w-7xl mx-auto md:px-8 px-4">
                <div className="flex flex-col gap-y-5 max-w-[845px] mx-auto mt-5 mb-10">
                    <div className="border border-solid border-gray-300 rounded-lg flex item-center justify-center p-5">
                        <div className="w-[180px] h-[180px] rounded-full overflow-hidden shadow-md">
                            <img
                                className="w-full h-full object-cover"
                                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="border border-solid border-gray-300 rounded-lg flex flex-col gap-y-6 item-center p-5">
                        <h4 className="font-medium capitalize">User info</h4>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                            <div className="md:col-span-1">
                                <label className="text-[#999]" htmlFor="location">
                                    Location:
                                </label>
                            </div>
                            <div className="md:col-span-4">
                                <select
                                    className="w-full border border-solid border-gray-300 py-2 px-3 rounded-md outline-sky-600"
                                    name="location"
                                    id="location"
                                >
                                    <option value="Viet Nam">Select country</option>
                                    <option value="Viet Nam">Viet Nam</option>
                                    <option value="USA">USA</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Germany">Germany</option>
                                    <option value="China">China</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Australia">Australia</option>
                                    <option value="UK">UK</option>
                                    <option value="France">France</option>
                                    <option value="Spain">Spain</option>
                                    <option value="Russia">Russia</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                            <div className="md:col-span-1">
                                <label className="text-[#999]" htmlFor="company">
                                    Company name:
                                </label>
                            </div>
                            <div className="md:col-span-4">
                                <input
                                    className="w-full border border-solid border-gray-300 py-2 px-3 rounded-md outline-sky-600"
                                    type="text"
                                    name="company"
                                    id="company"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="border border-solid border-gray-300 rounded-lg flex flex-col gap-y-6 item-center p-5">
                        <h4 className="font-medium capitalize">Contact info</h4>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                            <div className="md:col-span-1">
                                <label className="text-[#999]" htmlFor="workNumber">
                                    Work number
                                </label>
                            </div>
                            <div className="md:col-span-4">
                                <input
                                    className="w-full border border-solid border-gray-300 py-2 px-3 rounded-md outline-sky-600"
                                    type="text"
                                    name="workNumber"
                                    id="workNumber"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                            <div className="md:col-span-1">
                                <label className="text-[#999]" htmlFor="mobileNumber">
                                    Mobile Number:
                                </label>
                            </div>
                            <div className="md:col-span-4">
                                <input
                                    className="w-full border border-solid border-gray-300 py-2 px-3 rounded-md outline-sky-600"
                                    type="text"
                                    name="mobileNumber"
                                    id="mobileNumber"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                            <div className="md:col-span-1">
                                <label className="text-[#999]" htmlFor="emailAddress">
                                    Email address:
                                </label>
                            </div>
                            <div className="md:col-span-4">
                                <input
                                    className="w-full border border-solid border-gray-300 py-2 px-3 rounded-md outline-sky-600"
                                    type="text"
                                    name="emailAddress"
                                    id="emailAddress"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-3">
                            <div className="md:col-span-1">
                                <label className="text-[#999]" htmlFor="workAddress">
                                    Work address:
                                </label>
                            </div>
                            <div className="md:col-span-4">
                                <textarea
                                    className="w-full h-28 border border-solid border-gray-300 p-3 rounded-md outline-sky-600"
                                    name="workAddress"
                                    id="workAddress"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="border border-solid border-gray-300 rounded-lg flex flex-col gap-y-6 item-center p-5">
                        <h4 className="font-medium capitalize">Security</h4>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                            <div className="md:col-span-1">
                                <label className="text-[#999]" htmlFor="currentPass">
                                    Current password:
                                </label>
                            </div>
                            <div className="md:col-span-4">
                                <input
                                    className="w-full border border-solid border-gray-300 py-2 px-3 rounded-md outline-sky-600"
                                    type="text"
                                    name="currentPass"
                                    id="currentPass"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                            <div className="md:col-span-1">
                                <label className="text-[#999]" htmlFor="newPassword">
                                    New password:
                                </label>
                            </div>
                            <div className="md:col-span-4">
                                <input
                                    className="w-full border border-solid border-gray-300 py-2 px-3 rounded-md outline-sky-600"
                                    type="text"
                                    name="newPassword"
                                    id="newPassword"
                                />
                            </div>
                        </div>
                        <div className="ml-auto flex gap-3">
                            <button className="cursor-pointer bg-blue-500 hover:bg-blue-700 transition-colors  text-white px-[24px] py-3 rounded-md">
                                Save
                            </button>
                            <button className="cursor-pointer bg-blue-500 hover:bg-blue-700 transition-colors  text-white px-[24px] py-3 rounded-md">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </RequiredAuthPage>

    );
};

export default Profile;
