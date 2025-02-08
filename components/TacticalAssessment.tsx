import { TacticalAssessmentProps } from "@/types/props/TacticalAssessment";
import useIsSmall from "@/hooks/useIsSmall";

const TacticalAssessment: React.FC<TacticalAssessmentProps> = ({
	enemyIndex,
	expandedSection,
	enemySubset,
	toggleSection,
	weaponIndex,
	weaponSubset
}) => {
	let numberOfPasses = 0;
	const isSmall = useIsSmall();

	const getEmojiAssessment = () => {
		switch (numberOfPasses) {
			case 3:
				return "🥇";
			case 2:
				return "🥈";
			case 1:
				return "🥉";
			default:
				return "☠️";
		}
	};

	const passConditional = () => {
		numberOfPasses++;

		return "✅";
	};

	return (
		<div
			className={`bg-gray-800 border border-gray-600 flex items-center justify-center md:col-span-2 rounded ${
				expandedSection === "assessment" ? "row-span-8" : "row-span-1"
			} md:row-span-1`}
			onClick={() => {
				if (isSmall) {
					toggleSection("assessment");
				}
			}}
		>
			{(!expandedSection || expandedSection !== "assessment") &&
			isSmall ? (
				<h1 className="font-bold text-yellow-500 text-4xl tracking-widest uppercase">
					Assessment
				</h1>
			) : expandedSection === "assessment" && isSmall ? (
				<div
					className={`bg-gray-600 border-0 flex-1 gap-0.5 grid-cols-2 grid-rows-4 ${
						expandedSection === "assessment" ? "grid" : "hidden"
					} md:grid h-full place-items-center rounded w-full`}
				>
					<div className="bg-gray-800 flex h-full items-center justify-center text-center w-full">
						Weighted AV?
					</div>
					<div className="bg-gray-800 flex h-full items-center justify-center text-center w-full">
						{weaponSubset[weaponIndex]?.penetration >=
						enemySubset[enemyIndex]?.weightedaverage
							? passConditional()
							: "❌"}
					</div>
					<div className="bg-gray-800 flex h-full items-center justify-center text-center w-full">
						Most Common AV?
					</div>
					<div className="bg-gray-800 flex h-full items-center justify-center text-center w-full">
						{weaponSubset[weaponIndex]?.penetration >=
						enemySubset[enemyIndex]?.mode
							? passConditional()
							: "❌"}
					</div>
					<div className="bg-gray-800 flex h-full items-center justify-center text-center w-full">
						Max AV?
					</div>
					<div className="bg-gray-800 flex h-full items-center justify-center text-center w-full">
						{weaponSubset[weaponIndex]?.penetration >=
						enemySubset[enemyIndex]?.max
							? passConditional()
							: "❌"}
					</div>
					<div className="bg-gray-800 flex h-full items-center justify-center text-center w-full">
						Assessment
					</div>
					<div className="bg-gray-800 flex h-full items-center justify-center text-center text-lg w-full">
						{getEmojiAssessment()}
					</div>
				</div>
			) : (
				<div className="grid grid-cols-3 h-full place-items-center p-2 text-center text-lg w-full ">
					<p>Weighted AV?</p>
					<p>Most Common AV?</p>
					<p>Max AV?</p>
					<p>
						{weaponSubset[weaponIndex]?.penetration >=
						enemySubset[enemyIndex]?.weightedaverage
							? "passConditional()"
							: "❌"}
					</p>
					<p>
						{weaponSubset[weaponIndex]?.penetration >=
						enemySubset[enemyIndex]?.mode
							? " passConditional()"
							: "❌"}
					</p>
					<p>
						{weaponSubset[weaponIndex]?.penetration >=
						enemySubset[enemyIndex]?.max
							? "passConditional()"
							: "❌"}
					</p>
				</div>
			)}
		</div>
	);
};

export default TacticalAssessment;
