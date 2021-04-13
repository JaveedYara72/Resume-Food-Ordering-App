let mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js/app.js').sass('resources/scss/app.scss','public/css/app.css');

//the first parameter is the folder where we have the js files, the second parameter is where we want the files to be compiled