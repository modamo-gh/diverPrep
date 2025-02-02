import { Dispatch, SetStateAction } from "react";

export type FactionSelectorProps = {
	factionIndex: number;
	factions: string[];
	setEnemyIndex: Dispatch<SetStateAction<number>>;
	setFactionIndex: Dispatch<SetStateAction<number>>;
};
