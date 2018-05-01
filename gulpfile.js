const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
	});

//
gulp.task('compass-imagehelper', function () {
    return gulp.src('sources/images/**/*.+(jpeg|jpg|png|gif|svg)')
        .pipe(compassImagehelper({
            targetFile: '_generated-imagehelper.scss', // default target filename is '_compass-imagehelper.scss' 
            // template: 'your-compass-imagehelper.mustache', 
            images_path: 'assets/images/',
            css_path: 'assets/css/',
            prefix: 'icon--'
        }))
        .pipe(gulp.dest('sass'));
});

gulp.task('default', ['serve']);