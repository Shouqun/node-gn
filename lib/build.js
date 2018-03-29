module.exports = exports = build

var fs = require('fs'),
    fse = require('fs-extra'),
    path = require('path'),
    spawn = require('child_process').spawn,
    gnUtil = require('./util')

function getProjectInfo() {
  projectPath = process.cwd();
  return {
    name: path.basename(projectPath),
    fullpath: projectPath
  };
}

function build(commandArgs) {
  // Invoke ninja to build.
  console.log('Build project:' + getProjectInfo().name);
  var buildPath = '';
  if (commandArgs.length === 1) {
    // Use the default build path.
    buildPath = gnUtil.DEFAULT_BUILD_PATH;
  } else {
    buildPath = commandArgs[1];
  }

  var exec = gnUtil.getNinjaExecutable();
  var args = ['-C', path.join(process.cwd(), gnUtil.DEFAULT_BUILD_PATH)]

  var result = spawn(exec, args);
  result.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  result.stderr.on('data', (data) => {
    console.log(`${data}`);
  });

  result.on('close', (code) => {
    if (code != 0)
      console.log(`ninja process exited with code ${code}`);
  });
}
