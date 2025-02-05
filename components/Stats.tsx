import { StatsProps } from "@/types/props/Stats";

const Stats: React.FC<StatsProps> = ({
	config,
	entitySubset,
	entitySubsetIndex,
	isExpanded
}) => {
	const selectedEntity = entitySubset[entitySubsetIndex];

	return (
		<div
			className={`bg-gray-600 border border-gray-600  flex-1 gap-0.5 grid-cols-2 grid-rows-${
				config.length
			} ${
				!isExpanded ? "hidden" : "grid"
			} md:grid h-full place-items-center rounded w-full`}
		>
			{config.map(({ label, key }) => (
				<>
					<div
						key={`${key}-label`}
						className="bg-gray-800 flex h-full items-center justify-center text-center w-full"
					>
						{label}
					</div>
					<div
						key={`${key}-value`}
						className="bg-gray-800 flex h-full items-center justify-center text-center w-full"
					>
						{selectedEntity?.[key as keyof typeof selectedEntity] ??
							"N/A"}
					</div>
				</>
			))}
		</div>
	);
};

export default Stats;
