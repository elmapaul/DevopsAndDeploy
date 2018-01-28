module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            dist: {
                src: ['dev/css/*.css'],
                dest: 'static/css/main.css'
                },
            extra: {
                src: ['dev/js/*.js'],
                dest: 'static/js/main.js'
                }
            },/*
			javascript_obfuscator: {
				options: {
				  debugProtection: true,
				  debugProtectionInterval: true
				},
				main: {
				  files: {
					'static/js/main.min.js': ['static/js/main.js', 'src/module2.js']
				  }
				}
			},*/
			uglify: {
				    options: {
						mangle: false
					},
				dist: {
					src: 'static/js/main.js',
					dest: 'static/js/main-ugly.min.js'
					}
			},			
			cssmin: {
				dist: {
					src: 'static/css/main.css',
					dest: 'static/css/main.min.css'
					}
				}
        });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-javascript-obfuscator');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('build', ['concat', 'uglify', 'cssmin']);
    //grunt.registerTask('build', ['concat', 'javascript_obfuscator', 'uglify', 'cssmin']);
};