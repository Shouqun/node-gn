module.exports = exports = gn

var events = require('events');
var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var util = require('util');

var gn_util = require('./util');


function process_gn_call(command, command_args) {
  var module_name = './' + command;

  var module = require(module_name);
  module(command_args);
}

var gn_commands = [
  'init',// Init a GN project with templates
  'build',
  'analyze',
  'args',
  'gen',
  'clean',
  'desc',
  'ls'
];

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

  if (gn_commands.includes(command)) {
    console.log('Run GN command: ' + command);
    process_gn_call.call(this, command, command_args);
  } else {
    console.error('Invalid command: ' + command);
  }
}
