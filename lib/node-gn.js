module.exports = exports = gn

var events = require('events');
var path = require('path');
var spawn = require('child_process').spawn;
var fs = require('fs');
var fse = require('fs-extra');
var util = require('util');

var gn_commands = [
  'init', // Init a GN project with templates
  'build',
  'analyze',
  'args',
  'gen',
  'clean',
  'desc',
  'ls',
  'path',
  'check'
]

function gn() {
  return new GN();
}

function GN() {
  var self = this;

  this.commands = {}
}

util.inherits(GN, events.EventEmitter);
exports.GN = GN


function get_gn_executable(){
  var platform_to_path = {};
  platform_to_path['darwin'] = '../tools/gn/mac/gn';
  platform_to_path['linux'] = '../tools/gn/linux64/gn';
  platform_to_path['win32'] = '../tools/gn/win/gn.exe';
  binary_path = path.join(__dirname, platform_to_path[process.platform]);
  return binary_path;
}


function gn_initialize() {
  console.log('initialize GN project on:' + process.cwd());

  var source_dir = path.join(__dirname, '../templates');
  var target_dir = process.cwd();
  fse.copy(source_dir, target_dir, function (err) {
    if (err) return console.error(err)
    console.log("Copy GN template success!")
} );
}

function gn_build() {
  // Invoke ninja to build.
}

function gn_gen() {
  // Run 'gn gen'.
}

function gn_args() {
  // Run 'gn args'.
}

function gn_clean() {
  // Run 'gn clean'.
}


GN.prototype.run_gn = function(argv) {

  command = argv[2]
  console.log('run command: ' + command)
  if (command === 'init') {
    gn_initialize();
    return;
  }

  var exec = get_gn_executable();
  var result = spawn(exec);

  result.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  result.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  result.on('close', (code) => {
  console.log(`gn process exited with code ${code}`);
  });
}
