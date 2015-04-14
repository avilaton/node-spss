var fs = require('fs');
var binary = require('binary');

var sav = fs.createReadStream('accidents.sav');

var ws = binary()
    .buffer('header.rec_type', 4)
    .buffer('header.prod_name', 60)
    .word32ls('header.layout_code')
    .word32ls('header.nominal_case_size')
    .word32ls('header.compressed')
    .word32ls('header.weight_index')
    .word32ls('header.ncases')
    .buffer('header.bias', 8)
    .buffer('header.creation_date', 9)
    .buffer('header.creation_time', 8)
    .buffer('header.file_label', 64)
    .buffer('header.padding', 3)
    .tap(function (vars) {
      var header = vars.header;

      for (var key in header) {
        console.log(key, ':\t', typeof header[key] !== 'number'? header[key].toString(): header[key]);
      };
      var bias = header.bias.readDoubleLE();

      console.log(bias, typeof bias);
    })
;

function parse_header () {

}

sav.pipe(ws);
