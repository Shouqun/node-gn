module.exports = exports = gn

var events = require('events');
var path = require('path');
var spawn = require('child_process').spawn;
var fs = require('fs');
var fse = require('fs-extra');
var util = require('util');


function get_gn_executable(){
  var platform_to_path = {};
  platform_to_path['darwin'] = '../tools/gn/mac/gn';
  platform_to_path['linux'] = '../tools/gn/linux64/gn';
  platform_to_path['win32'] = '../tools/gn/win/gn.exe';
  binary_path = path.join(__dirname, platform_to_path[process.platform]);
  return binary_path;
}

function get_ninja_executable() {
  var platform_to_path = {};
  platform_to_path['darwin'] = '../tools/depot_tools/ninja-mac';
  if (process.arch == 'x64') {
    platform_to_path['linux'] = '../tools/depot_tools/ninja-linux64';
  } else if (process.arch == 'ia32') {
    platform_to_path['linux'] = '../tools/depot_tools/ninja-linux32';
  }
  platform_to_path['win32'] = '../tools/depot_tools/ninja.exe';
  binary_path = path.join(__dirname, platform_to_path[process.platform]);
  return binary_path;
}

function gn_initialize(command_args) {
  console.log('Initialize GN project on:' + process.cwd());

  var template_dir = path.join(__dirname, '../templates');
  var target_dir = process.cwd();

  var initialize = require('initialize');
  initialize(template_dir, target_dir);
}

function get_project_info() {
  project_path = process.cwd();
  return {
    name: path.basename(project_path),
    fullpath: project_path
  };
}

function gn_build(command_args) {
  // Invoke ninja to build.
  console.log('Build project:' + get_project_info().name);
  var build_path = '';
  if (command_args.length === 1) {
    build_path = 'build';
  } else {
    build_path = command_args[2];
  }

  var exec = get_ninja_executable();
  var args = ['-C', path.join(process.cwd(), 'build')]

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

function _preprocess_gn_args(command_args) {
    if (command_args.length === 1)
      command_args.push('build');  // default gen path is 'build'
}

function gn_analyze(command_args) {
  // Run 'gn analyze'
}

function gn_gen(command_args) {
  // Run 'gn gen'.
  _preprocess_gn_args(command_args);
  console.log('Run gn: ' + command_args.join(' '));

  // TODO:
  run_gn_command(command_args);
}

function gn_args(command_args) {
  // Run 'gn args'.
  _preprocess_gn_args(command_args);
  console.log('Run: ' + command_args.join(' '));

  // TOO:
  run_gn_command(command_args);
}

function gn_clean(command_args) {
  // Run 'gn clean'.
  _preprocess_gn_args(command_args);
  console.log('Run: ' + command_args.join(' '));

  // TODO:
  run_gn_command(command_args);
}

function gn_desc(command_args) {
  // Run 'gn clean'
  _preprocess_gn_args(command_args);
  console.log('Run: ' + command_args.join(' '));

  // TODO:
  run_gn_command(command_args);
}

function gn_ls(command_args) {
  // Run 'gn ls'
  _preprocess_gn_args(command_args);
  console.log('Run: ' + command_args.join(' '));

  // TODO:
  run_gn_command(command_args);
}


function run_gn_command(command_args) {
  var exec = get_gn_executable();
  var result = spawn(exec, command_args);

  result.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  result.stderr.on('data', (data) => {
    console.log(`${data}`);
  });

  result.on('close', (code) => {
    if (code !=0)
      console.log(`gn process exited with code ${code}`);
  });
}

var gn_commands = {
  'init': gn_initialize,// Init a GN project with templates
  'build': gn_build,
  'analyze': gn_analyze,
  'args': gn_args,
  'gen': gn_gen,
  'clean': gn_args,
  'desc': gn_desc,
  'ls': gn_ls
}

// The gn object.
function gn() {
  return new GN();
}

function GN() {
  var self = this;
}

util.inherits(GN, events.EventEmitter);
exports.GN = GN

GN.prototype.run_gn = function(argv) {
  command = argv[2]
  command_args = Array.prototype.slice.call(argv, 2);
  console.log('Run GN command: ' + command + ' with argv: ' + command_args);

  if (command in gn_commands) {
    gn_commands[command].call(this, command_args);
  } else {
    console.error('Invalid command: ' + command);
  }
}
