import { NextPage } from "next";

interface Props {
	isReview?: boolean;
}

const PageRight: NextPage<Props> = ({ isReview }) => {
	return (
		<span className="flex flex-row">
			<label>© 2022 G1.P2.BootCamp, Inc.</label>
			<label className={isReview ? "hidden" : "flex"}>All right reserve.</label>
		</span>
	);
};

export default PageRight;
