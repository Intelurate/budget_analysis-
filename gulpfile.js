var path = require('path');
var gulp = require('gulp');
var run = require('gulp-run');
var webpack = require('webpack');
var gutil = require("gulp-util");
var gls = require('gulp-live-server');
var env = require('gulp-env');
var _ = require('underscore');
const mocha = require('gulp-mocha');


var buildJSX = function (callback) {

    console.log('starting to build')

    var webpackConfig = require('./webpack.config');

    // add minification if using minified environment
    // if (minifiedEnvironments.indexOf(gutil.env.node_env) !== -1)

    //webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());

    webpack(webpackConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            chunks: false,
            colors: true
        }));
        callback();
    });
    
};


var watchServer = function(server){
    gulp.watch(['./controllers/*.js'], function () {
        server.start.apply(server);
    });
};

// var startServer = function(serverFilePath){
//     if (minifiedEnvironments.indexOf(gutil.env.node_env) !== -1)
//         run('NODE_ENV=' + gutil.env.node_env + ' forever ' + serverFilePath).exec();
//     var server = gls(['--harmony', serverFilePath], {env: {NODE_ENV: gutil.env.node_env}});
//     server.start();
//     watchServer(server);
// };


var startServer = function(serverFilePath){
    var server = gls(['--harmony', serverFilePath]);
    server.start();
    watchServer(server);

};

var startMainServer = function () {
    startServer('app.js');
};

gulp.task('server-start', startMainServer);

gulp.task('webpack:build-jsx', buildJSX);


gulp.task('watch:client', function () {
        var server = gls.static(); //equals to gls.static('public', 3000); 
        server.start();
        server.start.apply(server);
        gulp.watch('./reactApp/**/*', ['webpack:build-jsx']);
});


gulp.task('default', ['server-start', 'watch:client']);
