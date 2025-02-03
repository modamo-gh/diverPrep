import { WeaponStatsProps } from "@/types/props/stats/Weapon";

const WeaponStats: React.FC<WeaponStatsProps> = ({ weaponIndex, weapons }) => {
	return (
		<div className="bg-gray-800 border border-gray-600 border-l-0 border-r-0 border-t-0 flex-1 h-full min-h-40 overflow-hidden rounded text-lg w-full">
			<table className="h-full table-fixed text-center w-full">
				<tbody>
					<tr>
						<td className="border border-gray-600">Name</td>
						<td className="border border-gray-600">
							{weapons[weaponIndex]?.name}
						</td>
					</tr>
					<tr>
						<td className="border border-gray-600">
							Max Penetration
						</td>
						<td className="border border-gray-600 ">
							{weapons[weaponIndex]?.penetration}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default WeaponStats;
