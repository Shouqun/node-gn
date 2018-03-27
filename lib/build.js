module.exports = exports = build

var fs = require('fs'),
    fse = require('fs-extra'),
    path = require('path'),
    spawn = require('child_process').spawn,
    gn_util = require('./util')

function get_project_info() {
  project_path = process.cwd();
  return {
    name: path.basename(project_path),
    fullpath: project_path
  };
}

function build(command_args) {
  // Invoke ninja to build.
  console.log('Build project:' + get_project_info().name);
  var build_path = '';
  if (command_args.length === 1) {
    // Use the default build path.
    build_path = gn_util.DEFAULT_BUILD_PATH;
  } else {
    build_path = command_args[2];
  }

  var exec = gn_util.get_ninja_executable();
  var args = ['-C', path.join(process.cwd(), gn_util.DEFAULT_BUILD_PATH)]

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
