import { CategorySelectorProps } from "@/types/props/selectors/Category";

const CategorySelector: React.FC<CategorySelectorProps> = ({
	categories,
	categoryIndex,
	setCategoryIndex,
	setWeaponIndex
}) => {
	return (
		<div className="bg-gray-800 border border-gray-600 flex flex-none flex-row p-4 rounded text-lg w-full">
			<div className="flex flex-row flex-1 justify-start">
				<button
					className="h-0 px-3"
					onClick={() => {
						setCategoryIndex((prevIndex) =>
							prevIndex === 0
								? categories.length - 1
								: prevIndex - 1
						);
						setWeaponIndex(0);
					}}
				>
					{"<"}
				</button>
				<h2 className="flex-1 text-center">
					{categories[categoryIndex]}
				</h2>
				<button
					className="h-0 px-3"
					onClick={() => {
						setCategoryIndex((prevIndex) =>
							prevIndex === categories.length - 1
								? 0
								: prevIndex + 1
						);
						setWeaponIndex(0);
					}}
				>
					{">"}
				</button>
			</div>
		</div>
	);
};

export default CategorySelector;
