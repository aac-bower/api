

module.exports = function( gulp, plugin ) {
    var root      = './';
    var clientSrc = root + '/src';
    var clientApp = clientSrc + '/app';
    var asset     = clientSrc + '/asset';

    var component = {
        name: 'app',
        build: {
            root: '/build/',
            production: true
        }
    };


    function getTask( name ) {
        return require('./task/' + name + '.js')( gulp, plugin, config );
    }

    var config = {
        component: component,
        client: {
            dir: {
                src:       clientSrc,
                app:       clientApp,
                tpm:       root + '.tmp',
                css:       root + '.tmp/css',
                data:      root + 'data',
                asset:     asset,
                image:     asset + '/image',
                fonts:     asset + '/fonts',
                bower:     root + 'bower_components',
                build:     root + component.build.root,
                buildDist: root + component.build.root + '/dist',
                buildSrc:  root + component.build.root + '/src'
            },
            path: {
                css:        root + '.tmp/css/style.css',
                indexHtml:  clientSrc + '/index.html',
                styleScss:  clientSrc + '/index.style.scss',
                vendorScss: clientSrc + '/index.vendor.scss',
                bower:      root + 'bower.json'
            },
            glob: {
                buildDist: root + component.build.root + '/dist/**',
                asset:     clientSrc + '/asset/**/*',
                image:     clientSrc + '/asset/image/**',
                fonts:     clientSrc + '/asset/fonts/**',
                sass:      clientApp + '/**/*.scss',
                js:        clientApp + '/**/*.js',
                html:      clientSrc + '/**/*.html',
                template:  clientApp + '/**/*.html',
                src:       clientSrc + '/**/*',
                css:       root + '.tmp/css/**/*.css'
            }
            
        },
        error: {
            params: {
                title:    'Gulp',
                message:  '<%= error.message %>',
                sound: false
            },
            handler: function(err) {
                plugin.notify.onError( config.error.params )(err);

                if ( this.emit !== undefined ) this.emit('end');
            }
        }
    };

    config.task = {
        cacheTemplate: getTask('cacheTemplate'),
        clean: getTask('clean'),
        copy: getTask('copy'),
        font: getTask('font'),
        html: getTask('html'),
        image: getTask('image'),
        inject: getTask('inject'),
        replace: getTask('replace'),
        sass: getTask('sass'),
        serve: getTask('serve'),
        serveBuild: getTask('serveBuild'),
        watch: getTask('watch'),
        wiredep: getTask('wiredep')
    };

    return config;
};