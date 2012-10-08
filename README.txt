# Hurricane

Drupal module to add vector based, CSS-styleable loading spinners of awesomeness!

## Requirements
- Drupal 7
- [Libraries 2.0](http://drupal.org/project/libraries)
- [Raphael](http://raphaeljs.com/) vector library installed in a libraries-compliant subfolder:
  - profiles/[profile]/libraries/raphael/raphael.js
  - sites/all/libraries/raphael/raphael.js
  - sites/[domain]/libraries/raphael/raphael.js

## Installation
Copy the libraries and hurricane module into a drupal modules folder and the Raphael library into a libraries folder. Hurricane consists of four modules which may be activated independently:

### hurricane
The main module, providing the hurricane jQuery plugin. Required by all other modules.

### hurricane_integration
Deeper integration of hurricane into Drupal. Automatically replaces Drupal Ajax throbbers with hurricane and provides
theme settings.

### hurricane_renderers
Provides additional renderers for hurricane.

### hurricane_tests
A test page to display hurricane renderers configured in a theme.

## Usage
Activate *hurricane*, *hurricane_integration* and *hurricane_renderers*, go to your theme's settings page and configure available renderers. After saving the available renderers setting an additional group appears, where the appearance of the standard renderer may be configured.
Renderers may be styled independently in the CSS sheet. A CSS-Snippet is generated on the fly in the appearance configurations "Export" group.

## Issues
- Ajax-Button renderers are too big in IE6
- Rotation has some problems in IE < 9

## Sponsoring
The module has been developed by [Philipp Melab](mailto:pm@zensations.at) and sponsored by [Zensations - web & communcations](http://www.zensations.at).
