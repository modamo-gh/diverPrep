import { EnemyStatsProps } from "@/types/props/stats/Enemy";

const EnemyStats: React.FC<EnemyStatsProps> = ({
	enemyIndex,
	filteredEnemies
}) => {
	return (
		<div className="bg-gray-800 border border-gray-600 border-l-0 border-r-0 border-t-0 flex-1 overflow-hidden rounded text-lg w-full">
			<table className="h-full table-fixed text-center w-full">
				<tbody>
					<tr>
						<td className="border border-gray-600">Name</td>
						<td className="border border-gray-600">
							{filteredEnemies[enemyIndex]?.name}
						</td>
					</tr>
					<tr>
						<td className="border border-gray-600">
							Rounded Average Weighted Armor Value
						</td>
						<td className="border border-gray-600 ">
							{filteredEnemies[enemyIndex]?.weightedaverage}
						</td>
					</tr>
					<tr>
						<td className="border border-gray-600">
							Most Common Armor Value
						</td>
						<td className="border border-gray-600 ">
							{filteredEnemies[enemyIndex]?.mode}
						</td>
					</tr>
					<tr>
						<td className="border border-gray-600">
							Max Armor Value
						</td>
						<td className="border border-gray-600 ">
							{filteredEnemies[enemyIndex]?.max}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default EnemyStats;
