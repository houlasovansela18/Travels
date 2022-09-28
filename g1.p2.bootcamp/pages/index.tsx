import { NextPage, GetServerSideProps } from "next";
import FloatButton from "../components/GeneralComponents/Button/FloatButton";
import BodyComponent from "../components/ScreenSectionComponents/BodyComponent";
import FooterComponent from "../components/ScreenSectionComponents/FooterComponent";
import HeaderComponent from "../components/ScreenSectionComponents/HeaderComponent";
import { useState } from "react";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import Head from "next/head";
import CustomModal from "../components/GeneralComponents/Modal/CustomModal";
import AuthModalBody from "../components/GeneralComponents/Modal/AuthModalBody";
import PageRight from "../components/GeneralComponents/Confidencial/pageRight";

interface Props {
	properties: Object;
	userData: {
		status: number;
		name: string;
		role: number;
		image_url: string;
	};
	authUser: string;
}

const Home: NextPage<Props> = ({ properties, userData, authUser }) => {
	const [propertyData, setPropertyData] = useState(properties);
	const [isMapView, setIsMapView] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Head>
				<title>Travels</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<CustomModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title="Log in or Sign up"
				BodyComponent={<AuthModalBody />}
				FooterComponent={
					<div className="flex w-full justify-center text-xs">
						<PageRight />
					</div>
				}
			/>
			<HeaderComponent
				userData={userData}
				setPropertyData={setPropertyData}
				setIsOpen={setIsOpen}
			/>
			<BodyComponent
				isMapView={isMapView}
				properties={propertyData}
				authUser={authUser}
			/>
			<FloatButton isMapView={isMapView} setIsMapView={setIsMapView} />
			{!isMapView ? (
				<div className="w-full flex-1 fixed hidden flex-row justify-center items-center bottom-0 h-10 bg-white px-6 sm:px-6 md:px-10 lg:px-10 xl:px-20 2xl:px-40 shadow sm:hidden md:hidden lg:flex xl:flex 2xl:flex z-10">
					<FooterComponent isReview={false} />
				</div>
			) : null}
		</>
	);
};
export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	let authUser = getCookie("authuser", { req, res });
	let userData;
	authUser = authUser?.toString();
	if (authUser) {
		const token = jwt.verify(authUser, `${process.env.SECRET}`);
		userData = {
			_id: token._id,
			role: token.role,
			name: token.name,
			image_url: token.profile,
			status: token.status || null,
		};
	}
	const result = await fetch(
		"http://localhost:3000/api/comresident/property/get"
	); // your fetch function here
	const properties = await result.json();
	return {
		props: {
			properties: properties.data,
			userData: userData || null,
			authUser: authUser || null,
		},
	};
};
