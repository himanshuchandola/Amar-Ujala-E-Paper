import { useState, useEffect } from "react";

const useResize = () => {
	const [isNavOpen, setIsNavOpen] = useState(true);

	const handleResize = () => {
		setIsNavOpen(window.innerWidth > 768);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return { isNavOpen, setIsNavOpen };
};

export default useResize;
