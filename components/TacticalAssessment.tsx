import { TacticalAssessmentProps } from "@/types/props/TacticalAssessment";

const TacticalAssessment: React.FC<TacticalAssessmentProps> = ({
	enemyIndex,
	filteredEnemies,
	weaponIndex,
	weapons
}) => {
	return (
		<div className="bg-gray-800 border border-gray-600 flex flex-1 items-center justify-around rounded text-lg">
			<p>
				Rounded Average Weighted Armor Value?{" "}
				{weapons[weaponIndex]?.penetration >=
				filteredEnemies[enemyIndex]?.weightedaverage ? (
					<span className="px-2">✅</span>
				) : (
					<span className="px-2">❌</span>
				)}
			</p>
			<p>
				Most Common Armor Value?{" "}
				{weapons[weaponIndex]?.penetration >=
				filteredEnemies[enemyIndex]?.mode ? (
					<span className="px-2">✅</span>
				) : (
					<span className="px-2">❌</span>
				)}
			</p>
			<p>
				Max Armor Value?{" "}
				{weapons[weaponIndex]?.penetration >=
				filteredEnemies[enemyIndex]?.max ? (
					<span className="px-2">✅</span>
				) : (
					<span className="px-2">❌</span>
				)}
			</p>
		</div>
	);
};

export default TacticalAssessment;
