import { WeaponSelectorProps } from "@/types/props/WeaponSelector";
import Image from "next/image";

const WeaponSelector: React.FC<WeaponSelectorProps> = ({
	setWeaponIndex,
	weaponIndex,
	weapons
}) => {
	return (
		<div className="bg-blue-500 flex flex-row flex-[4] items-center justify-center w-full">
			<button
				onClick={() =>
					setWeaponIndex((prevIndex) =>
						prevIndex === 0 ? weapons.length - 1 : prevIndex - 1
					)
				}
			>
				Previous
			</button>
			<div className="flex flex-col flex-1 items-center justify-center">
				<Image
					alt={weapons[weaponIndex]?.name}
					className="h-64 object-contain w-64"
					src={weapons[weaponIndex]?.image_url}
				/>
				<p>{weapons[weaponIndex]?.name}</p>
				<p>Max Penetration: {weapons[weaponIndex]?.penetration}</p>
			</div>
			<button
				onClick={() =>
					setWeaponIndex((prevIndex) =>
						prevIndex === weapons.length - 1 ? 0 : prevIndex + 1
					)
				}
			>
				Next
			</button>
		</div>
	);
};

export default WeaponSelector;
