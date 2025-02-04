import { EnemySelectorProps } from "@/types/props/selectors/Enemy";
import Image from "next/image";

const EnemySelector: React.FC<EnemySelectorProps> = ({
	enemyIndex,
	filteredEnemies,
	setEnemyIndex
}) => {
	return (
		<div className="hidden bg-gray-800 border border-gray-600 md:flex flex-row flex-[2] rounded">
			<button
				className="flex-1 text-lg"
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
			<div className="flex flex-col flex-[8] items-center justify-center">
				<Image
					alt={filteredEnemies[enemyIndex]?.name}
					className="h-64 md:h-48 md:w-48 object-contain max-w-full w-64"
					src={filteredEnemies[enemyIndex]?.image_url}
				/>
			</div>
			<button
				className="flex-1 text-lg"
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
