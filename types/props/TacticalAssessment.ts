import { Enemy } from "../Enemy";
import { SectionType } from "../SectionType";
import { Weapon } from "../Weapon";

export type TacticalAssessmentProps = {
	enemyIndex: number;
	expandedSection: SectionType | null;
	filteredEnemies: Enemy[];
	weaponIndex: number;
	weapons: Weapon[];
};
