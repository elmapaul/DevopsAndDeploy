module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            dist: {
                src: ['dev/css/*.css'],
                dest: 'static/css/main.css'
                },
            dist: {
                src: ['dev/js/*.js'],
                dest: 'static/js/main.js'
                }
            },
        uglify: {
            dist: {
                src: 'static/js/main.js',
                dest: 'static/js/main.min.js'
                }
            },
        cssmin: {
            dist: {
                src: 'dev/css/main.css',
                dest: 'static/css/main.min.css'
                }
            }
        });
    grunt.loadNpmTasks('grunt-javascript-obfuscator');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('build', ['concat', 'uglify', 'cssmin']);
};