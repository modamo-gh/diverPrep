import { EnemyStatsProps } from "@/types/props/stats/Enemy";

const EnemyStats: React.FC<EnemyStatsProps> = ({
	enemyIndex,
	filteredEnemies
}) => {
	return (
		<table className="border border-black border-collapse border-r-0 flex-1 table-fixed text-center w-full">
			<tbody>
				<tr>
					<td className="border border-black border-r-0">Name</td>
					<td className="border border-black border-r-0">
						{filteredEnemies[enemyIndex]?.name}
					</td>
				</tr>
				<tr>
					<td className="border border-black">
						Rounded Average Weighted Armor Value
					</td>
					<td className="border border-black border-r-0">
						{filteredEnemies[enemyIndex]?.weightedaverage}
					</td>
				</tr>
				<tr>
					<td className="border border-black">
						Most Common Armor Value
					</td>
					<td className="border border-black border-r-0">
						{filteredEnemies[enemyIndex]?.mode}
					</td>
				</tr>
				<tr>
					<td className="border border-black">Max Armor Value</td>
					<td className="border border-black border-r-0">
						{filteredEnemies[enemyIndex]?.max}
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default EnemyStats;
