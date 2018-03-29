#!/usr/bin/env node

var path = require('path');
var gn = require('../lib/node-gn.js');

process.title = 'gn-node'

var argv = process.argv;

gnModule= gn();

gnModule.runGN(process.argv);
