# The Report

located at `./report.pdf`

# Source

located in `./src`

# Testing

located at `./run`

you may need to run
`chmod +x run`

This script suits Ubuntu, but if you would like to run it on a macbook, there is a command for that too.

`./run --run-on-mac`

## Building

There are different levels of building involved with this project. Important Note: The target machine should not have to build anything. Although some build tools may be available in your `.bin` folder we do not guarantee this!

#### 1. Deps*

npm is needed to acquire other dependencies

`check your package manager`

A build of node must be available to run the project. Install with

`npm install node`

A build of tsc (typescript compiler) must be available

`npm install typescript`

\* On the target machine, only node is needed, and since we cannot ensure the target has permission to install npm, we will distribute the appropriate binaries ourselves. A ubuntu-ready binary `node` is stored in `deps_ubuntu/.bin/node`.

#### 2. Source

Navigate to project root and compile with

`tsc`

Configuration is in `tsconfig.json`.

This is the stage where source files are validated. This is similar to compilation stage.

As part of a naming convention the file named `dom.js` is an intermediary and will not run in node

#### 3. Execution

Thankfully, node supports common js features, so bundling is not necessary. Instead this final stage occurs when our transpiled js program is sent to node to be interpreted.

This is done using a wrapper executable shell script.