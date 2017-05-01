const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const sass = require("gulp-sass");

gulp.task("build", () => {
  return gulp.src("./src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(gulp.dest("./dist"))
});

gulp.task("css", () => {
  return gulp.src("./scss/main.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("./dist"))
});

gulp.task("default", () => {
  gulp.watch('./src/**/*.js', ['build']);
  gulp.watch('./scss/**/*.scss', ['css']);
});
