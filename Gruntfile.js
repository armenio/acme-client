module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            'assets/local/dist/js/main.min.js': [
                'assets/local/src/js/plugins.js',
                'assets/local/src/js/main.js'
            ],
            'assets/local/dist/js/app.min.js': [
                'assets/local/src/js/app.js',
                'assets/local/src/js/products.js'
            ],
            'assets/local/dist/js/register.min.js': [
                'assets/local/src/js/register.js',
            ],
            'assets/local/dist/js/login.min.js': [
                'assets/local/src/js/login.js',
            ]
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'assets/local/dist/css/main.css': 'assets/local/src/css/main.scss'
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'assets/local/dist/css/main.min.css': 'assets/local/dist/css/main.css'
                }
            }
        }
    });

    // carrega plugins
    //npm install grunt-contrib-uglify --save-dev
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //npm install grunt-sass --save-dev
    grunt.loadNpmTasks('grunt-sass');
    //npm install grunt-contrib-cssmin --save-dev
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'sass', 'cssmin']);
};