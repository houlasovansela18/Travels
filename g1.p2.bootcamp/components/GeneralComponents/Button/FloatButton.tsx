import { NextPage } from "next";
import { FaMapMarkedAlt, FaList } from "react-icons/fa";
interface Props {
	isMapView: boolean;
	setIsMapView: Function;
}

const FloatButton: NextPage<Props> = ({ isMapView, setIsMapView }) => {
	return (
		<div
			className="fixed bottom-16 flex-1 z-10 left-1/2 transform -translate-x-1/2 inline-flex mx-auto"
			draggable="true"
		>
			<button className="" onClick={() => setIsMapView(!isMapView)}>
				<span className="flex flex-row items-center px-4 py-2 bg-black rounded-full text-white opacity-90 hover:opacity-100 font-mono">
					{isMapView ? (
						<>
							<span className="flex-row items-center flex sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden">
								<span className="pr-1">List</span>
								<FaList className="" />
							</span>
							<span className="flex-row items-center hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex">
								<span className="pr-1">Show list</span>
								<FaList className="" />
							</span>
						</>
					) : (
						<>
							<span className="flex-row items-center flex sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden">
								<span className="pr-1">Map</span>
								<FaMapMarkedAlt className="" />
							</span>
							<span className="flex-row items-center hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex">
								<span className="pr-1">Show map</span>
								<FaMapMarkedAlt className="" />
							</span>
						</>
					)}
				</span>
			</button>
		</div>
	);
};

export default FloatButton;
