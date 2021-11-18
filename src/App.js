import React, { useState } from "react";
import VideoJS from "./VideoJs";
import channels from "./channels.js";
import { programme } from "./programme";

function calculataTime() {}

export const App = () => {
	const [isHovering, setIsHovering] = useState(false);
	const [hoveringChannel, setHoveringChannel] = useState();

	const handleMouseOver = (chn) => {
		let _hoveringChannel = programme.find(
			(channel) => channel.channel == chn
		);
		setHoveringChannel(_hoveringChannel);
		console.log(_hoveringChannel);
		setIsHovering(true);
	};

	const handleMouseOut = (channel) => {
		setHoveringChannel();
		console.log("out");
		setIsHovering(false);
	};

	const playerRef = React.useRef(null);

	const videoJsOptions = {
		autoplay: true,
		controls: true,
		responsive: true,
		fluid: true,
		liveui: true,
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

	const Programm = (chn) => {
		return (
			<div className="programme">
				{hoveringChannel ? JSON.stringify(hoveringChannel) : "empty"}
			</div>
		);
	};

	const channelButtons = channels.map((channel, index) => {
		return (
			<button
				className="channel-btn"
				onMouseOver={() => handleMouseOver(channel.name)}
				onMouseOut={() => handleMouseOut(channel)}
				key={index}
				onClick={() => changePlayerOptions(channel.src)}
			>
				{channel.name}
			</button>
		);
	});

	return (
		<div className="layout">
			{isHovering && <Programm chn={hoveringChannel} />}
			<div className="btn-list">{channelButtons}</div>
			<div className="video-container">
				<VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
			</div>
		</div>
	);
};
