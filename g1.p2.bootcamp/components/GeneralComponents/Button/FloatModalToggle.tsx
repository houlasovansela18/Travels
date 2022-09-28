import { NextPage } from "next";
import { FaMap } from "react-icons/fa";
import { useState } from "react";
interface Props {
	mapStyleIndex: number;
	setMapStyleIndex: any;
}

const FloatModalToggle: NextPage<Props> = ({
	mapStyleIndex,
	setMapStyleIndex,
}) => {
	const [isToggle, setIsToggle] = useState(false);

	return (
		<div
			className="fixed flex flex-col bottom-11 z-10 left-5 text-sm font-mono text-white"
			draggable="true"
		>
			{isToggle ? (
				<div className="flex flex-col bg-black my-2 text-sm p-2 rounded-lg space-y-1">
					<span className={mapStyleIndex == 0 ? "opacity-100 border-l-2 pl-1" : "opacity-70 hover:opacity-100 border-l-2 pl-1"} onClick={() => setMapStyleIndex(0)}>
						Outdoors
					</span>
					<span className={mapStyleIndex == 1 ? "opacity-100 border-l-2 pl-1" : "opacity-70 hover:opacity-100 border-l-2 pl-1"} onClick={() => setMapStyleIndex(1)}>
						Satellite
					</span>
					<span className={mapStyleIndex == 2 ? "opacity-100 border-l-2 pl-1" : "opacity-70 hover:opacity-100 border-l-2 pl-1"} onClick={() => setMapStyleIndex(2)}>
						Navigation
					</span>
				</div>
			) : null}
			<button
				className="flex justify-start items-center"
				onClick={() => setIsToggle(!isToggle)}
			>
				<span className="px-3 py-3 bg-black rounded-full opacity-90 hover:opacity-100">
					<FaMap className="" />
				</span>
			</button>
		</div>
	);
};

export default FloatModalToggle;
