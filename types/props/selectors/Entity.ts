import { Enemy } from "@/types/Enemy";
import { Weapon } from "@/types/Weapon";
import { Dispatch, SetStateAction } from "react";

export type EntitySelectorProps = {
	entitySubset: (Enemy | Weapon)[];
	entitySubsetIndex: number;
	isExpanded: boolean;
	setSupersetIndex: Dispatch<SetStateAction<number>>;
};
