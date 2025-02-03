import { Enemy } from "@/types/Enemy";
import { Dispatch, SetStateAction } from "react";

export type EnemySelectorProps = {
    enemyIndex: number;
    filteredEnemies: Enemy[];
	setEnemyIndex: Dispatch<SetStateAction<number>>;
};
