import * as gulp from "gulp";
import * as sass from "gulp-sass";
import * as plumber from "gulp-plumber";
import * as prefix from "gulp-autoprefixer";
import * as nodemon from "gulp-nodemon";
import * as chalk from "chalk";
import * as webpack from "webpack-stream";
import * as uglify from "gulp-uglify";
const livereload = require("gulp-livereload"); // to disable error


const options = {
    pug: {
        "pretty": true
    },

    styles: {
        sass: {
            includePaths: ["./node_modules/bootstrap-sass/assets/stylesheets"],
            style: { outputStyle: "expanded" },
            src: "public/stylesheets/*.scss",
        },
        prefixer: {
            browsers: ["last 10 versions"],
            cascade: false
        },
    }
};

gulp.task("nodemon", () => {

    nodemon({
        script: "server.ts",
        ext: "ts pug css",
        execMap: {
            "ts": "ts-node"
        }
    }).on("restart", () => {
        livereload.reload();
    });

});
gulp.task("styles", () => {
    let opt = options.styles;
    gulp.src(opt.sass.src).
        pipe(sass(options.styles.sass).on("error", sass.logError)).
        pipe(prefix(opt.prefixer)).
        pipe(gulp.dest("public/stylesheets"));

});
gulp.task("ts", () => {
    gulp.src(["public/scripts/*.ts"]).
        pipe(webpack(require("./webpack.config.ts"))).
        pipe(uglify()).
        pipe(gulp.dest("public/scripts"));
});
gulp.task("watch", () => {
    livereload.listen({ "port": 35729 });
    gulp.watch("public/stylesheets/*.scss", ["styles"]);
    gulp.watch("public/scripts/*.ts", ["ts"]);
});


gulp.task("default", ["styles", "nodemon", "watch"]);
