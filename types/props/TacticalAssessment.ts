import { Enemy } from "../Enemy";
import { SectionType } from "../SectionType";
import { Weapon } from "../Weapon";

export type TacticalAssessmentProps = {
	enemyIndex: number;
	expandedSection: SectionType | null;
	enemySubset: Enemy[];
	toggleSection: (section: SectionType) => void;
	weaponIndex: number;
	weaponSubset: Weapon[];
};
