import builder from "@daybrush/builder";

export default builder([
    {
        name: "keycon",
        input: "src/index.umd.ts",
        output: "./dist/keycon.js",
        resolve: true,
        commonjs: true,
    },
    {
        name: "keycon",
        input: "src/index.umd.ts",
        output: "./dist/keycon.min.js",
        resolve: true,
        uglify: true,
        commonjs: true,
    },
    {
        name: "keycon",
        input: "src/index.cjs.ts",
        output: "./dist/keycon.cjs.js",
        resolve: true,
        commonjs: true,
        exports: "named",
        format: "cjs",
        external: {
            "@daybrush/utils": "@daybrush/utils",
            "@scena/event-emitter": "@scena/event-emitter",
        },
    },
    {
        name: "keycon",
        input: "src/index.ts",
        output: "./dist/keycon.esm.js",
        exports: "named",
        format: "es",
        resolve: true,
        commonjs: true,
        external: {
            "@daybrush/utils": "@daybrush/utils",
            "@scena/event-emitter": "@scena/event-emitter",
        },
    },
]);
