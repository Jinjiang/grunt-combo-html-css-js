# grunt-combo-html-css-js

> Combine css links and javscript files to html file with inline tags automatically

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-combo-html-css-js --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-combo-html-css-js');
```

## The "comboall" task

### Overview
In your project's Gruntfile, add a section named `comboall` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  comboall: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Usage Examples

In this example, `src/target.html` is the source file which may has some `<link>` or `<script>` tags to use css / javascript file. And `dest/combo.html` is the will-built file which join all relative css / javascript files and the own html together.

#### Source File `src/target.html`:

```html
<html>
...
<link rel="stylesheet" href="http://example.com/style.css">
<link rel="stylesheet" href="style.css">
...
<script src="http://example.com/script.js"></script>
<script src="script.js"></script>
...
</html>
```

#### Grunt File `Gruntfile.js`:

```js
grunt.initConfig({
  comboall: {
    files: {
      'dest/combo.html': ['src/target.html'],
    },
  },
});
```

#### Generated File `dest/combo.html`

```html
<html>
...
<link rel="stylesheet" href="http://example.com/style.css">
<style>
/* file content from `src/style.css` */
</style>
...
<script src="http://example.com/script.js"></script>
<script>
/* file content from `src/script.js` */
</script>
...
</html>
```

Note: the absolute css or javascript link will not be joined, but still use the external way.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
