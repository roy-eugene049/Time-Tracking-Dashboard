// Imports
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');

// Compile Sass into CSS
function compileScss() {
  return src('assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(dest('dist/css'));
}

// Minify JS
function jsMin() {
  return src('assets/js/**/*.js').pipe(terser()).pipe(dest('dist/js'));
}

// Watch files for changes
function watchTask() {
  watch('assets/scss/**/*.scss', compileScss);
  watch('assets/js/**/*.js', jsMin);
}

// Run functions
exports.default = series(compileScss, jsMin, watchTask);
