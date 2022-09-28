import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Pagination, EffectCoverflow, Zoom } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Head from "next/head";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import NavComponents from "../../components/GeneralComponents/NavComponents";
import FooterComponent from "../../components/ScreenSectionComponents/FooterComponent";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { FiExternalLink } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";

import MapView from "../../components/GeneralComponents/MapView";
import { ThingToKnow } from "../../components/GeneralComponents/Confidencial/ThingToKnow";
import BadgeStyle from "../../components/GeneralComponents/Alert/BadgeStyle";
import { useState } from "react";
import CustomModal from "../../components/GeneralComponents/Modal/CustomModal";
import AuthModalBody from "../../components/GeneralComponents/Modal/AuthModalBody";
import PageRight from "../../components/GeneralComponents/Confidencial/pageRight";
import { property } from "../../utils/types/global.d";

interface Props {
	property: property;
	host: {
		username: string;
		image_url: string;
	};
}

const PropertyReview: NextPage<Props> = ({ property, host }) => {
	const [copiedLink, setCopiedLink] = useState("");
	const [comment, setComment] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const likeCount = property.like.length;
	return (
		<>
			<Head>
				<title>
					{property.title}, {property.zone}
				</title>
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
			<div className="relative top-0 z-20 bg-white 2xl:px-96 xl:px-56 lg:px-36 md:px-20 sm:px-10 px-6 shadow-sm">
				<NavComponents setIsOpen={setIsOpen} />
			</div>
			<div className="h-20 sticky top-0 bg-white z-10 mt-2 2xl:px-96 xl:px-56 lg:px-36 md:px-20 sm:px-10 px-6 font-mono flex items-center justify-between">
				<span className="flex flex-row justify-between">
					<label className="text-4xl">
						{property.title}, {property.zone}
					</label>
				</span>
				<div className="flex flex-row justify-start space-x-3 pt-1 items-center">
					<span>
						<span
							className={
								property.discount == 0
									? "opacity-100"
									: "opacity-90 line-through text-xl"
							}
						>
							{"$"}
							{property.price}
						</span>
					</span>
					<span
						className={
							property.discount == 0
								? "invisible"
								: "w-1 h-1 bg-black rounded-full opacity-90"
						}
					></span>
					<span className={property.discount == 0 ? "invisible" : "visible"}>
						<span className="font-semibold text-3xl">
							{"$"}
							{Math.round(
								property.price - property.price * (property.discount / 100)
							)}
						</span>
						<span className="text-sm">|night</span>
					</span>
				</div>
			</div>
			<div className="bg-white 2xl:px-96 xl:px-56 lg:px-36 md:px-20 sm:px-10 px-6 font-mono mb-5">
				<div className="flex flex-row items-center justify-between">
					<span className="flex border-l-2 hover:border-black pl-2">
						<label className="">{property.subtitle}</label>
					</span>
					<span>
						<label className="p-2 rounded-full hover:bg-slate-100">
							<GrLocation size={24} />
						</label>
						<label
							className="p-2 rounded-full hover:bg-slate-100"
							onClick={() => {
								try {
									setCopiedLink(window.location.href);
									navigator.clipboard.writeText(window.location.href);
									setTimeout(() => {
										setCopiedLink("");
									}, 1000);
								} catch (error) {
									console.log(error);
								}
							}}
						>
							<FiExternalLink size={24} />
						</label>
					</span>
				</div>
				<Swiper
					spaceBetween={0}
					effect={"coverflow"}
					pagination={{
						clickable: true,
					}}
					zoom={true}
					modules={[EffectCoverflow, Pagination, Zoom]}
					className="rounded-2xl justify-center w-full h-[500px] bg-transparent"
					//className="mySwiper   shadow-md shadow-gray-400 h-96 md:w-5/6 lg:w-2/3 lg:h-132   rounded-lg  justify-center"
					// navigation
					// scrollbar={{ draggable: true }}
					// onSlideChange={() => console.log("slide change")}
					// onSwiper={(swiper) => console.log(swiper)}
				>
					{property.images.map((image: string | undefined, i: any) => {
						return (
							<SwiperSlide key={`${image}_${i}`}>
								<img
									src={image}
									className="rounded-2xl aspect-auto w-full h-full"
								/>
							</SwiperSlide>
						);
					})}
				</Swiper>
				<div className="flex flex-row items-center justify-between mt-3">
					<div className="flex flex-row space-x-5">
						<span>
							<FaRegHeart size={24} />
						</span>
						<span>
							<FaRegComment size={24} />
						</span>
					</div>
					<span className="flex flex-1 flex-row mx-2">
						<input
							className="w-full pl-1 focus:outline-none hover:border-b focus:border-b-black focus:border-b"
							type="text"
							name="comment"
							value={comment}
							onChange={(e) => {
								e.preventDefault;
								setComment(e.target.value);
							}}
							placeholder="Write your comment..."
						/>
						<button
							className="p-2 mx-2 rounded-full hover:bg-slate-100"
							type="submit"
							onClick={() => {
								setComment("");
							}}
						>
							<IoMdSend size={24} />
						</button>
					</span>
					<div className="flex flex-row space-x-5">
						<span className="flex flex-row space-x-1">
							<label className="font-semibold">{likeCount}</label>
							<label>{likeCount > 1 ? "likes" : "like"}</label>
						</span>
						<span className="flex flex-row space-x-1">
							<label className="font-semibold">20</label>
							<label>reviews</label>
						</span>
					</div>
				</div>
				<div className="flex flex-col my-3 divide-y space-y-10">
					<div className="flex flex-row">
						<div className="flex flex-col flex-1 space-y-10 divide-y">
							<div className="flex flex-row justify-between items-center">
								<div className="flex flex-col space-y-2">
									<label className=" text-2xl">
										Entire {property.description.property_type.toLowerCase()}{" "}
										hosted by {host.username}
									</label>
									<span className="flex flex-row space-x-5">
										<label className="border-l-2 hover:border-black pl-1">
											{property.description.bedrooms} bedrooms{" "}
										</label>
										<label className="border-l-2 hover:border-black pl-1">
											{property.description.beds} beds{" "}
										</label>
										<label className="border-l-2 hover:border-black pl-1">
											{property.description.bathrooms} bathrooms{" "}
										</label>
									</span>
								</div>
								<img
									className="h-14 w-14 rounded-full bg-slate-200"
									src={host.image_url ? host.image_url : "/img/avatar.png"}
									alt=""
								/>
							</div>
							<p className="text-justify">{property.description.desribe}</p>
						</div>
						<div className="flex w-2/5 h-20 bg-black sticky top-20"></div>
					</div>
					{/* <div className="">
						<MapView properties={[property]} width={width} height={500} />
					</div> */}
					<ThingToKnow />
				</div>
			</div>
			<div className="flex-1 w-full fixed hidden flex-row justify-center items-center bottom-0 h-10 bg-white 2xl:px-96 xl:px-56 lg:px-36 md:px-20 sm:px-10 px-6 shadow sm:hidden md:hidden lg:flex xl:flex 2xl:flex z-10">
				<FooterComponent isReview={true} />
			</div>
			<div className="z-10 fixed bottom-14 right-2">
				<BadgeStyle
					badgeText="COPIED"
					contentText={copiedLink}
					hidden={copiedLink !== "" ? false : true}
				/>
			</div>
		</>
	);
};

export default PropertyReview;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const res = await fetch(
		"http://localhost:3000/api/comresident/property/get/"
	);
	const property = await res.json();
	const paths = property.data.map((element: { _id: string }) => {
		return {
			params: {
				_id: element._id,
			},
		};
	});
	return {
		paths: paths,
		fallback: "blocking",
	};
};
export const getStaticProps: GetStaticProps = async (ctx) => {
	const { params } = ctx;
	const userId = params._id;
	const res = await fetch(
		"http://localhost:3000/api/comresident/property/get/" + userId
	);
	const property = await res.json();
	if (!property.data)
		return {
			notFound: true,
		};

	return {
		props: {
			property: property.data,
			host: {
				username: "sovansela",
				email: "houlasovansela@kit.edu.kh",
			},
		},
		revalidate: 30,
	};
};
