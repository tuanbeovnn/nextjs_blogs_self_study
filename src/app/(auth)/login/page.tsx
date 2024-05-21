"use client";
import InputHook from "@/components/Input/InputHook";
import { authLogin } from '@/sagas/auth/auth-slice';
import { yupResolver } from "@hookform/resolvers/yup";
import { redirect } from 'next/navigation';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
// Define your FormValues type
type FormValues = {
    email: string;
    password: string;
};
// Define the schema
const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
});

function Login() {

    // Explicitly define the resolver type
    const { handleSubmit, formState: { errors, isSubmitting, isValid, isDirty }, reset, control } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const randomString = Math.random().toString(20).substring(2, 14) + Math.random().toString(20).substring(2, 14);
    const deviceID = `${userAgent}-${platform}-${randomString}`;
    const { user, isAuthenticated } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const onSubmit = (values: FormValues) => {
        if (isValid) {
            const data = {
                email: values.email,
                password: values.password,
                deviceInfo: {
                    deviceId: deviceID,
                    deviceType: platform
                }
            }
            dispatch(authLogin(data));
            // then reset form
            reset({
                email: "",
                password: "",
            })
        }
    }

    if (user) {
        return redirect("/");
    }

    return (
        <div className="max-w-7xl mx-auto md:px-8 px-4">
            <div className="max-w-md mx-auto my-6 w-full bg-white rounded-lg shadow-inner p-6">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
                    Login
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputHook control={control} name="email" placeholder="you@example.com" id="email" type="email" label="Email" />
                    <InputHook control={control} name="password" placeholder="•••••••••••••" id="password" type="password" label="Password" />
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        {isSubmitting ? <div className="mx-auto w-5 h-5 border-2 border-white border-t-2 border-t-transparent rounded-full animate-spin"></div> : "Login Now"}
                    </button>
                </form>
                {/* "or" between two buttons */}
                <div className="flex items-center justify-center mt-4">
                    <div className="border-b w-1/5"></div>
                    <div className="mx-3 text-gray-600 font-medium">or</div>
                    <div className="border-b w-1/5"></div>
                </div>
                <button
                    // onClick={handleGoogleLogin}
                    className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-blue-500 bg-white border border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded shadow-md hover:shadow-lg transition duration-300 ease-in-out mt-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px" className="mr-2">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                    Login with Google
                </button>
            </div>
        </div>
    )
}

export default Login