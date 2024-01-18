import { createContext, useState } from "react";

const Context = createContext();

export { Context };

const ContextProvider = ({ children }) => {
	// Default city Lucknow
	const [city, setCity] = useState("lk");
	const [date, setDate] = useState(new Date());
	const [edition, setEdition] = useState("main");
	const [zoomScale, setZoomScale] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	return (
		<Context.Provider
			value={{
				city,
				setCity,
				date,
				setDate,
				edition,
				setEdition,
				zoomScale,
				setZoomScale,
				isLoading,
				setIsLoading,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;
