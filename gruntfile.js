module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({

    // source file locations
    srcFiles: [
      "src/**/*.purs",
      "bower_components/purescript-*/src/**/*.purs"
    ],

    // tasks
    dotPsci: ["<%=srcFiles%>"],
    pscMake: ["<%=srcFiles%>"],

    psc: {
      options: {
        modules: 'Main',
        main: 'Main'
      },

      all: {
        src:  ["<%=srcFiles%>"],
        dest: "output/main.js"
      }
    },

    pscDocs: {
      readme: {
        src: "src/**/*.purs",
        dest: "documentation.md"
      }
    }

  });

  grunt.loadNpmTasks("grunt-purescript");
  grunt.registerTask("default", ["psc:all", "dotPsci", "pscDocs"]);
};
