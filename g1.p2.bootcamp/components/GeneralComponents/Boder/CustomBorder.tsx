import { NextPage } from "next";

interface Props {
	component: any;
}

const CustomBorder: NextPage<Props> = ({ component }) => {
	return (
		<div className="rounded-3xl p-[2px] bg-gradient-to-r hover:bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500 shadow-md hover:shadow">
			{component}
		</div>
	);
};

export default CustomBorder;
