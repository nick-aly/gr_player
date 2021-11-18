var cron = require("node-cron");

var m = 0;
cron.schedule("* * * * *", () => {
	m++;
});

const handler = async (event) => {
	try {
		const subject = event.queryStringParameters.name || "World";
		return {
			statusCode: 200,
			body: JSON.stringify({ message: `Hello ${m}` }),
			// // more keys you can return:
			// headers: { "headerName": "headerValue", ... },
			// isBase64Encoded: true,
		};
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}
};

module.exports = { handler };
