import { NextPage } from "next";
import CategoryComponents from "../GeneralComponents/CategoryComponents";
import NavComponents from "../GeneralComponents/NavComponents";

interface Props {
	userData: {
		status: number;
		name: string;
		role: number;
		image_url: string;
	};
	setPropertyData: any;
	setIsOpen: any;
}

const HeaderComponent: NextPage<Props> = ({
	userData,
	setPropertyData,
	setIsOpen,
}) => (
	<div className=" bg-white sticky top-0 z-20 ">
		<div className=" px-6 sm:px-6 md:px-10 lg:px-10 xl:px-20 2xl:px-40 border-b">
			<NavComponents userData={userData} setIsOpen={setIsOpen} />
		</div>
		<div className=" px-6 sm:px-6 md:px-10 lg:px-10 xl:px-20 2xl:px-40 shadow-md">
			<CategoryComponents setPropertyData={setPropertyData} />
		</div>
	</div>
);

export default HeaderComponent;
