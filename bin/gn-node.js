#!/usr/bin/env node

var path = require('path');
var gn = require('../lib/node-gn.js');

process.title = 'gn-node'

var argv = process.argv;

gn_module = gn();

gn_module.run_gn(process.argv);
