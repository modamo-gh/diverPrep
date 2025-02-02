import { WeaponSelectorProps } from "@/types/props/selectors/Weapon";
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
				{"<"}
			</button>
			<div className="flex flex-col flex-1 items-center justify-center">
				<Image
					alt={weapons[weaponIndex]?.name}
					className="h-64 object-contain w-64"
					src={weapons[weaponIndex]?.image_url}
				/>
				<table className="border border-black table-fixed text-center w-full">
					<tbody>
						<tr>
							<td className="border border-black ">Name</td>
							<td className="border border-black ">
								{weapons[weaponIndex]?.name}
							</td>
						</tr>
						<tr>
							<td className="border border-black ">
								Max Penetration
							</td>
							<td className="border border-black ">
								{weapons[weaponIndex]?.penetration}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<button
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
