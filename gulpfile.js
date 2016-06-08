var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

var jsFileList = [
    'assets/js/fabric.min.js',
    
    'assets/js/wapuu-creator.js'
];

gulp.task( 'sass', function() {
    gulp.src('./assets/scss/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
                outputStyle: 'compressed'
            })
            .on('error', sass.logError)
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'));
});


gulp.task( 'js', function(){
    gulp.src(jsFileList)
        .pipe(concat('wapuu-creator.js'))
        .pipe(gulp.dest('./build/js/'));
});


gulp.task( 'default', ['sass', 'js'], function(){
    gulp.watch('./assets/scss/*.scss', ['sass'] );
    gulp.watch(jsFileList, ['js'] );
});
