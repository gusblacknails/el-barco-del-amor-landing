/**
 * Build process
**/

const autoprefixer  = require('autoprefixer');
const bs            = require('browser-sync');
const esbuild       = require('esbuild');
// const fs         = require('fs');
const fs            = require('fs-extra'); // All methods in fs are included in fs-extra
const nunjucks      = require('nunjucks');
const path          = require('path');
const postcss       = require('postcss');
const sass          = require('sass');
let data;





/**
 * Define all paths
**/
const paths = {
    // proxy: siteProxy,
    // base: './',
    src: './src',
    data: './data',
    dest: './public',

    scripts: {
        src: '/scripts',
        entry: 'scripts.js',
        dest: '/assets',
        output: 'scripts.js',
    },

    styles: {
        src: '/styles',
        entry: 'styles.scss',
        dest: '/assets',
        output: 'styles.css',
    },

    assets: {
        folders: [
            // '/fonts',
            '/images',
            '/videos',
        ],
        src: '/assets',
        dest: '/assets'
    }
};





/**
 * Build the directory structure
 * 1. Removing actual dest folder if it exists
 * 2. Create folders 'styles' and 'scripts' for fse
 * 3. Copy assets from 'fonts' and 'images'
**/
buildDirectories = () => {
    console.time("Building Directories in");

    // Check if directory exists with fs.stat
    if ( fs.existsSync(paths.dest) ) {
        fs.rmSync(paths.dest, { recursive:true }, (err) => {
            if (err) { console.error(err.message); }
        });
    };

    fs.mkdirSync(paths.dest, { recursive:true }, (err) => {
        if (err) { console.error(err.message); }
    });

    console.timeEnd("Building Directories in");
};





/**
 * Copy Assets to 'dist' folder
**/
copyAssets = () => {
    console.time("Copying Assets in");
    let folders = paths.assets.folders;

    folders.forEach(folder => {
        let folderSrc = paths.src + paths.assets.src + folder;
        let folderDest = paths.dest + paths.assets.dest + folder;
        fs.copySync(folderSrc, folderDest);
    });

    console.timeEnd("Copying Assets in");
};





/**
 * Compile Scripts
**/
compileScripts = () => {
    console.time('Building JavaScript in');

    esbuild.build({
        entryPoints: [ paths.src + paths.scripts.src + '/' + paths.scripts.entry ],
        bundle: true,
        minify: true,
        sourcemap: true,
        color: true,
        logLevel: 'error',
        // errorLimit: 1,
        target: [ 'es2015' ],
        outfile: paths.dest + paths.scripts.dest + '/' + paths.scripts.output
    }).catch((e) => {
        // errors managments (already done in esbuild)
        console.error(e);
    }).then(() => {
        console.timeEnd('Building JavaScript in');
    })
}





/*
 * Compile Styles
**/
compileStyles = () => {
    console.time('Compiling Styles in');

    // sass.render({
    //     file: paths.src + paths.styles.src + '/' + paths.styles.entry,
    //     outFile: paths.dest + paths.styles.dest + '/' + paths.styles.output,
    //     outputStyle: 'compressed',
    //     sourceMap: true

    // }, (error, result) => {

    //     if (error) {
    //         console.log('Error compiling main.scss');
    //         console.log(error.formatted);
    //     } else {
    //         postcss([ autoprefixer ])
    //         .process(result.css, { from: undefined })
    //         .then(prefixed => {

    //             prefixed.warnings().forEach(warn => {
    //                 console.warn(warn.toString())
    //             });

    //             fs.writeFileSync(
    //                 paths.dest + paths.styles.main + '.css',
    //                 prefixed.css
    //             );

    //             console.timeEnd("Compiling Styles in");
    //         });
    //     }
    // });

    let output = sass.compile(
        paths.src + paths.styles.src + '/' + paths.styles.entry,
        {
            style: 'compressed',
            // sourceMap: true - Not needed really
        }
    );

    if ( output ) {
        postcss([ autoprefixer ])
        .process( output['css'], { from: undefined } )
        .then(prefixed => {

            prefixed.warnings().forEach(warn => {
                console.warn(warn.toString())
            });

            fs.writeFileSync(
                paths.dest + paths.styles.dest + '/' + paths.styles.output,
                prefixed['css']
            );

            console.timeEnd("Compiling Styles in");
        });

    } else {
        console.log('Error compiling styles.');
    }
};





/**
 * Nunjucks Compilation
**/
compileTemplates = () => {
    console.time('Compiling Templates in');

    // Get Data
    // data = require('./data/data.json');
    data = JSON.parse(fs.readFileSync('./data/data.json'));

    // Configuration
    nunjucks.configure('./src', {
       autoescape: true
    });

    // Render
    fs.readdir( paths.src, function (err, files) {

        // Handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        // Listing all files using forEach
        files.forEach( (file) => {

            // Check if the file is a HTML
            if (path.extname(file) === '.html') {

                nunjucks.render(
                    file,
                    data,
                    (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            fs.writeFileSync(
                                paths.dest + '/' + file,
                                result
                            );
                        }
                    }
                );
            }
        });
    });

}





/**
 * On launch
 * 1. Create folder structure
 * 2. Copy Assets
 * 3. Compile Scripts
 * 4. Compile Styles
 * 5. Compile Templates
 * 6. Init Server
**/

buildDirectories();
copyAssets();
compileScripts();
compileStyles();
compileTemplates();

// Start the Browsersync server
bs.init({
    server: paths.dest,
    // proxy: paths.proxy,
    port: 8080,
    open: true,
    notify: false
});

// And call any methods on it:

// Templates
bs.watch([
    paths.src, // WP files are here
    paths.dest + '**/*'
]).on('change', bs.reload);

// Watch scripts
bs.watch([
    paths.src + paths.scripts.src + '/**/*'
]).on('change', () => {
    compileScripts();
});

// Watch styles
bs.watch([
    paths.src + paths.styles.src + '/**/*'
]).on('change', () => {
    compileStyles();
});

// Watch templates
bs.watch([
    paths.data + '/**/*.json',
    paths.src + '/**/*.html'
]).on('change', () => {
    compileTemplates();
});
