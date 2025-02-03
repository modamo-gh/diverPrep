import { WeaponSelectorProps } from "@/types/props/selectors/Weapon";
import Image from "next/image";

const WeaponSelector: React.FC<WeaponSelectorProps> = ({
	setWeaponIndex,
	weaponIndex,
	weapons
}) => {
	return (
		<div className="flex flex-row flex-[2]">
			<button
				className="flex-1"
				onClick={() =>
					setWeaponIndex((prevIndex) =>
						prevIndex === 0 ? weapons.length - 1 : prevIndex - 1
					)
				}
			>
				{"<"}
			</button>
			<div className="flex flex-col flex-[8] items-center justify-center">
				<Image
					alt={weapons[weaponIndex]?.name}
					className="h-64 object-contain w-64"
					src={weapons[weaponIndex]?.image_url}
				/>
			</div>
			<button
				className="flex-1"
				onClick={() =>
					setWeaponIndex((prevIndex) =>
						prevIndex === weapons.length - 1 ? 0 : prevIndex + 1
					)
				}
			>
				{">"}
			</button>
		</div>
	);
};

export default WeaponSelector;
