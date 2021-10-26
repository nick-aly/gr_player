import React from "react";
import VideoJS from "./VideoJs";

const channels = new Array(
	{
		name: "Alpha",
		src: "https://alphalive-i.akamaihd.net/hls/live/682300/live/master.m3u8",
	},
	{
		name: "Ant1",
		src: "https://antennaamdnoenc.akamaized.net/ant1_akamai/abr/playlist.m3u8",
	},
	{
		name: "Star",
		src: "https://livestar.siliconweb.com/media/star1/star1mediumhd.m3u8",
	},
	{
		name: "Megka",
		src: "https://streamcdnm17-c98db5952cb54b358365984178fb898a.msvdn.net/live/S86713049/gonOwuUacAxM/playlist.m3u8",
	},
	{
		name: "Skai",
		src: "https://skai-live.siliconweb.com/media/cambria4/index.m3u8",
	},
	{
		name: "ERT 1",
		src: "http://ert-live-bcbs15228.siliconweb.com/media/ert_1/ert_1_3Mbps.m3u8",
	},
	{
		name: "ERT 2",
		src: "http://ert-live-bcbs15228.siliconweb.com/media/ert_2/ert_2_3Mbps.m3u8",
	},
	{
		name: "ERT 3",
		src: "http://ert-live-bcbs15228.siliconweb.com/media/ert_3/ert_3_2Mbps.m3u8",
	},
	{
		name: "ERT Sports",
		src: "http://ert-live-bcbs15228.siliconweb.com/media/ert_sports/ert_sports_3Mbps.m3u8",
	},
	{
		name: "ERT Sports 2",
		src: "https://ert-live-bcbs15228.siliconweb.com/media/ert_sports_2/ert_sports_2_3Mbps.m3u8",
	},
	{
		name: "ERT Sports 3",
		src: "https://ert-live-bcbs15228.siliconweb.com/media/ert_sports_3/ert_sports_3_3Mbps.m3u8",
	},
	{
		name: "ERT Sports 4",
		src: "https://ert-live-bcbs15228.siliconweb.com/media/ert_sports_4/ert_sports_4_3Mbps.m3u8",
	},
	{
		name: "ERT Sports 5",
		src: "https://ert-live-bcbs15228.siliconweb.com/media/ert_sports_5/ert_sports_5_3Mbps.m3u8",
	},
	{
		name: "ERT News",
		src: "http://ert-live-bcbs15228.siliconweb.com/media/ert_news/ert_news.m3u8",
	}
);

export const App = () => {
	const playerRef = React.useRef(null);

	const videoJsOptions = {
		// lookup the options in the docs for more options
		autoplay: true,
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
		console.log("pp");
		// [update player through instance's api]
		playerRef.current.src([{ src: src }]);
		playerRef.current.autoplay(false);
	};

	const channelButtons = channels.map((channel, index) => (
		<button key={index} onClick={() => changePlayerOptions(channel.src)}>
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
			<div> {channelButtons}</div>

			<VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
		</>
	);
};
