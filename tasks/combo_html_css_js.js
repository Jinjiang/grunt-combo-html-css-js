/*
 * grunt-combo-html-css-js
 * https://github.com/jinjiang/grunt-combo-html-css-js
 *
 * Copyright (c) 2014 Jinjiang
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  /**
   * find all stylesheet links and javascript tags,
   * read the css/js file to fill in the html code
   * 
   * @param  {string} filepath
   * @return {string}
   */
  function combo(filepath) {
    var linkPattern = /<link\s([^>]+)>/g;
    var scriptPattern = /<script\s([^>]+)>/g;

    var html = grunt.file.read(filepath);

    html = html.replace(linkPattern, function (content) {
      var href = getAttribute(content, 'href');
      var ignore = getAttribute(content, 'ignore');

      if (href.match(/\/\//) || isTruthy(ignore)) {
        return content;
      }
      return '<style>\n' + grunt.file.read(path.join(filepath, '../', href)) + '\n</style>';
    });

    html = html.replace(scriptPattern, function (content) {
      var src = getAttribute(content, 'src');
      var ignore = getAttribute(content, 'ignore');

      if (src.match(/\/\//) || isTruthy(ignore)) {
        return content;
      }
      return '<script>\n' + grunt.file.read(path.join(filepath, '../', src)) + '\n';
    });

    return html;
  }

  function isTruthy(str) {
    return str !== 'false' && str !== undefined
  }

  function getAttribute(content, name) {
    var attrs = content.match(/(?!\s)[^<>\s]+/g) || [];
    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var pairs = attr.split('=', 2);
      if (pairs.length === 1) {
        pairs[1] = '';
      }
      if (pairs[0] === name) {
        // remove "..." or '...'
        return pairs[1].replace(/('|").+\1/, function (str) {
          return str.substring(1, str.length - 1);
        });
      }
    }
  }

  grunt.registerMultiTask('comboall', 'Combine css links and javscript files to html file with inline tags automatically', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      extDot: 'last',
      ext: '.combo.html'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function (f) {

      // Concat specified files.
      var src = f.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function (filepath) {
        var dest = f.dest;
        var dotIndex;

        // Handle options.
        if (!dest) {
          if (options.extDot === 'last') {
            dotIndex = filepath.lastIndexOf('.');
          }
          else {
            dotIndex = filepath.indexOf('.');
          }
          if (dotIndex >= 0) {
            dest = filepath.substr(0, dotIndex) + options.ext;
          }
          else {
            dest = filepath + options.ext;
          }
        }

        // Read file source.
        var html = combo(filepath);

        // Write the destination file.
        grunt.file.write(dest, html);

        // Print a success message.
        grunt.log.writeln('File "' + dest + '" created.');
      });
    });
  });

};
