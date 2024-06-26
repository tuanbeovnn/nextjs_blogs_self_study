"use client";
import React, {useEffect} from "react";
import {useForm, Resolver} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {authRegister} from "@/sagas/auth/auth-slice";
import InputHook from "@/components/Input/InputHook";
import CheckBoxHook from "@/components/checkbox/CheckBoxHook";
// Assuming this is another custom component

type FormValues = {
	fullname: string;
	email: string;
	password: string;
	confirm_password: string;
	terms_and_conditions: boolean;
};

// Define the schema
const schema = yup.object().shape({
	fullname: yup
		.string()
		.required("Full Name is required")
		.max(50, "Full Name must be at most 50 characters"),
	email: yup.string().email().required("Email is required"),
	password: yup.string().required("Password is required"),
	confirm_password: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords must match")
		.required("Confirm Password is required"),
	terms_and_conditions: yup
		.boolean()
		.required()
		.oneOf([true], "Please accept the terms and conditions"),
});

function Register() {
	const resolver: Resolver<FormValues> = yupResolver(schema);
	const {
		handleSubmit,
		formState: {errors, isSubmitting, isValid},
		reset,
		setFocus,
		control,
	} = useForm<FormValues>({resolver, mode: "onChange"});

	const dispatch = useDispatch();
	const onSubmit = async (values: FormValues) => {
		try {
			const data = {
				name: values.fullname,
				email: values.email,
				password: values.password,
			};
			if (isValid) {
				dispatch(authRegister(data));
				reset({
					fullname: "",
					email: "",
					password: "",
					confirm_password: "",
					terms_and_conditions: false,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setFocus("fullname");
	}, [setFocus]);

	return (
		<div className="max-w-7xl mx-auto md:px-8 px-4 custom-min-height">
			<div className="max-w-md mx-auto my-6 w-full bg-white dark:bg-heading rounded-lg shadow-inner p-6">
				<h2 className="text-2xl font-bold text-center text-heading dark:text-white mb-4">
					Register
				</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<InputHook
						control={control}
						name="fullname"
						placeholder="Your Full Name"
						id="fullname"
						type="text"
						label="Full Name"
					/>
					<InputHook
						control={control}
						name="email"
						placeholder="you@example.com"
						id="email"
						type="email"
						label="Email"
					/>
					<InputHook
						control={control}
						name="password"
						placeholder="••••••••"
						id="password"
						type="password"
						label="Password"
					/>
					<InputHook
						control={control}
						name="confirm_password"
						placeholder="••••••••"
						id="confirm_password"
						type="password"
						label="Confirm Password"
					/>
					<CheckBoxHook
						control={control}
						text="I agree to the terms and conditions"
						name="terms_and_conditions"
						id="terms_and_conditions"
					/>
					<button
						type="submit"
						className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
						onClick={() => console.log("clicked")}
					>
						{isSubmitting ? (
							<div
								className="mx-auto w-5 h-5 border-2 border-white border-t-2 border-t-transparent rounded-full animate-spin"></div>
						) : (
							"Register Now"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Register;
