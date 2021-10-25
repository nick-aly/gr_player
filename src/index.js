import videojs from "video.js";
import playlist from "videojs-playlist";
import playlistUi from "videojs-playlist-ui";

new videojs("vid1", function onPlayerReady() {
	this.play();
});
