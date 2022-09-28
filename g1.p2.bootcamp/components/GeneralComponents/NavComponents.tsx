import { NextPage } from "next";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
	FaSearch,
	FaSignInAlt,
	FaSignOutAlt,
	FaUserPlus,
} from "react-icons/fa";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";
function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}
interface Props {
	userData?: {
		status: number;
		name: string;
		role: number;
		image_url: string;
	};
	setIsOpen: any;
}

const NavComponents: NextPage<Props> = ({ userData, setIsOpen }) => {
	const router = useRouter();
	const authUser = getCookie("authuser");
	return (
		<>
			<div className="h-20 flex flex-row items-center justify-center  text-base font-mono font-medium sm:justify-center md:justify-center lg:justify-between xl:justify-between 2xl:justify-between">
				<div className="flex-1 justify-start hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex">
					<img
						className="h-10 w-auto hover:cursor-pointer"
						src="/favicon_io/android-chrome-512x512.png"
						alt="Your Company"
						onClick={() => router.push("/")}
					/>
				</div>
				<div className="flex flex-1 justify-center items-center">
					<div className="flex items-center w-full box-decoration-slice bg-gradient-to-r hover:bg-gradient-to-tr from-indigo-500 to-teal-500 text-white shadow rounded-full border-1 border-white">
						<button>
							<span className="flex px-3 transition ease-in-out delay-100 hover:scale-110 duration-150">
								<FaSearch />
							</span>
						</button>
						<input
							type="search"
							name="search"
							placeholder={"Search..."}
							className="bg-transparent text-white rounded-r-full px-2 py-[10px] placeholder-white w-full focus:outline-none"
						/>
					</div>
				</div>
				<div className="flex-1 justify-end items-center flex-row space-x-6 hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex">
					{userData ? (
						userData.status == 1 ? (
							<button
								className="text-white transition ease-in-out delay-50 hover:scale-105 duration-100"
								onClick={() => {
									fetch(
										"http://localhost:3000/api/comresident/user/requestpartner",
										{
											method: "POST",
											headers: {
												Authorization: "Bearer " + authUser?.toString(),
											},
										}
									)
										.then(() => router.push("/"))
										.catch((error) => {
											console.log(error);
										});
								}}
							>
								<label className="shadow px-3 py-2 rounded-full bg-gradient-to-r hover:bg-gradient-to-tr from-indigo-500 via-white-500 to-teal-500 border-1 border-white">
									Become a Host
								</label>
							</button>
						) : (
							<button
								className="text-white transition ease-in-out delay-50 hover:scale-105 duration-100"
								onClick={() => {
									fetch(
										"http://localhost:3000/api/comresident/user/requestpartner",
										{
											method: "DELETE",
											headers: {
												Authorization: "Bearer " + authUser?.toString(),
											},
										}
									)
										.then(() => router.push("/"))
										.catch((error) => {
											console.log(error);
										});
								}}
							>
								<label className="shadow px-3 py-2 rounded-full bg-gradient-to-r hover:bg-gradient-to-tr from-indigo-500 via-white-500 to-teal-500 border-1 border-white">
									Approving
								</label>
							</button>
						)
					) : null}
					{/* Profile dropdown */}
					<Menu>
						<Menu.Button className="rounded-full hover:shadow">
							<div className="bg-gradient-to-r from-indigo-500 via-white-500 to-teal-500 hover:bg-gradient-to-bl px-[2px] py-[2px] text-base font-mono rounded-full">
								<div className="bg-white h-full w-full rounded-full">
									<img
										className="h-10 w-10 rounded-full"
										src={userData ? userData.image_url : "/img/avatar.png"}
										alt=""
									/>
								</div>
							</div>
						</Menu.Button>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute top-16 z-10 w-56 origin-bottom-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								{userData ? (
									<Menu.Item>
										<span className="block px-4 py-2 text-base text-black bg-gray-100">
											{userData.name}
										</span>
									</Menu.Item>
								) : null}
								{!userData ? (
									<>
										<Menu.Item>
											{({ active }) => (
												<div
													className={classNames(
														active ? "bg-gray-100" : "",
														"px-4 py-2 text-sm text-gray-700 hover:cursor-pointer flex flex-row items-center justify-between"
													)}
													onClick={() => {
														setIsOpen(true);
													}}
												>
													<label>Register</label>
													<FaUserPlus />
												</div>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<div
													className={classNames(
														active ? "bg-gray-100" : "",
														"px-4 py-2 text-sm text-gray-700 hover:cursor-pointer flex flex-row items-center justify-between"
													)}
													onClick={() => {
														setIsOpen(true);
													}}
												>
													<label>Log in</label>
													<FaSignInAlt />
												</div>
											)}
										</Menu.Item>
									</>
								) : null}
								{userData ? (
									<>
										<div className="border-b-2"></div>
										{![3, 11].includes(userData.role) ? (
											<Menu.Item>
												{({ active }) => (
													<Link
														href={
															userData.role == 10
																? "/customer-partner"
																: "/dashboard"
														}
													>
														<a
															className={classNames(
																active ? "bg-gray-100 text-gray-700" : "",
																"px-4 py-2 text-sm text-gray-700 hover:cursor-pointer flex flex-row items-center justify-between"
															)}
														>
															Go to Dashboard
														</a>
													</Link>
												)}
											</Menu.Item>
										) : null}
										<Menu.Item>
											{({ active }) => (
												<div
													className={classNames(
														active ? "bg-gray-100" : "",
														"px-4 py-2 text-sm text-gray-700 hover:cursor-pointer flex flex-row items-center justify-between"
													)}
													onClick={() => {}}
												>
													<label>Host your home</label>
												</div>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<div
													className={classNames(
														active ? "bg-gray-100" : "",
														"px-4 py-2 text-sm text-gray-700 hover:cursor-pointer flex flex-row items-center justify-between"
													)}
													onClick={() => {}}
												>
													<label>Host an experience</label>
												</div>
											)}
										</Menu.Item>
										<div className="border-b-2"></div>
										<Menu.Item>
											{({ active }) => (
												<div
													className={classNames(
														active ? "bg-red-100" : "",
														"px-4 py-2 text-sm text-gray-700 hover:cursor-pointer flex flex-row items-center justify-between"
													)}
													onClick={() => {
														fetch(
															"http://localhost:3000/api/comresident/user/signout",
															{
																method: "PATCH",
																headers: {
																	Authorization:
																		"Bearer " + authUser?.toString(),
																},
															}
														)
															.then(() => router.push("/"))
															.catch((error) => {
																console.log(error);
															});
													}}
												>
													<label>Sign out</label>
													<FaSignOutAlt />
												</div>
											)}
										</Menu.Item>
									</>
								) : null}
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			</div>
		</>
	);
};

export default NavComponents;
