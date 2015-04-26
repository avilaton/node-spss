var test = require('tape');
var fs = require('fs');
var sav = fs.createReadStream('./examples/accidents.sav');

var parser = require('../index');

test('Variables parser tests', function (t) {

  var result = sav.pipe(parser);

  result.tap(function () {
    var first_variable = this.vars.variables[0];

    t.equal(first_variable.record_type_code, 2, 'Record type code should be 2');
    t.equal(first_variable.variable_type_code, 0);
    t.equal(first_variable.varname, 'AGECAT  ',
      'First variable name is \'AGECAT  \'' );

  });

  t.end();

});