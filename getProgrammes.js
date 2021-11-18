const parse = require("node-html-parser").default;
const axios = require("axios");
const fs = require("fs");
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
	// pop nikelodaon and
	pipi.pop();
	pipi.pop();
	return pipi;
}

getProgramms().then((data) => {
	fs.writeFileSync(
		"src/programme.js",
		"export const programme =" + JSON.stringify(data)
	);
});
