import React from "react";
import {
	AiFillClockCircle,
	AiFillSafetyCertificate,
	AiFillQuestionCircle,
} from "react-icons/ai";
import { FaSmokingBan, FaChevronRight } from "react-icons/fa";
import { TbBallonOff, TbAlarm } from "react-icons/tb";
import { MdPets } from "react-icons/md";
import Link from "next/link";
export const ThingToKnow = () => {
	return (
		<div className="space-y-2">
			<label className="text-2xl">Things to know</label>
			<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 space-y-2 justify-center">
				<div className="flex flex-1 flex-col space-y-2">
					<label className="font-semibold">House Rules</label>
					<span className="flex flex-col">
						<label className="flex flex-row items-center space-x-2">
							<AiFillClockCircle />
							<label>Check in: 3:00 PM</label>
						</label>
						<label className="flex flex-row items-center space-x-2">
							<AiFillClockCircle />
							<label>Check out: 12:00 PM</label>
						</label>
						<label className="flex flex-row items-center space-x-2">
							<MdPets />
							<label>Pets are allowed</label>
						</label>
						<label className="flex flex-row items-center space-x-2">
							<TbBallonOff />
							<label>No parties or events</label>
						</label>
						<label className="flex flex-row items-center space-x-2">
							<FaSmokingBan />
							<label>No smoking</label>
						</label>
						<Link href="#">
							<a className="underline hover:font-semibold hover:text-black flex flex-row items-center">
								<label>Show more</label>
								<FaChevronRight />
							</a>
						</Link>
					</span>
				</div>
				<div className="flex flex-1 flex-col space-y-2">
					<label className="font-semibold">Heath & Safety</label>
					<span className="flex flex-col">
						<label className="flex flex-row items-center space-x-2">
							<AiFillSafetyCertificate />
							<label>The COVID-19 safety practices apply</label>
						</label>
						<label className="flex flex-row items-center space-x-2">
							<AiFillQuestionCircle />
							<label>Carbon monoxide alarm not reported</label>
						</label>
						<label className="flex flex-row items-center space-x-2">
							<TbAlarm />
							<label>Smoke Alarm</label>
						</label>
						<Link href="#">
							<a className="underline hover:font-semibold hover:text-black flex flex-row items-center">
								<label>Show more</label>
								<FaChevronRight />
							</a>
						</Link>
					</span>
				</div>
				<div className="flex flex-1 flex-col space-y-2">
					<span className="flex flex-row justify-between">
						<label className="font-semibold">Cancellation Policy</label>
						<label className="opacity-70 border-l-2 pl-2 hover:border-black">
							Coming soon!
						</label>
					</span>
					<span className="flex flex-col">
						<label>Cancel before the day you check in for a full refund.</label>
						<label>
							Review the Host full cancellation policy which applies even if you
							cancel for illness or disruption caused by COVID-19
						</label>
						<Link href="#">
							<a className="underline hover:font-semibold hover:text-black flex flex-row items-center">
								<label>Show more</label>
								<FaChevronRight />
							</a>
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
};
