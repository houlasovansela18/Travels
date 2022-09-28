import Link from "next/link";
import FooterComponent from "../components/ScreenSectionComponents/FooterComponent";
import { discord } from "../utils/utils";

const Support = () => {
	const supp = [
		{ name: "Help Center", dir: "#" },
		{ name: "Air Cover", dir: "#" },
		{ name: "Safty Infomation", dir: "#" },
		{ name: "Concellation Options", dir: "#" },
	];

	const hosting = [
		{ name: "Try Hosting", dir: "#" },
		{ name: "AirCover for Hosts", dir: "#" },
		{ name: "Explore Hosting Resources", dir: "#" },
		{ name: "How To Host Responsibly", dir: "#" },
	];

	const ourSite = [
		{ name: "Newsroom", dir: "#" },
		{ name: "Learn About New Features", dir: "#" },
		{ name: "Letter from Our Founders", dir: "#" },
		{ name: "Investors", dir: "#" },
	];

	const community = [
		{ name: "site.org:disaster", dir: "#" },
		{ name: "support.org", dir: "#" },
		{ name: "discord.org", dir: discord },
		{ name: "help:support.org", dir: "#" },
	];
	return (
		<div className="font-mono">
			<div className="sticky top-0 bg-white px-20 sm:px-28 md:px-40 lg:px-72 xl:px-80 2xl:px-96 h-20 flex flex-1 items-center">
				<div className="text-3xl underline underline-offset-8">
					Supports and Resources
				</div>
			</div>
			<div className="text-justify outline outline-1 outline-gray-400  px-20 sm:px-28 md:px-40 lg:px-72 xl:px-80 2xl:px-96 md:grid md:grid-cols-2 xl:flex  xl:justify-between  items-baseline  ">
				<div className=" bg-gray-100 px-10 xl:mx-12 xl:rounded-lg xl:py-8  py-4  flex flex-col ">
					<p className=" font-semibold">Support</p>
					{supp.map((key) => {
						return (
							<Link href={key.dir} key={"support_" + key}>
								<a className=" hover:text-emerald-600 my-2">{key.name}</a>
							</Link>
						);
					})}
				</div>
				<div className=" bg-gray-100 my-4   px-10 xl:mx-12 xl:rounded-lg xl:py-8  py-4  flex flex-col">
					<p className=" font-semibold">Hosting</p>
					{hosting.map((key) => {
						return (
							<Link href={key.dir} key={"support_" + key}>
								<a className=" hover:text-emerald-600 my-2">{key.name}</a>
							</Link>
						);
					})}
				</div>
				<div className=" bg-gray-100 my-4   px-10 xl:mx-12 xl:rounded-lg xl:py-8  py-4 flex flex-col  ">
					<p className=" font-semibold">Our Site</p>
					{ourSite.map((key) => {
						return (
							<Link href={key.dir} key={"support_" + key}>
								<a className=" hover:text-emerald-600 my-2">{key.name}</a>
							</Link>
						);
					})}
				</div>
				<div className=" bg-gray-100 my-4   px-10 xl:mx-12 xl:rounded-lg xl:py-8  py-4 flex flex-col  ">
					<p className=" font-semibold">Community</p>
					{community.map((key) => {
						return (
							<Link href={key.dir} key={"support_" + key}>
								<a className=" hover:text-emerald-600 my-2">{key.name}</a>
							</Link>
						);
					})}
				</div>
			</div>
			<div className="w-full flex-1 fixed hidden flex-row justify-center items-center bottom-0 h-10 bg-white px-20 sm:px-28 md:px-40 lg:px-72 xl:px-80 2xl:px-96 shadow sm:hidden md:hidden lg:flex xl:flex 2xl:flex z-10">
				<FooterComponent isReview={false} />
			</div>
		</div>
	);
};
export default Support;
