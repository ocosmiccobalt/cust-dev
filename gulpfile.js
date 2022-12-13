"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const del = require("del");
const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const htmlmin = require("gulp-htmlmin");
const webpack = require("webpack-stream");

const webpackDevOptions = {
  mode: "development",
  output: {
    environment: {
      arrowFunction: false
    },
    filename: "bundle.js"
  },
  watch: false,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  debug: true,
                  corejs: "3.26",
                  useBuiltIns: "usage"
                }
              ]
            ]
          }
        }
      }
    ]
  }
};

const webpackProdOptions = {
  mode: "production",
  output: {
    environment: {
      arrowFunction: false
    },
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  corejs: "3.26",
                  useBuiltIns: "usage"
                }
              ]
            ]
          }
        }
      }
    ]
  }
};

function style() {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
}

function clean() {
  return del("build");
}

function copy() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
}

function sprite() {
  return gulp.src("source/img/sprite-icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

function html() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

function jsDev() {
  return gulp.src("source/js/index.js")
    .pipe(webpack(webpackDevOptions))
    .pipe(gulp.dest("build/js"));
}

function jsProd() {
  return gulp.src("source/js/index.js")
    .pipe(webpack(webpackProdOptions))
    .pipe(gulp.dest("build/js"));
}

function serve(done) {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  done();
}

function reload(done) {
  server.reload();
  done();
}

function watch() {
  gulp.watch("source/sass/**/*.{scss,sass}", style);
  gulp.watch("source/*.html", gulp.series(html, reload));
  gulp.watch("source/js/**/*.js", gulp.series(jsDev, reload));
}

exports.style = style;
exports.clean = clean;
exports.copy = copy;
exports.sprite = sprite;
exports.html = html;
exports.jsDev = jsDev;
exports.jsProd = jsProd;
exports.buildDev = gulp.series(
  clean,
  gulp.parallel(
    copy,
    style
  ),
  sprite,
  gulp.parallel(
    html,
    jsDev
  )
);
exports.default = gulp.series(
  clean,
  gulp.parallel(
    copy,
    style
  ),
  sprite,
  gulp.parallel(
    html,
    jsProd
  )
);
exports.dev = gulp.series(serve, watch);
