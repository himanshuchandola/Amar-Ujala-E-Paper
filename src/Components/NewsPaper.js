import { useState, useContext, useEffect } from "react";
import { Context } from "../Context/ContextProvider";
import "../styles/NewsPaper.css";
import Loading from "./Loading";
import useNewsPaperImageLoader from "../hooks/useNewsPaperImageLoader";

const NewsPaper = () => {
	const { city, date, edition, zoomScale, isLoading, setIsLoading } =
		useContext(Context);
	const [pageNo, setPageNo] = useState(1);
	const [error, setError] = useState(false);
	const { pageUrls, MAX_PAGES } = useNewsPaperImageLoader();

	const handlePrev = () => {
		setPageNo((pre) => pre - 1);
		setIsLoading(true);
	};

	const handleNext = () => {
		setPageNo((pre) => pre + 1);
		setIsLoading(true);
	};

	const handleImageError = () => {
		setIsLoading(false);
		setError(true);
	};

	const handleImageLoad = () => {
		setIsLoading(false);
	};

	useEffect(() => {
		setPageNo(1);
		setIsLoading(true);
		setError(false);
	}, [city, edition, date, setIsLoading]);

	return (
		<>
			<div className="NewsPaper">
				{(isLoading || error) && <Loading isError={error} />}
				{!error && (
					<img
						src={pageUrls[pageNo - 1]}
						alt="News Paper Page"
						onError={handleImageError}
						onLoad={handleImageLoad}
						style={{
							transform: `scale(${zoomScale})`,
							display: isLoading ? "none" : "block",
						}}
					/>
				)}
			</div>
			{!error && (
				<div className="nav-panel">
					<button onClick={handlePrev} disabled={pageNo <= 1}>
						Prev
					</button>
					<span>
						Page {pageNo} of {MAX_PAGES}
					</span>
					<button onClick={handleNext} disabled={pageNo >= MAX_PAGES}>
						Next
					</button>
				</div>
			)}
		</>
	);
};

export default NewsPaper;
