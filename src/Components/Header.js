import { useContext, useEffect, useState } from "react";
import data from "../Data/data.json";
import "../styles/Header.css";
import { HiZoomIn, HiOutlineZoomOut } from "react-icons/hi";
// import { RiFullscreenLine } from "react-icons/ri";
// import { RxExitFullScreen } from "react-icons/rx";
// import useFullScreen from "../hooks/useFullScreen";
import { Context } from "../Context/ContextProvider";
import { IoMenu } from "react-icons/io5";
import useResize from "../hooks/useResize";

function Header() {
	const [cities, setCities] = useState([]);
	const {
		city,
		setCity,
		date,
		setDate,
		setEdition,
		zoomScale,
		setZoomScale,
		setIsLoading,
	} = useContext(Context);
	// const { isFullScreen, toggleFullScreen } = useFullScreen();
	const { isNavOpen, setIsNavOpen } = useResize();

	const handleCityChange = (e) => {
		const city = e.target.value;
		setCity(city);
		setIsLoading(true);
	};

	const handleDateChange = (e) => {
		const date = new Date(e.target.value);
		setDate(date);
		setIsLoading(true);
	};

	const handleZoomIn = () => {
		if (zoomScale >= 2) return;
		setZoomScale((pre) => pre + 0.1);
	};

	const handleZoomOut = () => {
		if (zoomScale <= 1) return;
		setZoomScale((pre) => pre - 0.1);
	};

	const handleEditionChange = (e) => {
		const edition = e.target.value;
		setEdition(edition);
		setIsLoading(true);
	};

	const handleNavToggle = () => {
		setIsNavOpen((pre) => !pre);
	};

	useEffect(() => {
		const cityList = [];
		for (let key in data) {
			cityList.push({
				value: data[key].edition_code,
				label: data[key].title,
			});
		}
		setCities(cityList);
	}, []);

	return (
		<div className="Header">
			<div className="top-nav">
				<h1 className="heading">Amar Ujala E-Paper</h1>
				<button onClick={handleNavToggle} className="menu-btn">
					<IoMenu size={32} color="white" />
				</button>
			</div>
			<div
				className="nav"
				style={{
					display: isNavOpen ? "flex" : "none",
				}}
			>
				<select
					name="city"
					id="city"
					onChange={handleCityChange}
					defaultValue={city.value}
					value={city.value}
					required
				>
					{cities.map((city, i) => {
						return (
							<option key={i} value={city.value}>
								{city.label}
							</option>
						);
					})}
				</select>
				<select defaultValue="main" onChange={handleEditionChange}>
					<option value="main">Main</option>
					<option value="my">My City</option>
				</select>
				<input
					type="date"
					name="date"
					id="date"
					min={new Date("2022-01-01").toISOString().split("T")[0]}
					max={new Date().toISOString().split("T")[0]}
					onChange={handleDateChange}
					value={date.toISOString().substr(0, 10)}
				/>
				<div className="buttons">
					<button onClick={handleZoomIn}>
						<HiZoomIn size={22} />
						<span className="ml-0-5">Zoom</span>
					</button>
					<button onClick={handleZoomOut}>
						<HiOutlineZoomOut size={22} />
					</button>
					{/* <button onClick={toggleFullScreen}>
						{!isFullScreen ? (
							<RiFullscreenLine size={22} />
						) : (
							<RxExitFullScreen size={22} />
						)}
					</button> */}
				</div>
			</div>
		</div>
	);
}

export default Header;
