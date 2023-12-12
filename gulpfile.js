'use strict';
var gulp = require('gulp');
var argv = require('yargs').argv;
var sassLint = require('gulp-sass-lint');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var bs = require('browser-sync').create();
var pixrem = require('gulp-pixrem');
const sass = require('gulp-sass')(require('sass'));
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var browserslist = require('browserslist');

var paths = {
  sassSrc: './pattern-lab/source/_patterns/**/**/*.{scss,sass}',
  sassDest: 'css',
  jsSrc: ['js/source/*.js', 'js/component/*.js'],
  jsDest: 'js/build',
  imgSrc: 'images/source/**/*.{png,jpg,gif}',
  imgDest: 'images/optimized',
  svgSrc: 'images/source/**/*.svg',
  svgDest: 'images/optimized'
};

gulp.task('scss', function () {
  return gulp.src(paths.sassSrc)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write({ includeContent: false }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(autoprefixer())
    .pipe(pixrem())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.sassDest))
    .pipe(bs.stream());
});

gulp.task('js', function () {
  return gulp.src(paths.jsSrc)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [
        ['@babel/preset-env', {
          targets: browserslist()
        }]
      ]
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.jsDest));
});

gulp.task('sass-lint', function () {
  return gulp.src(paths.sassSrc)
    .pipe(sassLint({
      configFile: '.sasslintrc'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

// Watch files for change and set Browser Sync
gulp.task('watch', function () {
  bs.init({
    files: [
      'css/**/*.css',
      'templates/**/*.twig',
      'images/optimized/**/*.{png,jpg,gif,svg}',
      'js/build/**/*.js',
      '*.theme'
    ],
    proxy: argv.proxy
  });
  gulp.watch(paths.sassSrc, gulp.series('scss'));
  gulp.watch(paths.jsSrc, gulp.series('js')).on('change', bs.reload);
});

// Default task
gulp.task('default', gulp.series('scss', 'js', 'sass-lint', 'watch'));

// Build Prod
gulp.task('build:prod', gulp.series('scss', 'js', 'sass-lint'));
