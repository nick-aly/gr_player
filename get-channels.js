const m3u8Parser = require("m3u8-parser");
const https = require("https");
const { Buffer } = require("buffer");
var parser = new m3u8Parser.Parser();

const options = {
	hostname: "raw.githubusercontent.com",
	path: "/free-greek-iptv/greek-iptv/beb997e089f6a8fd5b0d62251516f82dac392c3b/Greekstreamtv.m3u",
	method: "GET",
};

function* hexFormatValues(buffer) {
	let i = 0;
	for (let x of buffer) {
		const hex = x.toString();
		yield [hex, i];
		i++;
	}
}

const req = https.request(options, (res) => {
	var games = [];

	res.on("data", (d) => {
		const res = d.toJSON();
		const str = d.toString();

		st = str[273];
		find(d);

		for (ch of d) {
		}
		for ([x, idx] of hexFormatValues(d)) {
		}

		for (let i = 0; i < str.length; i++) {
			let st =
				str[i - 9] +
				str[i - 8] +
				str[i - 7] +
				str[i - 6] +
				str[i - 5] +
				str[i - 4] +
				str[i - 3] +
				str[i - 2] +
				str[i - 1] +
				str[i];
			/* let st =
				str[i] +
				str[i + 1] +
				str[i + 2] +
				str[i + 3] +
				str[i + 4] +
				str[i + 5] +
				str[i + 6] +
				str[i + 7] +
				str[i + 8] +
				str[i + 9]; */
			/*
			if (st === 'tvg-logo="') {
				let j = i+1;
				let url = ''
				while (str[j] != '"') {
					url = url.concat(str[j]);
					j = j + 1;
				}
				console.log(url)
				games.push[url];
				url = ''
			} */

			// console.log(str[i])
		}

		//d.forEach(data=>console.log(data))
	});
});

req.on("error", (error) => {
	console.error(error);
});

req.end();

function find(bytes) {
	var s = Buffer.from('tvg-logo="');
	var b = Buffer.from(",");
	let lastPos = 0;
	let urls = [];
	while (lastPos != -1) {
		let start = bytes.indexOf(s, lastPos);
		let sep = bytes.indexOf(b, start);
		let end = bytes.indexOf("\n", sep);
		let dif = bytes.slice(sep, end);
		let url = bytes.slice(start, sep);
		urls.push(url.toString());

		lastPos = start != -1 ? start + s.length : -1;
	}
}
