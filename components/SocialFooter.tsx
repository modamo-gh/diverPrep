import { FaGithub } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";

const SocialFooter = () => {
	return (
		<footer className="bg-gray-800 border border-gray-600 flex-none grid grid-cols-3 place-items-center p-3 rounded shrink-0">
			<a
				href="https://bsky.app/profile/modamo.xyz"
				rel="noopener noreferrer"
				target="_blank"
			>
				<SiBluesky className="text-yellow-500" size={24} />
			</a>
			<a
				href="https://github.com/modamo-gh/diverPrep"
				rel="noopener noreferrer"
				target="_blank"
			>
				<FaGithub className="text-yellow-500" size={24} />
			</a>
			<p className="text-center text-lg text-yellow-500">#4775-5898</p>
		</footer>
	);
};

export default SocialFooter;
