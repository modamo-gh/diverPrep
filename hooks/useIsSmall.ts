import { useEffect, useState } from "react";

const useIsSmall = (breakpoint = 768) => {
	const [isSmall, setIsSmall] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsSmall(window.innerWidth < 768);
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [breakpoint]);

    return isSmall;
};

export default useIsSmall;