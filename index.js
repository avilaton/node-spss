#!/usr/bin/env node

var Dissolve = require("dissolve");

var nominal_case_size;
var i = 1;

var parser = Dissolve();

// Parse header information
parser.tap('header', function() {

  this.string('rec_type', 4);
  this.string('prod_name', 60);
  this.int32('layout_code');
  this.int32('nominal_case_size');
  this.int32('compressed');
  this.int32('weight_index');
  this.int32('ncases');
  this.doublele('bias');
  this.string('creation_date', 9);
  this.string('creation_time', 8);
  this.string('file_label', 64);
  this.buffer('padding', 3);
}).tap(function () {

  nominal_case_size = this.vars.header.nominal_case_size;

});

// Parse variables
parser.loop('variables', function (end) {

  this.int32('record_type_code').tap(function () {
    if (this.vars.variable_type_code !== -1) {
      this.int32('variable_type_code');
      this.int32('has_label');
      this.int32('n_missing');
      this.int32('print_format');
      this.int32('write_format');
      this.string('varname', 8).tap(function () {
        if (this.vars.has_label === 1) {
          this.int32('label_length').tap(function () {
            this.string('variable_label', Math.ceil(this.vars.label_length/4.0) * 4);
          });
        }

        if (this.vars.n_missing !== 0) {
          this.buffer('missings', this.vars.n_missing * 64);
        }
      });
    } else {
      this.buffer('ignore', 24);
    }
  });

  if (i++ == nominal_case_size) {
    end()
  }

});

var count;

parser.tap('remaining_dict', function () {
  this.int32('rec_type');

  this.tap('value_label_records', function () {
    if (this.vars.rec_type === 3) {
      var j = 1;

      this.int32('count').loop('value_labels', function (end) {
        this.doublele('value', 8);
        this.uint8('label_length');
        this.tap(function () {
          var round_label_length,
            tmp_mod = (this.vars.label_length+1)  % 8;

          if (tmp_mod !== 0) {
            round_label_length = this.vars.label_length + 8 - tmp_mod;
          } else {
            round_label_length = this.vars.label_length;
          }

          this.string('label', round_label_length);
        });

        if (j++ == this.vars.count) {
          end();
        }
      });
  }
  });

  this.tap('value_label_variables', function () {
    this.int32('rec_type_2');
    this.int32('var_count');
  })


    if (this.vars.rec_type === 6) {

    } else if (this.vars.rec_type === 7) {

    } else if (this.vars.rec_type === 999) {

    }
});


parser.tap(function () {
  // Enable this to see what is going on
  console.log(this.vars.remaining_dict);
});

module.exports = parser;
