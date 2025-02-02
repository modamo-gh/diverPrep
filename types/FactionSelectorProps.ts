import { Dispatch, SetStateAction } from "react";
import { Enemy } from "./Enemy";

export type FactionSelectorProps = {
	factionIndex: number;
	factions: string[];
	setEnemyIndex: Dispatch<SetStateAction<number>>;
	setFactionIndex: Dispatch<SetStateAction<number>>;
};
