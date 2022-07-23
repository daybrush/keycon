const buildHelper = require("@daybrush/builder");

export default buildHelper([
	{
		input: "./src/react-keycon/index.tsx",
		output: "./dist/keycon.cjs.js",
		format: "cjs",
		exports: "named",
	},
	{
		input: "./src/react-keycon/index.tsx",
		output: "./dist/keycon.esm.js",
		format: "esm",
		exports: "named",
	},
]);

