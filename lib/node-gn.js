module.exports = exports = gn

var events = require('events');
var path = require('path');
var spawn = require('child_process').spawn;
var fs = require('fs');
var util = require('util');

var gn_commands = [
  'init',  // Init a GN project with templates
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

GN.prototype.run_gn = function() {

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
