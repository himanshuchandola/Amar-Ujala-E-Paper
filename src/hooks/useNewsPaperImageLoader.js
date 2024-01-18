import { useEffect, useContext, useState } from "react";
import { Context } from "../Context/ContextProvider";

function useNewsPaperImageLoader() {
	const MAX_PAGES = 18; // Not sure about this
	const { city, date, edition } = useContext(Context);
	const [pageUrls, setPageUrls] = useState([]);

	useEffect(() => {
		const loadNewsPageImages = (city) => {
			const currentDate = date
				.toISOString()
				.split("T")[0]
				.replace(/[-]/g, "/");
			const baseUrl = process.env.REACT_APP_BASE_URL;
			const urls = [];
			for (let page = 1; page < MAX_PAGES; page++) {
				const formattedPage = page < 10 ? `0${page}` : page;
				const url = `${baseUrl}/${currentDate}${
					edition === "main" ? "" : "/my"
				}/${city}/${formattedPage}/hdimage.jpg`;
				urls.push(url);
			}
			setPageUrls(urls);
		};
		loadNewsPageImages(city);
	}, [city, edition, date]);

	return { pageUrls, MAX_PAGES };
}

export default useNewsPaperImageLoader;
