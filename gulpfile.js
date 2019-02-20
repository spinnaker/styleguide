const gulp = require('gulp')
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const customProperties = require('postcss-css-variables');
const Import = require('postcss-import');
const styleGuide = require('postcss-style-guide');
const extend = require('postcss-extend');
const nano = require('cssnano');
const extractVars = require('postcss-extract-vars');

function styles() {
  return gulp.src('./src/styles/app.css')
    .pipe(postcss([
      Import,
      extend,
      extractVars({
        file: './public/customVars.css'
      }),
      customProperties({ preserve: true }),
      autoprefixer,
      styleGuide({
        project: 'Spinnaker',
        dest: './public/styleguide.html',
        showCode: false,
        themePath: './src/styleguide-template/'
      }),
      nano
    ]))
    .pipe(concat('./public/styleguide.min.css'))
    .pipe(gulp.dest('.'));
}

let build = gulp.series(styles);

function watch() {
  gulp.watch(['./src/styles/*.css', './src/styleguide-template/*.*'],
    build);
}
 
exports.watch = watch;
exports.styles = styles;

gulp.task('default', watch);
gulp.task('build', build);