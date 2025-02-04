import { SectionHeaderProps } from "@/types/props/SectionHeader";

const SectionHeader: React.FC<SectionHeaderProps> = ({ name }) => {
	return (
		<div className="bg-gray-800 border border-gray-600 flex flex-1 items-center justify-center rounded w-full">
			<h1 className="font-bold text-center text-yellow-500 text-4xl tracking-widest uppercase">
				{name}
			</h1>
		</div>
	);
};

export default SectionHeader;
