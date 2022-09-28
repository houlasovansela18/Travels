import { NextPage } from "next";

interface Props {
	badgeText: string;
	contentText: string;
	hidden: boolean;
}

const BadgeStyle: NextPage<Props> = ({
	badgeText,
	contentText,
	hidden = true,
}) => {
	return (
		<div
			className={`p-2 bg-gradient-to-r hover:bg-gradient-to-tr from-indigo-500 to-teal-500 items-center text-black leading-none lg:rounded-full flex lg:inline-flex font-mono`}
			role="alert"
			hidden={hidden}
		>
			<span
				className={`flex rounded-full bg-white uppercase px-2 py-1 text-xs mr-3`}
			>
				{badgeText}
			</span>
			<span className="mr-2 text-left flex-auto text-xs">{contentText}</span>
			{/* <svg
				className="fill-current opacity-75 h-4 w-4"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
			>
				<path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
			</svg> */}
		</div>
	);
};

export default BadgeStyle;
