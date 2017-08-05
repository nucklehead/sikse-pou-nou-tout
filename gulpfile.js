// `npm install --save replace`
var gulp = require('gulp');
var replace = require('replace');
var replaceFiles = ['./src/providers/user-data\.ts', './src/providers/conference-data\.ts'];

gulp.task('add-proxy', function() {
  return replace({
    regex: "https://sikse-pou-nou-tout.herokuapp.com",
    replacement: "/api",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
})

gulp.task('remove-proxy', function() {
  return replace({
    regex: "/api",
    replacement: "https://sikse-pou-nou-tout.herokuapp.com",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
})
