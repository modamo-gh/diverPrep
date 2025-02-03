import { Weapon } from "@/types/Weapon";
import { Dispatch, SetStateAction } from "react";

export type WeaponSelectorProps = {
	setWeaponIndex: Dispatch<SetStateAction<number>>;
    weaponIndex: number;
    filteredWeapons: Weapon[];
};
