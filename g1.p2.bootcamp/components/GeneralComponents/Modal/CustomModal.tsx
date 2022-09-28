import { NextPage } from "next";
import { AiOutlineClose } from "react-icons/ai";
import { ComponentType } from "react";

interface Props {
	isOpen: boolean;
	setIsOpen: any;
	title: string;
	BodyComponent?: any;
	FooterComponent?: any;
}

const AuthModal: NextPage<Props> = ({
	isOpen,
	setIsOpen,
	title,
	BodyComponent,
	FooterComponent,
}) => {
	return isOpen ? (
		<div className="fixed flex flex-1 w-full h-screen justify-center items-center z-50 overflow-hidden bg-black bg-opacity-50">
			<div className="h-2/3 rounded-3xl p-[2px] bg-gradient-to-r hover:bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500 shadow">
				<div className="flex flex-col justify-between bg-white p-2 w-full h-full rounded-3xl space-y-2 font-mono">
					<div className="flex flex-row justify-center items-center relative">
						<span className="font-semibold text-lg underline underline-offset-4">
							{title}
						</span>
						<span
							className="top-0 right-0 p-2 hover:cursor-pointer rounded-full hover:bg-slate-200 absolute"
							onClick={() => setIsOpen(false)}
						>
							<AiOutlineClose size={18} />
						</span>
					</div>
					<div className="flex flex-1">{BodyComponent || null}</div>
					<div className="flex">{FooterComponent || null}</div>
				</div>
			</div>
		</div>
	) : null;
};

export default AuthModal;
