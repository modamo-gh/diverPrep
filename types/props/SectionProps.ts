import { ReactNode } from "react";
import { SectionType } from "../SectionType";

export type SectionProps = {
	children: ReactNode;
	expandedSection: SectionType | null;
	name: SectionType;
	toggleSection: (section: SectionType) => void;
};
