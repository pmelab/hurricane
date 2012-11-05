# Hurricane

Drupal 7 module to add CSS-styleable loading spinners of
awesomeness!

## Installation
Copy the libraries and hurricane module into a drupal modules folder and the
Raphael library into a libraries folder. Hurricane consists of four modules
which may be activated independently:

- **hurricane:** The main module, providing the hurricane jQuery plugin.
Required by all other modules.

- **hurricane_integration:** Deeper integration of hurricane into Drupal.
Automatically replaces Drupal Ajax throbbers with hurricane and provides theme
settings.
- **hurricane_raphael:** Raphael based SVG/VML renderers. Requires
[Rapahel][raphael] library to be installed in a libraries compliant subfolder.
- **hurricane_spinjs:** Renderer based on [Spin.js][spinjs].
- **hurricane_tests:** A test page to display hurricane renderers configured in
a theme.

## Usage
Activate *hurricane*, *hurricane_integration* and *hurricane_renderers*, go to
your theme's settings page and configure available renderers. After saving the
available renderers setting an additional group appears, where the appearance
of the standard renderer may be configured. Renderers may be styled
independently in the CSS sheet. A CSS-Snippet is generated on the fly in the
appearance configurations "Export" group.

*The module has been developed by [Philipp Melab][pm] and sponsored by
[Zensations - web & communcations][zen].*

[spinjs]: http://fgnass.github.com/spin.js/
[raphael]: http://raphaeljs.com/ "Raphael"
[zen]: http://www.zensations.at
[pm]: mailto:pm@zensations.at
