// `npm install --save replace`
var gulp = require('gulp');
var replace = require('replace');
var replaceFiles = ['./src/providers/user-data\.ts', './src/providers/conference-data\.ts'];

gulp.task('add-proxy', function() {
  return replace({
    regex: "https://floating-beach-22005.herokuapp.com/",
    replacement: "/server",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
})

gulp.task('remove-proxy', function() {
  return replace({
    regex: "/server",
    replacement: "https://floating-beach-22005.herokuapp.com",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
})
