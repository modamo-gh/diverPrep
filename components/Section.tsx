import { SectionProps } from "@/types/props/SectionProps";
import SectionHeader from "./SectionHeader";

const Section: React.FC<SectionProps> = ({
	children,
	expandedSection,
	name,
	toggleSection
}) => {
	const isExpanded = expandedSection === name;

	return (
		<div
			className={`flex flex-col gap-2 ${
				isExpanded ? "flex-[8]" : "flex-[1]"
			} transition-all duration-300 ease-in-out`}
			onClick={() => toggleSection(name)}
		>
			{!isExpanded && <SectionHeader name={name} />}
			{children}
		</div>
	);
};

export default Section;
