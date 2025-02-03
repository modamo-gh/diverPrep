import { Dispatch, SetStateAction } from "react";

export type CategorySelectorProps = {
    categories: string[];
    categoryIndex: number;
    setCategoryIndex: Dispatch<SetStateAction<number>>;
    setWeaponIndex: Dispatch<SetStateAction<number>>;
};
