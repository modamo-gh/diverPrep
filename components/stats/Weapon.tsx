import { WeaponStatsProps } from "@/types/props/stats/Weapon";

const WeaponStats: React.FC<WeaponStatsProps> = ({
	weaponIndex,
	filteredWeapons
}) => {
	return (
		<div className="bg-gray-800 border-gray-600 border-0 flex-1 h-full min-h-40 overflow-hidden rounded text-lg w-full">
			<table className="h-full table-fixed text-center w-full">
				<tbody>
					<tr>
						<td className="border border-gray-600">Name</td>
						<td className="border border-gray-600 ">
							<p className="h-12 items-center justify-center line-clamp-2 text-center">
								{filteredWeapons[weaponIndex]?.name}
							</p>
						</td>
					</tr>
					<tr>
						<td className="border border-gray-600">
							Max Penetration
						</td>
						<td className="border border-gray-600 items-center justify-center">
							<p className="text-center">
								{filteredWeapons[weaponIndex]?.penetration}
							</p>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default WeaponStats;
