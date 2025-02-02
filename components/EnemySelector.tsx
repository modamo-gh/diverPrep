import { EnemySelectorProps } from "@/types/props/selectors/Enemy";
import Image from "next/image";

const EnemySelector: React.FC<EnemySelectorProps> = ({
	enemyIndex,
	filteredEnemies,
	setEnemyIndex
}) => {
	return (
		<div className="flex flex-row flex-1">
			<button
				onClick={() =>
					setEnemyIndex((prevIndex) =>
						prevIndex === 0
							? filteredEnemies.length - 1
							: prevIndex - 1
					)
				}
			>
				{"<"}
			</button>
			<div className="flex flex-col flex-1 items-center justify-center">
				<Image
					alt={filteredEnemies[enemyIndex]?.name}
					className="h-64 object-contain w-64 "
					src={filteredEnemies[enemyIndex]?.image_url}
				/>
				<table className="border border-black table-fixed text-center w-full">
					<tbody>
						<tr>
							<td className="border border-black ">Name</td>
							<td className="border border-black ">
								{filteredEnemies[enemyIndex]?.name}
							</td>
						</tr>
						<tr>
							<td className="border border-black ">
								Rounded Average Weighted Armor Value
							</td>
							<td className="border border-black ">
								{filteredEnemies[enemyIndex]?.weightedaverage}
							</td>
						</tr>
						<tr>
							<td className="border border-black ">
								Most Common Armor Value
							</td>
							<td className="border border-black ">
								{filteredEnemies[enemyIndex]?.mode}
							</td>
						</tr>
						<tr>
							<td className="border border-black ">
								Max Armor Value
							</td>
							<td className="border border-black ">
								{filteredEnemies[enemyIndex]?.max}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<button
				onClick={() =>
					setEnemyIndex((prevIndex) =>
						prevIndex === filteredEnemies.length - 1
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

export default EnemySelector;
