import { WeaponSelectorProps } from "@/types/props/selectors/Weapon";
import Image from "next/image";

const WeaponSelector: React.FC<WeaponSelectorProps> = ({
	setWeaponIndex,
	weaponIndex,
	filteredWeapons
}) => {
	return (
		<div className="bg-gray-800 border border-gray-600 flex flex-row flex-[2] rounded">
			<button
				className="flex-1 text-lg"
				onClick={() =>
					setWeaponIndex((prevIndex) =>
						prevIndex === 0
							? filteredWeapons.length - 1
							: prevIndex - 1
					)
				}
			>
				{"<"}
			</button>
			<div className="flex flex-col flex-[8] items-center justify-center">
				<Image
					alt={filteredWeapons[weaponIndex]?.name}
					className="h-48 md:h-56 md:w-56 lg:h-64 lg:w-64 object-contain max-w-full w-48"
					src={filteredWeapons[weaponIndex]?.image_url}
				/>
			</div>
			<button
				className="flex-1 text-lg"
				onClick={() =>
					setWeaponIndex((prevIndex) =>
						prevIndex === filteredWeapons.length - 1
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

export default WeaponSelector;
