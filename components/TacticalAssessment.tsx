import { TacticalAssessmentProps } from "@/types/props/TacticalAssessment";

const TacticalAssessment: React.FC<TacticalAssessmentProps> = ({
	enemyIndex,
	filteredEnemies,
	weaponIndex,
	weapons
}) => {
	return (
		<div className="bg-gray-800 border border-gray-600 grid grid-cols-3 items-center justify-around rounded text-lg">
			<div className="flex flex-col gap-1 items-center justify-around">
				<p className="text-center">Weighted Armor Value?</p>
				<p>
					{weapons[weaponIndex]?.penetration >=
					filteredEnemies[enemyIndex]?.weightedaverage
						? "✅"
						: "❌"}
				</p>
			</div>
			<div className="flex flex-col gap-1 items-center justify-around">
				<p className="text-center">Most Common Armor Value?</p>
				<p className="text-center">
					{weapons[weaponIndex]?.penetration >=
					filteredEnemies[enemyIndex]?.mode
						? "✅"
						: "❌"}
				</p>
			</div>
			<div className="flex flex-col gap-1 items-center justify-around">
				<p className="text-center">Max Armor Value?</p>
				<p className="text-center">
					{weapons[weaponIndex]?.penetration >=
					filteredEnemies[enemyIndex]?.max
						? "✅"
						: "❌"}
				</p>
			</div>
		</div>
	);
};

export default TacticalAssessment;
