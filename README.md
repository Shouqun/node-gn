node-gn
==================
### Node.js native addon build tool with GN/Ninja.
`node-gn` is a Node.js native addon build tool using GN/Ninja, compared to
[`node-gyp`](https://github.com/nodejs/node-gyp) which uses [gyp](https://gyp.gsrc.io/)  as the native addon meta-build system.
Because the v8 project has already swithed to [GN](https://chromium.googlesource.com/chromium/src/tools/gn/) build system since version 6.6 ([related link]('https://v8project.blogspot.com/2018/03/v8-release-66.html')),
using `node-gn` as the native addon build tool is the right choice.

How to Install
-----------------
The npm pakcage in npm.js is [`gn-node`](https://www.npmjs.com/package/gn-node), to install `node-gn`, you should run:
```
npm install -g gn-node
```
`node-gn` already contains builtin GN binary `gn` and Ninja binary `ninja`, so you don't have to
install GN and Ninja additionally.

Usage
--------------
### Creat Project
To create a project using GN/Ninja as build tool, run:
```
# mkdir project_dir && cd project_dir
gn-node init
```

### Configure your project
Configure your project with current Node.js enviroment:
```
gn-node args
```
The `args.gn` file will generated automatically in your `build` directory, which
contains the Node.js addon build configuration.

### Generate build files
To generate Ninja build files, run:
```
gn-node gen
```

### Build your project
To build your project, run:
```
gn-node build
```


License
-----------------
The MIT License (MIT)

Copyright (c) 2017 Shouqun Liu <liushouqun@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

