import { WeaponStatsProps } from "@/types/props/stats/Weapon";

const WeaponStats: React.FC<WeaponStatsProps> = ({ weaponIndex, weapons }) => {
	return (
		<table className="border border-black border-collapse flex-1 table-fixed text-center w-full">
			<tbody>
				<tr>
					<td className="border border-black ">Name</td>
					<td className="border border-black ">
						{weapons[weaponIndex]?.name}
					</td>
				</tr>
				<tr>
					<td className="border border-black ">Max Penetration</td>
					<td className="border border-black ">
						{weapons[weaponIndex]?.penetration}
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default WeaponStats;
