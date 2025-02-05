import useIsSmall from "@/hooks/useIsSmall";
import { SectionProps } from "@/types/props/SectionProps";
import SubsetSelector from "./selectors/SubsetSelector";
import Stats from "./Stats";
import EntitySelector from "./selectors/EntitySelector";

const Section: React.FC<SectionProps> = ({
	entitySubset,
	entitySubsetIndex,
	expandedSection,
	name,
	setSupersetIndex,
	subset,
	subsetIndex,
	setSubsetIndex,
	toggleSection
}) => {
	const isExpanded = expandedSection === name;
	const isSmall = useIsSmall();

	return (
		<div
			className={`${
				(!expandedSection || !isExpanded) && isSmall
					? "bg-gray-800 border border-gray-600 row-span-1"
					: "row-span-8"
			} flex flex-col gap-2 items-center justify-center rounded md:row-span-4`}
			onClick={() => {
				if (isSmall) {
					toggleSection(name);
				}
			}}
		>
			{!isExpanded && isSmall ? (
				<h1 className="font-bold text-yellow-500 text-4xl tracking-widest uppercase">
					{name}
				</h1>
			) : (
				<>
					<SubsetSelector
						isExpanded={isExpanded}
						subsetIndex={subsetIndex}
						subset={subset}
						setSupersetIndex={setSupersetIndex}
						setSubsetIndex={setSubsetIndex}
					/>
					<EntitySelector
						entitySubset={entitySubset}
						entitySubsetIndex={entitySubsetIndex}
						isExpanded={isExpanded}
						setSupersetIndex={setSupersetIndex}
					/>
					<Stats
						config={
							name === "enemy"
								? [
										{ label: "Name", key: "name" },
										{
											label: "Weighted AV",
											key: "weightedaverage"
										},
										{
											label: "Most Common AV",
											key: "mode"
										},
										{ label: "Max AV", key: "max" }
								  ]
								: [
										{ label: "Name", key: "name" },
										{
											label: "Max Penetration",
											key: "penetration"
										}
								  ]
						}
						entitySubset={entitySubset}
						entitySubsetIndex={entitySubsetIndex}
						isExpanded={isExpanded}
					/>
				</>
			)}
		</div>
	);
};

export default Section;
