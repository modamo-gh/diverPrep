import { EntitySelectorProps } from "@/types/props/selectors/Entity";
import Image from "next/image";

const EntitySelector: React.FC<EntitySelectorProps> = ({
	entitySubset,
	entitySubsetIndex,
	isExpanded,
	setSupersetIndex
}) => {
	return (
		<div
			className={`bg-gray-800 border border-gray-600 ${
				!isExpanded ? "hidden" : "flex"
			} md:flex flex-1 h-full rounded w-full`}
		>
			<button
				className="flex-1 text-lg"
				onClick={() =>
					setSupersetIndex((prevIndex) =>
						prevIndex === 0
							? entitySubset.length - 1
							: prevIndex - 1
					)
				}
			>
				{"<"}
			</button>
			<div className="flex items-center justify-center">
				<Image
					alt={entitySubset[entitySubsetIndex]?.name}
					className="h-48 md:h-56 md:w-56 lg:h-64 lg:w-64 object-contain max-w-full w-48"
					src={entitySubset[entitySubsetIndex]?.image_url}
				/>
			</div>
			<button
				className="flex-1 text-lg"
				onClick={() =>
					setSupersetIndex((prevIndex) =>
						prevIndex === entitySubset.length - 1
							? 0
							: prevIndex + 1
					)
				}
			>
				{">"}
			</button>
		</div>
	);
};

export default EntitySelector;
