import { Enemy } from "../Enemy";
import { Weapon } from "../Weapon";

export type StatsProps = {
	config: { label: string; key: string }[];
	entitySubset: (Enemy | Weapon)[];
	entitySubsetIndex: number;
	isExpanded: boolean;
};
