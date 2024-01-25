import { useEffect, useState } from "react";
import "../styles/Loading.css";

function Loading({ isError }) {
	const [message, setMessage] = useState("Loading...");

	useEffect(() => {
		if (isError) {
			setMessage("Page or edition not found");
		}
	}, [isError]);

	return (
		<div className="Loading">
			<p>{message}</p>
		</div>
	);
}

export default Loading;
