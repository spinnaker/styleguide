const gulp = require('gulp')

/* Build styleguide */
gulp.task('build:styleguide', function () {
    const concat = require('gulp-concat');
    const postcss = require('gulp-postcss');
    const autoprefixer = require('autoprefixer');
    const customProperties = require('postcss-css-variables');
    const Import = require('postcss-import');
    const styleGuide = require('postcss-style-guide');
    const extend = require('postcss-extend');
    const nano = require('cssnano');
    const exportVars = require('postcss-export-vars');

    return gulp.src('./src/styles/app.css')
      .pipe(postcss([
          Import,
          extend,
          exportVars({
            type: 'json',
            file: './public/css-vars.json'
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
      .pipe(gulp.dest('.'))
})

gulp.task('default', function() {
  gulp.watch(['./src/styles/*.css', './src/styleguide-template/*.*'], 
    ['build:styleguide']);
})