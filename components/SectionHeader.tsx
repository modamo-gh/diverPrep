import { SectionHeaderProps } from "@/types/SectionHeaderProps";

const SectionHeader: React.FC<SectionHeaderProps> = ({ name }) => {
	return (
		<div className="flex flex-1 items-center justify-center w-full">
			<h1 className="text-black text-center text-5xl">{name}</h1>
		</div>
	);
};

export default SectionHeader;
