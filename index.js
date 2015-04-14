#!/usr/bin/env node

var header = require('./lib/header');

var fs = require('fs');
var sav = fs.createReadStream('./examples/accidents.sav');

sav.pipe(header);