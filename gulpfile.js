'use strict';

const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const babel = require('gulp-babel');
const del = require('del');

const lib = 'lib';
const dist = 'dist';
const src = './src/**/*.js';

gulp.task('clean-lib', function() {
  return del([lib]);
});

gulp.task('clean-dist', function() {
  return del([dist]);
});

gulp.task('node-lib', gulp.series(['clean-lib'], function () {
  return gulp.src(src)
    .pipe(babel())
    .pipe(gulp.dest(lib));
}));

gulp.task('browser-dist', gulp.series(['clean-dist'], function() {
  return webpackStream({
      entry: {
        'dzhyun-connection': './src/index.js',
        'dzhyun-connection.min': './src/index.js',
        'dzhyun-connection-http': './src/HttpConnection.js',
        'dzhyun-connection-http.min': './src/HttpConnection.js',
        'dzhyun-connection-ws': './src/WebSocketConnection.js',
        'dzhyun-connection-ws.min': './src/WebSocketConnection.js'
      },
      output: {
        filename: '[name].js',
        library: 'DzhyunConnection',
        libraryTarget: 'umd',
      },
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        }],
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          include: /\.min\.js$/,
          minimize: true
        }),
      ],
      devtool: 'source-map'
    }, webpack)
    .pipe(gulp.dest(dist));
}));

gulp.task('default', gulp.series('node-lib', 'browser-dist'));
