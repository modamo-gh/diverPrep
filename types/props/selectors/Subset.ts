import { Dispatch, SetStateAction } from "react";

export type SubsetSelectorProps = {
	isExpanded: boolean;
	setSubsetIndex: Dispatch<SetStateAction<number>>;
	setSupersetIndex: Dispatch<SetStateAction<number>>;
	subset: string[];
	subsetIndex: number;
};
