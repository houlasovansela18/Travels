import { NextPage } from "next";
import { property } from "../../utils/types/global.d";
import PostCard from "./CardComponents/PostCard";

interface Props {
	properties: Array<property>;
	authUser: String;
}

const ListView: NextPage<Props> = ({ properties, authUser }) => {
	return (
		<div className="w-full h-full grid gap-x-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-10 bg-transparent px-6 sm:px-6 md:px-10 lg:px-10 xl:px-20 2xl:px-40 mt-4 mb-11">
			{properties.length > 0 ? (
				properties.map((property, index) => (
					<PostCard
						data={property}
						key={`${index}_postcard`}
						authUser={authUser}
					/>
				))
			) : (
				<div className="font-mono flex justify-center bg-black text-white flex-col p-3 relative rounded-md">
					<label>We are sorry!</label>
					<label>Currently,No available host place for this category.</label>
				</div>
			)}
		</div>
	);
};

export default ListView;
