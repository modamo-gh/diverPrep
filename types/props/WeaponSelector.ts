import { Dispatch, SetStateAction } from "react";
import { Weapon } from "../Weapon";

export type WeaponSelectorProps = {
	setWeaponIndex: Dispatch<SetStateAction<number>>;
    weaponIndex: number;
    weapons: Weapon[];
};
