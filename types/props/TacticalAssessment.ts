import { Enemy } from "../Enemy";
import { Weapon } from "../Weapon";

export type TacticalAssessmentProps = {
	enemyIndex: number;
	filteredEnemies: Enemy[];
	weaponIndex: number;
	weapons: Weapon[];
};
