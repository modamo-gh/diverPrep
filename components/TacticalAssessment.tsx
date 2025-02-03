import { TacticalAssessmentProps } from "@/types/props/TacticalAssessment";

const TacticalAssessment: React.FC<TacticalAssessmentProps> = ({
	enemyIndex,
	filteredEnemies,
	weaponIndex,
	weapons
}) => {
	return (
		<div className="bg-gray-800 border border-gray-600 flex flex-col items-center justify-around rounded text-lg">
			<div className="flex-1 grid grid-cols-3 items-center justify-center w-full">
				<p className="text-center">Weighted AV?</p>{" "}
				<p className="text-center">Most Common AV?</p>{" "}
				<p className="text-center">Max AV?</p>
			</div>
			<div className="flex-1 grid grid-cols-3 items-center justify-center w-full">
				<p className="text-center">
					{weapons[weaponIndex]?.penetration >=
					filteredEnemies[enemyIndex]?.weightedaverage
						? "✅"
						: "❌"}
				</p>
				<p className="text-center">
					{weapons[weaponIndex]?.penetration >=
					filteredEnemies[enemyIndex]?.mode
						? "✅"
						: "❌"}
				</p>
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
