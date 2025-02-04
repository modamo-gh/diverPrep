import { SectionProps } from "@/types/props/SectionProps";
import SectionHeader from "./SectionHeader";
import useIsSmall from "@/hooks/useIsSmall";

const Section: React.FC<SectionProps> = ({
	children,
	expandedSection,
	name,
	toggleSection
}) => {
	const isSmall = useIsSmall();
	const isExpanded = expandedSection === name && isSmall;

	return (
		<div
			className={`flex flex-col ${
				isExpanded ? "flex-[8]" : "flex-[1]"
			} gap-2 transition-all duration-300 ease-in-out`}
			onClick={() => isSmall && toggleSection(name)}
		>
			{!isExpanded && <SectionHeader name={name} />}
			{isExpanded || !isSmall ? (
				<div
					className="flex flex-col gap-2 h-full w-full"
					onClick={(e) => e.stopPropagation()}
				>
					{children}
				</div>
			) : null}
		</div>
	);
};

export default Section;
