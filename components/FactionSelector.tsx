import { FactionSelectorProps } from "@/types/props/selectors/Faction";

const FactionSelector: React.FC<FactionSelectorProps> = ({
	factionIndex,
	factions,
	setEnemyIndex,
	setFactionIndex
}) => {
	return (
		<div className="flex flex-none flex-row pt-4 px-8 w-full">
			<h2 className="flex-none">Faction:</h2>
			<div className="flex flex-row flex-1 justify-start">
				<button
					className="h-0 px-3"
					onClick={() => {
						setFactionIndex((prevIndex) =>
							prevIndex === 0
								? factions.length - 1
								: prevIndex - 1
						);
						setEnemyIndex(0);
					}}
				>
					{"<"}
				</button>
				<h2 className="flex-1 text-center">{factions[factionIndex]}</h2>
				<button
					className="h-0 px-3"
					onClick={() => {
						setFactionIndex((prevIndex) =>
							prevIndex === factions.length - 1
								? 0
								: prevIndex + 1
						);
						setEnemyIndex(0);
					}}
				>
					{">"}
				</button>
			</div>
		</div>
	);
};

export default FactionSelector;
