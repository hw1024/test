var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var cssnano = require('cssnano');
var precss = require('precss');
var cssnext = require('cssnext');
var stylelint = require('stylelint'); 
var reporter = require('postcss-reporter');
var cssModules = require('postcss-modules');
var posthtml = require('gulp-posthtml');
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');

function getJSONFromCssModules(cssFileName, json) {
   	var cssName = path.basename(cssFileName, '.css');
    var jsonFileName = path.resolve('dest/', 'cssModules', cssName + '.js');
    mkdirp.sync(path.dirname(jsonFileName));
    fs.writeFileSync(jsonFileName, "module.exports = " + JSON.stringify(json) + ";");
};

gulp.task('styles',function(){
	return gulp.src('src/css/*.css')
		.pipe(postcss([
			autoprefixer,
			precss,
			cssnext,
			cssModules({ getJSON: getJSONFromCssModules }),
		]))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('maps/'))
		.pipe(gulp.dest('dest/css'));
});

gulp.task('rename', ['styles'], function(){
	return gulp.src('dest/css/style.css')
		.pipe(postcss([
			cssnano,
		]))
		.pipe(rename('style.min.css'))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('maps/'))
		.pipe(gulp.dest('dest/css'));
});

gulp.task('html', ['styles'], function(){
	return gulp.src('app/**/*.html')
		.pipe(posthtml([ require('posthtml-css-modules')(path.join('dest/', 'cssModules')) ]))
		.pipe(gulp.dest('dest/'));
});

// gulp.task("lint-styles", function() {
// 	return gulp.src("src/css/*.css")
// 	.pipe(postcss([ 
// 		stylelint({
// 			"rules": {
// 				"color-no-invalid-hex": true,
// 				"declaration-colon-space-before": [2, "never"],
// 				"indentation": [2, 2],
// 				"number-leading-zero": [2, "always"]
// 			}
// 		}),
// 		reporter({ 
// 			clearMessages: true,
// 		})
// 	]))
// });

// gulp.task('default', ['lint-styles', 'styles', 'rename'])
gulp.task('default', ['html', 'styles', 'rename'])

var watcher = gulp.watch(['src/css/*.css','app/**/*.html'] , ['default']);
watcher.on('change', function(event) { 
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...'); 
});