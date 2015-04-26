var test = require('tape');
var fs = require('fs');
var sav = fs.createReadStream('./examples/accidents.sav');

var variables_parser = require('../').variables;

test('Variables parser test', function (t) {

  var parser = sav.pipe(variables_parser);

  parser.tap(function () {
    var vars = this.vars;

  });

  t.end();
});