var gulp = require('gulp');
var gutil = require('gulp-util');
var flatten = require('gulp-flatten');
var gulpFilter = require('gulp-filter');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var gulpSass = require('gulp-sass');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var assetsInstalled = false;

var config = {
    assetsDir: 'assets',
    jsDir: 'assets/js/',
    sassDir: 'assets/scss/',
    cssDir: 'assets/css/',
    imgDir: 'assets/img/',
    fontDir: 'assets/fonts/',
    sassPattern: 'sass/**/*.scss',
    jsFilter: gulpFilter('*.js'),
    cssFilter: gulpFilter('*.css'),
    fontFilter: gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']),
    production: !!gutil.env.production,
    bowerFiles: {
        js: [
            'assets/bower/src/bootstrap/dist/bootstrap.js',
            'assets/bower/src/bootstrap/dist/js/bootstrap.js',
            'assets/js/main.js'
        ],
        fonts: [
            'assets/bower/src/bootstrap/fonts/glyphicons-halflings-regular.eot',
            'assets/bower/src/bootstrap/fonts/glyphicons-halflings-regular.svg',
            'assets/bower/src/bootstrap/fonts/glyphicons-halflings-regular.ttf',
            'assets/bower/src/bootstrap/fonts/glyphicons-halflings-regular.woff',
            'assets/bower/src/bootstrap/fonts/glyphicons-halflings-regular.woff2',
            'assets/bower/src/fontawesome/fonts/FontAwesome.otf',
            'assets/bower/src/fontawesome/fonts/fontawesome-webfonts.eot',
            'assets/bower/src/fontawesome/fonts/fontawesome-webfonts.svg',
            'assets/bower/src/fontawesome/fonts/fontawesome-webfonts.ttf',
            'assets/bower/src/fontawesome/fonts/fontawesome-webfonts.woff',
            'assets/bower/src/fontawesome/fonts/fontawesome-webfonts.woff2'
        ],
        css: [
            'assets/bower/src/fontawesome/css/font-awesome.css',
            'assets/bower/src/bootstrap/dist/css/bootstrap.css',
            'assets/css/main.css'
        ]
    }
};

//check for prod/dev
gulp.task('check', function(){
    assetsInstalled = false;
    if(config.production) {
        console.log("Running in Production mode");
    }else{
        console.log("Running in Dev mode");
    }
});

//install bower dependencies
gulp.task('publish-bower-assets', function(){

    //js files
    for (jsFile in config.bowerFiles.js) {
        console.log('Copying JS file: ' + config.bowerFiles.js[jsFile]);
        gulp.src(config.bowerFiles.js[jsFile])
            .pipe(uglify())
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest(config.jsDir));
    }

    //css files
    for (cssFile in config.bowerFiles.css) {
        console.log('Copying CSS file: ' + config.bowerFiles.css[cssFile]);
        gulp.src(config.bowerFiles.css[cssFile])
            .pipe(minifycss())
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest(config.cssDir));
    }

    //Fonts
    for (fontFile in config.bowerFiles.fonts) {
        console.log('Copying Font file: ' + config.bowerFiles.fonts[fontFile]);
        gulp.src(config.bowerFiles.fonts[fontFile])
            .pipe(flatten())
            .pipe(gulp.dest(config.fontDir));
    }

    assetsInstalled = true;
});

// Lint JS
gulp.task('lint', function() {
    //exclude bootstrap as it is missing semicolons
    return gulp.src([config.jsDir+'*.js', '!'+config.jsDir+'bootstrap.*'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Sass into css dir
gulp.task('sass', function() {
    return gulp.src(config.sassDir+'*.scss')
        .pipe(gulpSass())
        .pipe(gulp.dest(config.cssDir));
});

//Watch Files For Changes in dev only
gulp.task('watch', function() {
    if(!config.production) {
        gulp.watch(config.jsDir+'main.js', ['lint', 'publish-bower-assets']);
        gulp.watch(config.cssDir+'main.css', ['lint', 'publish-bower-assets']);
        gulp.watch(config.scssDir+'*.scss', ['sass']);
    }
});

//remove bower files if in production and they have been installed correctly
gulp.task('clean-assets', function(){
    if(config.production && assetsInstalled) {

        console.log('Removing Bower assets');
        return gulp.src('assets/bower', {read: false})
            .pipe(clean());

    }else{
        console.log('Bower assets left as running in dev or publish failed!');
    }
});

//default task
gulp.task('default', ['check', 'publish-bower-assets', 'lint', 'sass', 'clean-assets', 'watch']);

