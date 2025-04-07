const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify')

function scripts() {
    return  gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
}

function html() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
}

async function images() {
    const imagemin = (await import('gulp-imagemin')).default;
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({
            style: 'compressed'
        }))
        .pipe(gulp.dest('./dist/css'));
}

exports.default = gulp.parallel(styles, images, scripts, html);

exports.watch = function() {
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles));
    gulp.watch('./src/scripts/*.js' , gulp.parallel(scripts))
};
