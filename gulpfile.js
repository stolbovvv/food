const path = require('path');
const gulp = require('gulp');
const rename = require('gulp-rename');
const webpack = require('webpack-stream');
const gulpZIP = require('gulp-zip');
const cleanCSS = require('gulp-clean-css');
const deleteAsync = require('del');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

// Variables setting
const _rootName = path.basename(__dirname);
const _tempName = '.temp';
const _buildName = 'dist';
const _sourceName = 'app';
const _modeIsDev = !process.argv.includes('--production');
const _modeIsProd = process.argv.includes('--production');

// Processing Bundle CSS
function collectCSS() {
  return gulp
    .src([`./${_sourceName}/css/**/*.css`, `!./${_sourceName}/css/**/*.min.css`], { sourcemaps: _modeIsDev })
    .pipe(autoprefixer({ grid: 'autoplace', cascade: true }))
    .pipe(gulp.dest(`./${_tempName}/css/`))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`./${_sourceName}/css/`, { sourcemaps: './' }))
    .pipe(browserSync.stream());
}

// Processing Bundle JS
async function collectJS() {
  return gulp
    .src(`./${_sourceName}/js/main.js`)
    .pipe(
      webpack({
        mode: _modeIsDev ? 'development' : 'production',
        devtool: 'source-map',
        output: {
          filename: 'common.js',
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            },
          ],
        },
      }),
    )
    .pipe(gulp.dest(`./${_sourceName}/js/`))
    .pipe(browserSync.stream());
}

// Processing build project
function collectBuild() {
  return gulp
    .src(
      [
        `./${_sourceName}/**/*.html`,
        `./${_sourceName}/js/**/*.min.js`,
        `./${_sourceName}/css/**/*.min.css`,
        `./${_sourceName}/fonts/**/*.*`,
        `./${_sourceName}/images/**/*.*`,
        `./${_sourceName}/site.webmanifest`,
        `./${_sourceName}/favicon.ico`,
        `./${_sourceName}/{favicon*,android*,apple*}.png`,
        `./${_sourceName}/server.php`,
      ],
      { base: `./${_sourceName}/` },
    )
    .pipe(gulp.dest(`./${_buildName}/`))
    .pipe(gulp.src(`./${_tempName}/{js,css}/**/*.*`, { base: `./${_tempName}/` }))
    .pipe(gulp.dest(`./${_buildName}/`));
}

// Processing archiving build
function collectArchive() {
  return gulp
    .src(`./${_buildName}/**/*.*`)
    .pipe(gulpZIP(`${_rootName}.zip`))
    .pipe(gulp.dest('./'));
}

// Starting a server with file watching
function runServer() {
  browserSync.init({
    // proxy: 'food.develop',
    server: {
      baseDir: `./${_sourceName}/`,
    },
    port: 1234,
    open: true,
    online: true,
    notify: false,
  });

  gulp.watch([`./${_sourceName}/**/*.html`]).on('change', browserSync.reload);
  gulp.watch([`./${_sourceName}/js/**/*.js`, `!./${_sourceName}/js/**/common.js`], collectJS);
  gulp.watch([`./${_sourceName}/css/**/*.css`, `!./${_sourceName}/css/**/*.min.css`], collectCSS);
}

// Clean command
const cleanTemp = () => deleteAsync([`./${_tempName}/**/*`]);
const cleanBuild = () => deleteAsync([`./${_buildName}/**/*`]);
const cleanArchive = () => deleteAsync([`./${_rootName}.zip`]);

// Base tasks
exports.clean = gulp.series(cleanTemp, cleanBuild, cleanArchive);
exports.build = gulp.series(cleanTemp, cleanBuild, collectJS, collectCSS, collectBuild);
exports.archive = gulp.series(cleanTemp, cleanBuild, collectJS, collectCSS, collectBuild, cleanArchive, collectArchive);

// Default task
exports.default = gulp.series(collectJS, collectCSS, runServer);
