module.exports = exports = gn

var events = require('events');
var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var util = require('util');

var gn_util = require('./util');


function gn_initialize(command_args) {
  var initialize = require('./initialize')
  initialize(command_args);
}


function gn_build(command_args) {
  var build = require('./build');
  build(command_args);
}

function gn_analyze(command_args) {
  // Run 'gn analyze'
}

function gn_gen(command_args) {
  var gen = require('./gen')
  gen(command_args)
}

function gn_args(command_args) {
  // Run 'gn args'.
  var args = require('./args');
  args(command_args)
}

function gn_clean(command_args) {
  // Run 'gn clean'.
}

function gn_desc(command_args) {
  // Run 'gn clean'
}

function gn_ls(command_args) {
  // Run 'gn ls'
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
