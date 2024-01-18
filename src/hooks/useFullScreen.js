import { useEffect, useState } from "react";

function useFullScreen() {
	const [isFullScreen, setIsFullScreen] = useState(false);

	useEffect(() => {
		// Causing some error because we can't force browser to go fullscreen
		try {
			var docElm = document.documentElement;

			var isInFullScreen =
				(document.fullscreenElement &&
					document.fullscreenElement !== null) ||
				(document.webkitFullscreenElement &&
					document.webkitFullscreenElement !== null) ||
				(document.mozFullScreenElement &&
					document.mozFullScreenElement !== null) ||
				(document.msFullscreenElement &&
					document.msFullscreenElement !== null);

			if (!isInFullScreen) {
				if (docElm.requestFullscreen) {
					docElm.requestFullscreen();
				} else if (docElm.mozRequestFullScreen) {
					docElm.mozRequestFullScreen();
				} else if (docElm.webkitRequestFullScreen) {
					docElm.webkitRequestFullScreen();
				} else if (docElm.msRequestFullscreen) {
					docElm.msRequestFullscreen();
				}
			} else {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
			}
		} catch (error) {
			console.log(error);
		}
	}, [isFullScreen]);

	const toggleFullScreen = () => {
		setIsFullScreen((pre) => !pre);
	};

	return { isFullScreen, toggleFullScreen };
}

export default useFullScreen;
