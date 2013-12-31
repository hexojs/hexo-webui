# Hexo Web UI

This is a web UI for Hexo. It provides you a more convenient envrionment to write your posts.

## Usage

``` bash
$ hexo webui
```

### Options

- **-p, --port** - Override the default port
- **-l, --log [format]** - Enable logger. Override the logger format.

### Configurations

You can configure this plugin in `_config.yml`. Email is required for authorization.

``` yaml
webui:
  password:
  port: 5000
```

- **password** - Password. If not defined, it will generate a random password.
- **port** - Port (Default: 5000)

## Structure

- **api** - Back-end files
  - **controllers** - Controllers
  - **validators** - Validators
  - **views** - Views
  - **routes.js** - Route
- **app** - Front-end files
  - **controllers** - Controllers
  - **directives** - Directives
  - **filters** - Filters
  - **lib** - Library
  - **services** - Services
  - **app.js** - Entry point
- **assets** - Asset files
  - **styl** - Stylus files
  - **assets.yml** - Asset configuration
- **build** - All files used in build tasks
- **lib** - Server library
- **views** - Front-end views

It uses [Express](http://expressjs.com/) in back-end and [Angular](http://angularjs.org/) in front-end.