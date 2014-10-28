TicTacToe-emberjs
=================
Simple example of 5x5 [Tic-tac-toe game](http://en.wikipedia.org/wiki/Tic-tac-toe) written in JavaScript and [Ember.js](http://emberjs.org) framework.

Project uses [Gulp](http://gulpjs.com) as building tool, [Jasmine](http://jasmine.github.io/) for unit testing and [YUIDoc](http://yui.github.io/yuidoc/) for documentation.

## Installation
This project requires an installed [Node.js](http://nodejs.org/) platform.

To install all project dependencies just run command:

```
npm install
```

You can install all dependencies manually. See `package.json` for list of required Node modules and `bower.json` for list of JavaScript libraries.

After all dependencies were installed, build application with command

```
gulp build-app
```

## Run application
You need to start a simple web server to run application. Run command in a root folder of the project:

```
node runserver.js
```

Now you can open application in browser: [http://localhost:8080](http://localhost:8080).

Modify `runserver.js` file if you want to change web server port to listen.

## Run unit tests
Project uses [Jasmine](http://http://jasmine.github.io/) as a unit testing framework. [Karma](http://karma-runner.github.io) and 
[PhantonJS](http://phantomjs.org/) are used for running tests.

For running tests write command:

```
gulp tests
```

##Documentation
Install [YUIDoc](http://yui.github.io/yuidoc/) for Node.js

```
npm -g install yuidocjs
```

and run `yuidoc` command in the root folder of the project.

YUIDoc generates documentation in `docs` folder. Just open `docs\index.html` in your browser to see documentation. 