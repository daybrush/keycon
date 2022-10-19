import builder from "@daybrush/builder";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

const defaultOptions = {
	tsconfig: "",
	commonjs: true,
	external: {
		svelte: "svelte",
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess(),
		}),
	],
};

export default builder([
	{
		...defaultOptions,
		input: "./src/svelte-keycon/index.ts",
		output: "dist/keycon.cjs.js",
		format: "cjs",
		exports: "named",
	},
	{
		...defaultOptions,
		input: "./src/svelte-keycon/index.ts",
		output: "dist/keycon.esm.js",
		format: "es",
		exports: "named",
	},
]);
