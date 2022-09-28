import { NextPage } from "next";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	EffectCoverflow,
	Zoom,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import { useState } from "react";
import Link from "next/link";
import { property } from "../../../utils/types/global.d";

interface Props {
	data: property;
	authUser: String;
}

const PostCard: NextPage<Props> = ({ data, authUser }) => {
	const [isLiked, setIsLiked] = useState(false);
	const [likes, setLikes] = useState(data.like.length);

	const handleLike = () => {
		fetch("http://localhost:3000/api/comresident/like/" + data._id, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + authUser?.toString(),
			},
		}).catch((error) => {
			console.log(error);
		});
		if (isLiked) {
			setLikes(likes - 1);
		} else {
			setLikes(likes + 1);
		}

		setIsLiked(!isLiked);
	};
	return data ? (
		<div
			className="bg-white rounded-2xl h-auto hover:text-black"
			onDoubleClick={handleLike}
		>
			<div className="relative rounded-2xl w-full space-y-2">
				<div className="justify-end absolute z-10 right-4 top-4">
					<button className="bg-transparent" onClick={handleLike}>
						{isLiked ? (
							<FaHeart className="text-2xl text-white" />
						) : (
							<FaRegHeart className="text-2xl text-white " />
						)}
					</button>
				</div>
				<Link href={"/property/" + data._id} target="_blank">
					<a>
						<Swiper
							modules={[
								Navigation,
								Pagination,
								Scrollbar,
								A11y,
								EffectCoverflow,
								Zoom,
							]}
							pagination={{ clickable: true }}
							spaceBetween={0}
							slidesPerView={1}
							effect="coverflow"
							zoom={true}
							// navigation
							// scrollbar={{ draggable: true }}
							// onSlideChange={() => console.log("slide change")}
							// onSwiper={(swiper) => console.log(swiper)}
						>
							{data.images.map((image, i) => {
								return (
									<SwiperSlide key={`${image}_${i}`}>
										<img
											src={image}
											className="rounded-2xl aspect-square w-full"
										/>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</a>
				</Link>
				<div>
					<div className="flex flex-row items-start justify-between text-base font-mono space-x-2">
						<div className="flex flex-col justify-between">
							<span className="font-semibold opacity-95">
								{data.title},{data.zone}
							</span>
							<span className="text-sm opacity-90 border-l-2 hover:border-black pl-1 ml-2 hover:opacity-100">
								{data.subtitle}
							</span>
							<span className="text-sm opacity-90 border-l-2 hover:border-black pl-1 ml-2 hover:opacity-100">
								{data.category}
							</span>
							<div className="flex flex-row justify-start space-x-1 pt-1 items-center">
								<span>
									<span
										className={
											data.discount == 0
												? "opacity-100"
												: " opacity-90 line-through text-sm"
										}
									>
										{"$"}
										{data.price}
									</span>
								</span>
								<span
									className={
										data.discount == 0
											? "invisible"
											: "w-1 h-1 bg-black rounded-full opacity-90"
									}
								></span>
								<span className={data.discount == 0 ? "invisible" : "visible"}>
									<span className="font-semibold text-lg">
										{"$"}
										{Math.round(
											data.price - data.price * (data.discount / 100)
										)}
									</span>
									<span className="text-xs">|night</span>
								</span>
							</div>
						</div>
						<div className="flex flex-col justify-start items-center">
							<span className="font-semibold text-lg">{likes}</span>
							<span className="text-xs">{likes > 1 ? "likes" : "like"}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : null;
};

export default PostCard;
