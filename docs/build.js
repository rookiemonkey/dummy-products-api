const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const del = require('del');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const stripCssComments = require('gulp-strip-css-comments');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');

const paths = {
    html: {
        src: './index.html',
        dest: '../public'
    },
    styles: {
        src: './assets/css/*.css',
        dest: '../public/assets/css',
        output: 'main' // w/o extension name
    },
    scripts: {
        src: './assets/js/*.js',
        dest: '../public/assets/js',
        output: 'main.js'
    },
    images: {
        src: './assets/images/*.png',
        dest: '../public/assets/images'
    },
    svgs: {
        src: './assets/images/*.svg',
        dest: '../public/assets/images'
    },
    fonts: {
        src: './assets/fonts/*',
        dest: '../public/assets/fonts'
    }
};


// delete the old public version
const clean = () => del(['../public'], { force: true });



// Copies all html files
const html = () =>
    gulp
        .src(paths.html.src)
        .pipe(plumber())
        .pipe(htmlmin({
            minifyCSS: true, // inline css,
            minifyJS: true, // inline js, not working
            removeComments: true,
            removeAttributeQuotes: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(paths.html.dest));



// Convert scss to css, auto-prefix and rename into styles.min.css
// works both for css and sass files, not only for sass files
const styles = () =>
    gulp
        .src(paths.styles.src)
        .pipe(plumber())
        .pipe(stripCssComments({ preserve: false }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({ basename: paths.styles.output }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());



// Minify all javascript files and consolidate them into a single .js file
const scripts = () =>
    gulp
        .src(paths.scripts.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(concat(paths.scripts.output))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest));



// Copy the IMAGES folder/contents minified
const images = () =>
    gulp
        .src(paths.images.src)
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));


// Copy the SVGS folder/contents
const svgs = () =>
    gulp
        .src(paths.svgs.src)
        .pipe(plumber())
        .pipe(gulp.dest(paths.svgs.dest));


// Copy the FONTS folder/contents
const fonts = () =>
    gulp
        .src(paths.fonts.src)
        .pipe(plumber())
        .pipe(gulp.dest(paths.fonts.dest));



// Define the series of tasks needed to accomplished by gulp
const build = gulp.series(
    clean,
    gulp.parallel(html, styles, scripts, images, fonts, svgs)
);

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.build = build;
exports.default = build;