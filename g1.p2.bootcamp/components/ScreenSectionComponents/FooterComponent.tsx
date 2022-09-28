import { NextPage } from "next";
import Link from "next/link";

import { FaDiscord, FaGlobe } from "react-icons/fa";
import { currency } from "../../utils/currency";
import { useState } from "react";
import PageRight from "../GeneralComponents/Confidencial/pageRight";
import { discord } from "../../utils/utils";
interface Props {
	isReview?: boolean;
}

const FooterComponent: NextPage<Props> = ({ isReview }) => {
	const language = "English";
	const [currencyState, setCurrencyState] = useState(currency.USD);
	return (
		<div className="flex flex-1 flex-row justify-center items-center h-10 text-xs font-mono">
			<div className="flex flex-1 flex-row space-x-5 items-center justify-start">
				{isReview ? (
					<div className="opacity-90 hover:opacity-100 hover:text-black">
						<PageRight isReview={isReview} />
					</div>
				) : null}
				<Link href="/Privacy">
					<a className="hover:underline opacity-90 hover:opacity-100 hover:text-black border-l-2 hover:border-black pl-1">
						Privacy
					</a>
				</Link>
				<Link href="/Terms">
					<a className="hover:underline opacity-90 hover:opacity-100 hover:text-black border-l-2 hover:border-black pl-1">
						Terms
					</a>
				</Link>
				<Link href="/Support">
					<a className="hover:underline opacity-90 hover:opacity-100 hover:text-black border-l-2 hover:border-black pl-1">
						Support & Resources
					</a>
				</Link>
			</div>
			{!isReview ? (
				<div className="opacity-90 hover:opacity-100 hover:text-black">
					<PageRight />
				</div>
			) : null}
			<div
				className={
					isReview
						? "flex  flex-row space-x-5 items-center justify-end"
						: "flex flex-1 flex-row space-x-5 items-center justify-end"
				}
			>
				<button className="flex flex-row items-center opacity-90 hover:opacity-100 hover:text-black">
					<FaGlobe className="text-lg" /> | {language}
				</button>
				<button className="flex flex-row items-center opacity-90 hover:opacity-100 hover:text-black">
					{currencyState.icon} | {currencyState.label}
				</button>
				<a
					href={discord}
					target="blank"
					className="opacity-90 hover:opacity-100 hover:text-black items-center"
				>
					<span className="flex flex-row">
						<FaDiscord className="text-lg" /> | Discord
					</span>
				</a>
			</div>
		</div>
	);
};

export default FooterComponent;
