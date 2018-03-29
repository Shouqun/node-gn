module.exports = exports = gn

var events = require('events');
var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var util = require('util');

var gn_util = require('./util');


function processGNCall(command, commandArgs) {
  var module_name = './' + command;

  var module = require(module_name);
  module(commandArgs);
}

var gnCommands = [
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

GN.prototype.runGN = function(argv) {
  command = argv[2]
  commandArgs = Array.prototype.slice.call(argv, 2);

  if (gnCommands.includes(command)) {
    console.log('Run GN command: ' + command);
    processGNCall.call(this, command, commandArgs);
  } else {
    console.error('Invalid command: ' + command);
  }
}
