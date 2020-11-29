let preprocessor = 'less';

const { src, dest, parallel, series, watch } = require('gulp');
const browserSync   = require('browser-sync').create();
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify-es').default;
const sass          = require('gulp-sass');
const less          = require('gulp-less');
const autoprefixer  = require('gulp-autoprefixer');
const cleancss      = require('gulp-clean-css');
const imagemin      = require('gulp-imagemin');
const newer         = require('gulp-newer');
const del           = require('del');

function browsersync() {
  browserSync.init({
    server: { baseDir: 'build/' },
    notify: false,
    online: true
  })
}

function scripts() {
  return src('source/js/**/*.js')
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(dest('build/js/'))
  .pipe(browserSync.stream())
}

function styles() {
  return src('source/' + preprocessor + '/style.' + preprocessor + '')
  .pipe(eval(preprocessor)())
  .pipe(concat('style.min.css'))
  .pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions'], grid: true }))
  .pipe(cleancss(( { level: { 1: { specialComments: 0 } }/*, format: 'beautify'*/ } )))
  .pipe(dest('build/css/'))
  .pipe(browserSync.stream())
}

function html() {
  return src('source/*html')
    .pipe(dest("build"))
    .pipe(browserSync.stream());
}

function images() {
  return src('source/images/**/*.{png,jpg,svg}')
  .pipe(newer('build/images/'))
  .pipe(imagemin())
  .pipe(dest('build/images/'))
}

function cleanimg() {
  return del('build/images/**/*', { force: true })
}

function cleanbuild() {
  return del('build/**/*', { force: true })
}

//function buildcopy() {
//  return src([
//    'app/css/**/*.min.css',
//    'app/js/**/*.min.js',
//    'app/images/dest/**/*',
//    'app/**/*.html',
//  ], { base: 'source' })
//  .pipe(dest('dist'));
//}

function startwatch() {
  watch('source/**' + preprocessor + '/**/*', styles);
  watch(['source/**/*.js', '!app/**/*.min.js'], scripts);
  watch('source/**/*.html', html);
  watch('source/images/src/**/*', images);
}

exports.browsersync  = browsersync;
exports.scripts      = scripts;
exports.styles       = styles;
exports.html         = html;
exports.images       = images;
exports.cleanimg     = cleanimg;
exports.build        = series(cleanbuild, styles, scripts, html, images)

exports.default      = parallel(styles, html, scripts, browsersync, startwatch);




















