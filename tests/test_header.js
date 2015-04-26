var test = require('tape');
var fs = require('fs');
var sav = fs.createReadStream('./examples/accidents.sav');

var parser = require('../index');

test('Header parser tests', function (t) {

  var result = sav.pipe(parser);

  result.tap(function () {
    var header = this.vars.header;

    t.equal(header.rec_type, '$FL2', 'Record type should always match $FL2');
    t.equal(header.prod_name,
      '@(#) SPSS DATA FILE MS Windows Release 13.0 spssio32.dll    ',
      'File description is a string with some crap inside');
    t.equal(header.layout_code, 2, 'Layout code equals 2');
    t.equal(header.nominal_case_size, 4, 'Nominal case size is 4');
    t.equal(header.compressed, 1, 'Compressed equals 1');
    t.equal(header.weight_index, 0, 'Weigth index is zero');
    t.equal(header.ncases, 6, 'Ncases equals 6');
    t.equal(header.bias, 100, 'Bias is 100');
    t.equal(header.creation_date, '17 Jul 04', 'Creation Date is 17 Jul 04');
    t.equal(header.creation_time, '07:11:56', 'Creation Time is 07:11:56');
    t.equal(header.file_label,
      '                                                                ',
      'File label is a long empty string');
    t.is(Buffer.compare(header.padding, new Buffer([0,0,0])), 0,
      'Padding is a length 3 buffer of zeros');
    t.end();
  });

});
