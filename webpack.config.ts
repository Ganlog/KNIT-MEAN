module.exports = {
    output: {
        filename: "bundle.js",
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [
            "",
            ".webpack.js",
            ".web.js",
            ".ts",
            ".tsx",
            ".js",
            ".scss"
        ]
    },
    module: {
        loaders: [
            { // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            { test: /bootstrap-sass\/assets\/javascripts\//, loader: "imports?jQuery=jquery" },
        ]
    }

};
