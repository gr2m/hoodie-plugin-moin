'use strict';

var request = require('request');
var cheerio = require('cheerio');
var numeral = require('numeral');

var getTemplate = require('../../lib/get_template');
var template = getTemplate('gittip');

// expects config:
//
//     since: '2014-01-01'
//     organizationName: 'hoodiehq'
//
function gittip(hoodie, config, callback) {
  request('https://www.gittip.com/' + config.organizationName, function (error, response, body) {
    var $ = cheerio.load(body);
    var raw = $('.total-receiving').text().substr(1);
    var obj = {
      receiving: numeral(raw).format('0.00')
    };

    callback(null, {
      name: 'gittip',
      text: template(obj),
      data: obj
    });
  });
}

module.exports = gittip;
