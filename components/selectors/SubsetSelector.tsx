import { SubsetSelectorProps } from "@/types/props/selectors/Subset";

const SubsetSelector: React.FC<SubsetSelectorProps> = ({
	isExpanded,
	setSupersetIndex,
	subset,
	subsetIndex,
	setSubsetIndex
}) => {
	return (
		<div
			className={`bg-gray-800 border border-gray-600 flex-row p-4 rounded text-lg w-full ${
				!isExpanded ? "hidden" : "flex"
			} md:flex`}
		>
			<button
				className="h-0 px-3"
				onClick={() => {
					setSubsetIndex((prevIndex) =>
						prevIndex === 0 ? subset.length - 1 : prevIndex - 1
					);
					setSupersetIndex(0);
				}}
			>
				{"<"}
			</button>
			<h2 className="flex-1 text-center">{subset[subsetIndex]}</h2>
			<button
				className="h-0 px-3"
				onClick={() => {
					setSubsetIndex((prevIndex) =>
						prevIndex === subset.length - 1 ? 0 : prevIndex + 1
					);
					setSupersetIndex(0);
				}}
			>
				{">"}
			</button>
		</div>
	);
};

export default SubsetSelector;
