import { TacticalAssessmentProps } from "@/types/props/TacticalAssessment";

const TacticalAssessment: React.FC<TacticalAssessmentProps> = ({
	enemyIndex,
	expandedSection,
	filteredEnemies,
	weaponIndex,
	weapons
}) => {
	return (
		<div
			className={`${
				expandedSection === "assessment" ? "grid" : "hidden"
			} md:grid flex-1 bg-gray-800 border border-gray-600 grid-cols-2 md:grid-cols-3 md:grid-rows-2 items-center justify-around rounded text-lg w-full`}
		>
			{expandedSection === "assessment" ? (
				<>
					<p className="text-center">Weighted AV?</p>
					<p className="text-center">
						{weapons[weaponIndex]?.penetration >=
						filteredEnemies[enemyIndex]?.weightedaverage
							? "✅"
							: "❌"}
					</p>
					<p className="text-center">Most Common AV?</p>
					<p className="text-center">
						{weapons[weaponIndex]?.penetration >=
						filteredEnemies[enemyIndex]?.mode
							? "✅"
							: "❌"}
					</p>
					<p className="text-center">Max AV?</p>
					<p className="text-center">
						{weapons[weaponIndex]?.penetration >=
						filteredEnemies[enemyIndex]?.max
							? "✅"
							: "❌"}
					</p>
				</>
			) : (
				<>
					<p className="text-center">Weighted AV?</p>{" "}
					<p className="text-center">Most Common AV?</p>{" "}
					<p className="text-center">Max AV?</p>
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
				</>
			)}
		</div>
	);
};

export default TacticalAssessment;
