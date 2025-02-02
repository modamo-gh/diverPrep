import { Dispatch, SetStateAction } from "react";
import { Enemy } from "../Enemy";

export type EnemySelectorProps = {
    enemyIndex: number;
    filteredEnemies: Enemy[];
	setEnemyIndex: Dispatch<SetStateAction<number>>;
};
