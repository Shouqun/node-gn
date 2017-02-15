#!/usr/bin/env node

var path = require('path');
var gn = require('../');

process.title = 'node-gn'

var argv = process.argv;

gn_module = gn();

console.log('Run gn: ' + gn_module.run_gn());
