import { Enemy } from "../Enemy";
import { Section } from "../Section";
import { Weapon } from "../Weapon";

export type TacticalAssessmentProps = {
	enemyIndex: number;
	expandedSection: Section | null;
	filteredEnemies: Enemy[];
	weaponIndex: number;
	weapons: Weapon[];
};
