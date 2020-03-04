const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notifier = require('node-notifier');

sass.compiler = require('node-sass');
function myError(error) {
    console.log(error.formatted);
    notifier.notify({
        title: 'Błąd',
        message: error.formatted
    });


}
function server(cb){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    cb();
}

function css(){
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "expanded"//nested, compact, compressed
        }).on('error', myError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}
function watch(cb){
    gulp.watch('./scss/**/*.scss', gulp.series('css'))
    gulp.watch("./*.html").on('change', browserSync.reload);
    // gulp.watch('./scss/**/*.scss', gulp.pararel('css'))
    cb()
}
exports.css=css;
exports.watch=watch;
exports.default=gulp.series(server,css, watch);