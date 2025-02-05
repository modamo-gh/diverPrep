import { Dispatch, SetStateAction } from "react";
import { SectionType } from "../SectionType";
import { Weapon } from "../Weapon";
import { Enemy } from "../Enemy";

export type SectionProps = {
	entitySubset: (Enemy | Weapon)[];
	entitySubsetIndex: number;
	expandedSection: SectionType | null;
	name: SectionType;
	setSubsetIndex: Dispatch<SetStateAction<number>>;
	setSupersetIndex: Dispatch<SetStateAction<number>>;
	subset: string[];
	subsetIndex: number;
	toggleSection: (section: SectionType) => void;
};
