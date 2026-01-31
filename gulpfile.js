const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");

// ====== caminhos (bate com a sua estrutura do print) ======
const paths = {
  styles: "src/scss/**/*.{scss,sass}",
  scripts: "src/js/**/*.js",
  distCss: "dist/css",
  distJs: "dist/js",
};

// ====== SASS -> CSS ======
function styles() {
  return gulp
    .src(paths.styles)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest(paths.distCss));
}

// ====== JS -> minificado ======
function scripts() {
  return gulp
    .src(paths.scripts)
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(paths.distJs));
}

// ====== Watch ======
function watchFiles() {
  gulp.watch(paths.styles, styles);
  gulp.watch(paths.scripts, scripts);
}

// tarefas
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watchFiles;

// TAREFA PADRÃO (resolve o "Task never defined: default")
exports.default = gulp.series(gulp.parallel(styles, scripts), watchFiles);
