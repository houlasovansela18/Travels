import { NextPage } from "next";
interface Props {
	imageURL: string;
	category: string;
	select: string;
	categoryID: string;
}

const CategoryCardComponent: NextPage<Props> = ({
	imageURL,
	category,
	select,
	categoryID,
}) => {
	return (
		<button
			className={
				select !== categoryID
					? "mt-2 pb-3 pt-1 hover:border-b-2 hover:border-black hover:opacity-100 opacity-60"
					: "mt-2 pb-3 pt-1 border-b-2 border-black opacity-100"
			}
		>
			<div className="flex flex-col h-12 justify-between items-center">
				<img className="h-6 w-6 " src={imageURL} alt={category} />
				<span className="font-mono text-xs">{category}</span>
			</div>
		</button>
	);
};

export default CategoryCardComponent;
