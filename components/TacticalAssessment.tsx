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
				<p>Weighted Armor Value?</p>
				<p>
					{weapons[weaponIndex]?.penetration >=
					filteredEnemies[enemyIndex]?.weightedaverage ? (
						<span className="px-2">✅</span>
					) : (
						<span className="px-2">❌</span>
					)}
				</p>
			</div>
			<div className="flex flex-col gap-1 items-center justify-around">
				<p>Most Common Armor Value?</p>
				<p>
					{weapons[weaponIndex]?.penetration >=
					filteredEnemies[enemyIndex]?.mode ? (
						<span className="px-2">✅</span>
					) : (
						<span className="px-2">❌</span>
					)}
				</p>
			</div>
			<div className="flex flex-col gap-1 items-center justify-around">
				<p>Max Armor Value?</p>
				<p>
					{weapons[weaponIndex]?.penetration >=
					filteredEnemies[enemyIndex]?.max ? (
						<span className="px-2">✅</span>
					) : (
						<span className="px-2">❌</span>
					)}
				</p>
			</div>
		</div>
	);
};

export default TacticalAssessment;
