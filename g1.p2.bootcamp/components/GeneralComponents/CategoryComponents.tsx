import React from "react";
import { NextPage } from "next";
import CategoryCardComponent from "./CardComponents/CategoryCardComponent";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import useDrag from "../../utils/MenuScroll/useDrage";
import { LeftArrow, RightArrow } from "../../utils/MenuScroll/arrow";
import usePreventBodyScroll from "../../utils/MenuScroll/usePreventBodyScroll";
import { category } from "../../utils/category";
import { getCookie } from "cookies-next";
interface Props {
	setPropertyData: any;
}

const CategoryComponents: NextPage<Props> = ({ setPropertyData }) => {
	// NOTE: for drag by mouse
	const { dragStart, dragStop, dragMove, dragging } = useDrag();
	// const handleDrag =
	// 	({ scrollContainer }): ((ev: React.MouseEvent) => void) =>
	// 	(ev: React.MouseEvent) =>
	// 		dragMove(ev, (posDiff) => {
	// 			if (scrollContainer.current) {
	// 				scrollContainer.current.scrollLeft += posDiff;
	// 			}
	// 		});
	const { disableScroll, enableScroll } = usePreventBodyScroll();
	const [selected, setSelected] = React.useState<string>("");
	const handleItemClick = (itemId: string, title: string) => async () => {
		if (dragging) {
			return false;
		}
		const token = getCookie("authuser");
		if (selected != itemId) {
			setSelected(itemId);
			fetch(`/api/comresident/property/get?filter=${title.toLowerCase()}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((data) => data.json())
				.then((data) => {
					setPropertyData(data.data);
				})
				.catch((error) => console.log(error));
		} else {
			setSelected("");
			fetch("/api/comresident/property/get", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((data) => data.json())
				.then((data) => {
					setPropertyData(data.data);
				})
				.catch((error) => console.log(error));
		}
	};
	return (
		<div className="h-auto items-center">
			<div className="w-full flex flex-row justify-between items-center relative">
				<div
					className="w-full sm:w-full md:w-full lg:w-[85%] xl:w-[90%] 2xl:w-[91.5%]"
					onMouseEnter={disableScroll}
					onMouseLeave={enableScroll}
				>
					<ScrollMenu
						LeftArrow={LeftArrow}
						RightArrow={RightArrow}
						// onWheel={onWheel}
						onMouseDown={() => dragStart}
						onMouseUp={() => dragStop}
						// onMouseMove={(e) => handleDrag(e)}
						scrollContainerClassName="overflow-x-auto sm:overflow-x-auto md:overflow-x-auto lg:overflow-hidden xl:overflow-hidden 2xl:overflow-hidden"
					>
						{category.map((item) => {
							return (
								<div
									className="px-3"
									key={item.id}
									itemID={item.id} // NOTE: itemId is required for track items
									onClick={handleItemClick(item.id, item.title)}
									// selected={category.id === selected}
								>
									<CategoryCardComponent
										imageURL={item.image}
										category={item.title}
										select={selected}
										categoryID={item.id}
									/>
								</div>
							);
						})}
					</ScrollMenu>
				</div>
				<div className="flex flex-1 justify-end">
					<button className="" onClick={() => console.log("Filter")}>
						<div className="bg-gradient-to-r from-indigo-500 via-white-500 to-teal-500 hover:bg-gradient-to-l rounded-xl px-[2px] py-[2px] sm:hidden md:hidden lg:block xl:block 2xl:block hidden text-base font-mono">
							<div className="bg-white rounded-xl h-full w-full">
								<div className="justify-between items-center px-2 py-3 space-x-2 shadow h-full w-full flex flex-row">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
										/>
									</svg>
									<span className="text-sm font-bold">Filters</span>
								</div>
							</div>
						</div>
					</button>
				</div>
			</div>
		</div>
	);
};
export default CategoryComponents;

// function onWheel(apiObj, ev: React.WheelEvent): void {
// 	const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

// 	if (isThouchpad) {
// 		ev.stopPropagation();
// 		return;
// 	}

// 	if (ev.deltaY < 0) {
// 		apiObj.scrollNext();
// 	} else if (ev.deltaY > 0) {
// 		apiObj.scrollPrev();
// 	}
// }
