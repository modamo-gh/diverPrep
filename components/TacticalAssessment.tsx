import { TacticalAssessmentProps } from "@/types/props/TacticalAssessment";

const TacticalAssessment: React.FC<TacticalAssessmentProps> = ({
	enemyIndex,
	filteredEnemies,
	weaponIndex,
	weapons
}) => {
	return (
		<div className="flex flex-1 items-center justify-around">
			<p>
				Rounded Average Weighted Armor Value?{" "}
				{weapons[weaponIndex]?.penetration >=
				filteredEnemies[enemyIndex]?.weightedaverage
					? "✅"
					: "❌"}
			</p>
			<p>
				Most Common Armor Value?{" "}
				{weapons[weaponIndex]?.penetration >=
				filteredEnemies[enemyIndex]?.mode
					? "✅"
					: "❌"}
			</p>
			<p>
				Max Armor Value?{" "}
				{weapons[weaponIndex]?.penetration >=
				filteredEnemies[enemyIndex]?.max
					? "✅"
					: "❌"}
			</p>
		</div>
	);
};

export default TacticalAssessment;
