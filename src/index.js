import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ContextProvider from "./Context/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ContextProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ContextProvider>
);
