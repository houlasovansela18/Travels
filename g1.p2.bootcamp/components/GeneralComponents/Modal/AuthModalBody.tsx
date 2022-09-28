import { NextPage } from "next";
import Link from "next/link";
import CustomBorder from "../Boder/CustomBorder";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

interface Props {}

const AuthModalBody: NextPage<Props> = ({}) => {
	const [eyeOff, setEyeOff] = useState(true);

	return (
		<div className="flex flex-col justify-evenly w-full">
			<form
				action="/api/comresident/signin"
				method="post"
				className="space-y-7"
			>
				<div className="flex flex-col w-auto mx-5 space-y-3">
					<div className="flex flex-col">
						<label className="font-semibold">Username*</label>
						<input
							className="p-2 bg-slate-100 rounded-md focus:outline-none"
							placeholder="username"
							name="username"
							id="username"
							type="text"
							// onChange={() => setUsername()}
							// value={username}
							minLength={6}
							maxLength={20}
							required
						/>
					</div>
					<div>
						<label className="font-semibold">Password*</label>
						<div className="flex flex-row items-center space-x-1">
							<input
								className="p-2 bg-slate-100 flex-1 rounded-md focus:outline-none"
								placeholder="password"
								name="password"
								id="password"
								type={eyeOff ? "password" : "text"}
								// onChange={() => setPassword()}
								// value={password}
								pattern="[A-Za-z0-9]{8,16}"
								minLength={8}
								maxLength={20}
								required
							/>
							<span onClick={() => setEyeOff(!eyeOff)}>
								{eyeOff ? (
									<RiEyeCloseLine size={24} />
								) : (
									<RiEyeLine size={24} />
								)}
							</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col w-auto mx-5  space-y-2 font-semibold">
					<CustomBorder
						component={
							<button
								className="flex w-full justify-center rounded-3xl py-2 bg-white text-black"
								type="submit"
							>
								<span>Log in</span>
							</button>
						}
					/>
					<CustomBorder
						component={
							<button
								className="flex w-full justify-center rounded-3xl py-2 bg-transparent text-white"
								type="submit"
							>
								<span>Sign up</span>
							</button>
						}
					/>
				</div>
			</form>
			<div className="flex justify-center">
				<label>else with</label>
			</div>
			<div className="flex flex-row mx-5 justify-around font-semibold">
				<Link href="/api/comresident/user/google">
					<a className="flex flex-row text-black space-x-2 p-2 hover:bg-slate-200 rounded-full opacity-70 hover:opacity-100">
						<FaGoogle size={24} /> <span>Google</span>
					</a>
				</Link>
				<Link href="/api/comresident/user/facebook">
					<a className="flex flex-row text-black space-x-2 p-2 hover:bg-slate-200 rounded-full opacity-70 hover:opacity-100">
						<FaFacebook size={24} />
						<span>Facebook</span>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default AuthModalBody;
