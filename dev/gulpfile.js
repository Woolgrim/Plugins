
// Папка з готовим проектом
let project_folder  = require('path').basename(__dirname);

// Папка з проектом
let src_folder      = "#src";

let fs = require ('fs');
// Шляхи до файлів
let path = {
    build:{
        html:   project_folder + "/",
        css:    project_folder + "/css",
        js:     project_folder + "/js",
        img:    project_folder + "/img",
        video:  project_folder + "/video",
        fonts:  project_folder + "/fonts",
        php:  	project_folder + "/",
    },
    src:{
        html:   [src_folder + "/*.html", "!" + src_folder + "/_*.html"],
        css:    src_folder + "/scss/style.scss",
        js:     src_folder + "/js/main.js",
        img:    src_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        video:  src_folder + "/video/*",
        fonts:  src_folder + "/fonts/*.ttf",
		php:  	src_folder + "/*.php"
    },
    watch:{
        html:   src_folder + "/**/*.html",
        css:    src_folder + "/scss/**/*.scss",
        js:     src_folder + "/js/**/*.js",
        img:    src_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/"
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync   = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass')(require('sass')),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    groupMediaQ	= require('gulp-group-css-media-queries'),
    uglify = require('gulp-uglify-es').default,
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter'),
    plumber = require('gulp-plumber');
// Очистка відлишніх файлів
function clean () {
    return del(path.clean)
}
// Лайв сервер
function browserSync () {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        notify: false
    })
}

// Робота з html
function html() {
	return src(path.src.html, {})
    .pipe(plumber())
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}
// Робота з css
function css () {
    return src(path.src.css)
    .pipe(plumber())
    .pipe(scss({ outputStyle: 'expanded' }).on('error', scss.logError))
    .pipe(
        autoprefixer({
            overrideBrowserslist : ['last 10 version'],
            grid: true
        })
    )
	.pipe(groupMediaQ())
    .pipe(concat('style.css'))
    .pipe(dest(path.build.css))
    .pipe(dest(path.build.css))
    .pipe(scss({outputStyle: "compressed"}))
    .pipe(concat('style.min.css'))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}
// Робота з js
function js() {
	return src(path.src.js, {})
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
    
}
// Робота з img
function img() {
	return src(path.src.img, {})
    .pipe(newer(path.build.img))
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}
// Робота з video
function video () {
	return src (path.src.video)
	.pipe(plumber())
	.pipe(dest(path.build.video))
}
// Робота з fonts
function fonts () {
    return src (path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))
}
function otf2ttf () {
    return src ([src_folder + '/fonts/*.otf'])
    .pipe(plumber())
    .pipe(fonter({
        formats: ['ttf']
    }))
    .pipe(dest(src_folder + '/fonts/'))
}


function fontsStyle () {
    let file_content = fs.readFileSync(src_folder + '/scss/option/fonts.scss');
    if (file_content == '') {
        fs.writeFile(src_folder + '/scss/option/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(src_folder + '/scss/option/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}
function cb () {}
// Робота з php
function php () {
	return src (path.src.php)
    .pipe(plumber())
	.pipe(dest(path.build.php))
}
// Оновлює сторінку при зміні в файлі
function watchFiles () { 
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], img);
}

let build = gulp.series(clean, otf2ttf, gulp.parallel(html, php, css, video, img, js, fonts), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.otf2ttf = otf2ttf;
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.img = img;
exports.video = video;
exports.js = js;
exports.css = css;
exports.php = php;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default =  watch;