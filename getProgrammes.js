import https from "https";
import { parse } from "node-html-parser";
import axios from "axios";

async function getProgramms() {
	const response = await axios.get("http://www.programmatileorasis.gr");
	const root = parse(response.data);
	const channels = root.querySelectorAll("div.program_list");
	const pipi = channels.map((channel) => {
		let prName = channel.querySelectorAll("tbody tr td:nth-child(2)");
		let prHour = channel.querySelectorAll("tbody tr td:first-child");
		let chName = channel.querySelector("thead tr td b").innerText;
		prHour.shift();
		let chNameTxt = prName.map((d) => d.innerText.split("🔍")[0]);
		let chHourTxt = prHour.map((d) => d.innerText);
		let rt = chNameTxt.map((name, index) => {
			return {
				programmName: name,
				programmTime: chHourTxt[index],
			};
		});
		return { channel: chName, programms: rt };
	});
	return pipi;
}

getProgramms().then((data) => console.log(data));
