import builder from "@daybrush/builder";

export default builder([
    {
        name: "keycon",
        input: "src/index.umd.ts",
        output: "./dist/keycon.js",
        resolve: true,
        commonjs: true,
        external: {
            "@egjs/component": "eg.Component",
        },
    },
    {
        name: "keycon",
        input: "src/index.umd.ts",
        output: "./dist/keycon.js",
        resolve: true,
        commonjs: true,
        uglify: true,
        external: {
            "@egjs/component": "eg.Component",
        },
    },
    {
        name: "keycon",
        input: "src/index.umd.ts",
        output: "./dist/keycon.pkgd.js",
        resolve: true,
        commonjs: true,
    },
    {
        name: "keycon",
        input: "src/index.umd.ts",
        output: "./dist/keycon.pkgd.min.js",
        resolve: true,
        uglify: true,
        commonjs: true,
    },
    {
        name: "keycon",
        input: "src/KeyController.ts",
        output: "./dist/keycon.esm.js",
        exports: "named",
        format: "es",
        resolve: true,
        commonjs: true,
        external: {
            "@egjs/component": "eg.Component",
        },
    },
]);
