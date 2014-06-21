'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.combo_html_css_js = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(2);

    var actualA = grunt.file.read('tmp/a.html');
    var expectedA = grunt.file.read('test/expected/a.html');
    test.equal(actualA, expectedA, 'should describe what the internal resource is.');

    var actualB = grunt.file.read('tmp/b.html');
    var expectedB = grunt.file.read('test/expected/b.html');
    test.equal(actualB, expectedB, 'should describe what the external resource is.');

    test.done();
  },
};
