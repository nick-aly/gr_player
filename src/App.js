import React from "react";
import VideoJS from "./VideoJs";
import channels from './channels.js'


export const App = () => {
	const playerRef = React.useRef(null);

	const videoJsOptions = {
		autoplay: false,
		controls: true,
		responsive: true,
		fluid: true,
		sources: channels.map((channel) => channel.src),
	};

	const handleChangeEvent = (event) => {
		console.log(event);
	};

	const changePlayerOptions = (src) => {
		// you can update the player through the Video.js player instance
		if (!playerRef.current) {
			return;
		}
		// [update player through instance's api]
		playerRef.current.src([{ src: src }]);
	};

	const channelButtons = channels.map((channel, index) => (
		<button className="channel-btn" key={index} onClick={() => changePlayerOptions(channel.src)}>
			{channel.name}
		</button>
	));

	const handlePlayerReady = (player) => {
		playerRef.current = player;

		// you can handle player events here
		player.on("waiting", () => {
			console.log("player is waiting");
		});

		player.on("dispose", () => {
			console.log("player will dispose");
		});
	};

	return (
		<>
			<div className="layout">
				<div className='btn-list'>{channelButtons}</div>
				<div className="video-container">
					<VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
				</div>

			</div>
		</>

	);
};
