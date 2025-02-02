
import { EnemySelectorProps } from "@/types/props/EnemySelector";
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
				Previous
			</button>
			<div className="flex flex-col flex-1 items-center justify-center">
				<Image
					alt={filteredEnemies[enemyIndex]?.name}
					className="h-64 object-contain w-64 "
					src={filteredEnemies[enemyIndex]?.image_url}
				/>
				<p>{filteredEnemies[enemyIndex]?.name}</p>
				<p>Max Armor Value: {filteredEnemies[enemyIndex]?.max}</p>
				<p>
					Most Common Armor Value: {filteredEnemies[enemyIndex]?.mode}
				</p>
				<p>
					Rounded Average Weighted Armor Value:{" "}
					{filteredEnemies[enemyIndex]?.weightedaverage}
				</p>
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
				Next
			</button>
		</div>
	);
};

export default EnemySelector;
